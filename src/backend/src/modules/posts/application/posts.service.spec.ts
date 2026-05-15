import { Test, TestingModule } from '@nestjs/testing';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsRepository } from '../infrastructure/posts.repository';
import { PostStatus } from '@prisma/client';

const mockRepository = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findFirst: jest.fn(),
  update: jest.fn(),
  softRemove: jest.fn(),
};

const mockCache = {
  get: jest.fn(),
  set: jest.fn(),
  del: jest.fn(),
};

describe('PostsService', () => {
  let service: PostsService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockCache.get.mockResolvedValue(null);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        { provide: PostsRepository, useValue: mockRepository },
        { provide: CACHE_MANAGER, useValue: mockCache },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /* ─── create ─── */
  describe('create', () => {
    const dto = {
      title: 'BenHub ra mắt',
      slug: 'benhub-ra-mat',
      content: '<p>Nội dung</p>',
      status: PostStatus.DRAFT,
    };
    const authorId = 'user-uuid';

    it('creates and returns a new post', async () => {
      const saved = { id: 'post-1', ...dto, authorId, createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
      mockRepository.findFirst.mockResolvedValue(null); // slug not taken
      mockRepository.create.mockResolvedValue(saved);

      const result = await service.create(dto, authorId);

      expect(mockRepository.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({ slug: 'benhub-ra-mat' }),
      );
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ slug: 'benhub-ra-mat', author: { connect: { id: authorId } } }),
      );
      expect(result.id).toBe('post-1');
    });

    it('throws ConflictException when slug already exists', async () => {
      mockRepository.findFirst.mockResolvedValue({ id: 'existing' }); // slug taken

      await expect(service.create(dto, authorId)).rejects.toThrow(ConflictException);
      expect(mockRepository.create).not.toHaveBeenCalled();
    });

    it('defaults status to DRAFT when not provided', async () => {
      const dtoNsStatus = { title: 'T', slug: 's', content: 'c' };
      const saved = { id: 'p', ...dtoNsStatus, status: PostStatus.DRAFT, authorId, createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
      mockRepository.findFirst.mockResolvedValue(null);
      mockRepository.create.mockResolvedValue(saved);

      await service.create(dtoNsStatus as any, authorId);

      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ status: PostStatus.DRAFT }),
      );
    });
  });

  /* ─── findAll ─── */
  describe('findAll', () => {
    const posts = [
      { id: '1', title: 'A', status: PostStatus.PUBLISHED },
      { id: '2', title: 'B', status: PostStatus.DRAFT },
    ];

    it('returns paginated posts', async () => {
      mockRepository.findAll.mockResolvedValue([posts, 2]);

      const result = await service.findAll({ page: 1, limit: 10 } as any);

      expect(result.items).toHaveLength(2);
      expect(result.meta.total).toBe(2);
    });

    it('filters by status', async () => {
      mockRepository.findAll.mockResolvedValue([[posts[0]], 1]);

      await service.findAll({ status: PostStatus.PUBLISHED, page: 1, limit: 10 } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ status: PostStatus.PUBLISHED }),
        }),
      );
    });

    it('searches in title and excerpt', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAll({ search: 'BenHub', page: 1, limit: 10 } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            OR: expect.arrayContaining([
              { title: { contains: 'BenHub', mode: 'insensitive' } },
            ]),
          }),
        }),
      );
    });

    it('uses cache when available', async () => {
      const cached = { items: posts, meta: { total: 2, page: 1, limit: 10, totalPages: 1 } };
      mockCache.get.mockResolvedValue(cached);

      const result = await service.findAll({ page: 1, limit: 10 } as any);

      expect(result).toEqual(cached);
      expect(mockRepository.findAll).not.toHaveBeenCalled();
    });
  });

  /* ─── findOne ─── */
  describe('findOne', () => {
    it('returns post by id', async () => {
      const post = { id: 'post-1', deletedAt: null };
      mockRepository.findOne.mockResolvedValue(post);

      const result = await service.findOne('post-1');
      expect(result).toEqual(post);
    });

    it('throws NotFoundException when not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('missing')).rejects.toThrow(NotFoundException);
    });

    it('throws NotFoundException when soft-deleted', async () => {
      mockRepository.findOne.mockResolvedValue({ id: 'x', deletedAt: new Date() });

      await expect(service.findOne('x')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── findBySlug ─── */
  describe('findBySlug', () => {
    it('returns post by slug', async () => {
      const post = { id: 'p1', slug: 'my-post', deletedAt: null };
      mockRepository.findFirst.mockResolvedValue(post);

      const result = await service.findBySlug('my-post');
      expect(result.slug).toBe('my-post');
    });

    it('throws NotFoundException when slug not found', async () => {
      mockRepository.findFirst.mockResolvedValue(null);

      await expect(service.findBySlug('ghost')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── update ─── */
  describe('update', () => {
    it('updates and returns post', async () => {
      const existing = { id: 'p1', slug: 'old-slug', deletedAt: null };
      const updated = { ...existing, title: 'New title' };
      mockRepository.findOne.mockResolvedValue(existing);
      mockRepository.findFirst.mockResolvedValue(null); // new slug not taken
      mockRepository.update.mockResolvedValue(updated);

      const result = await service.update('p1', { title: 'New title' });

      expect(mockRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'p1' } }),
      );
      expect(result.title).toBe('New title');
    });

    it('throws ConflictException if new slug conflicts with another post', async () => {
      const existing = { id: 'p1', slug: 'old-slug', deletedAt: null };
      const conflicting = { id: 'p2', slug: 'taken-slug' }; // different post owns it
      mockRepository.findOne.mockResolvedValue(existing);
      mockRepository.findFirst.mockResolvedValue(conflicting);

      await expect(service.update('p1', { slug: 'taken-slug' })).rejects.toThrow(ConflictException);
    });

    it('invalidates post cache after update', async () => {
      const existing = { id: 'p1', deletedAt: null };
      mockRepository.findOne.mockResolvedValue(existing);
      mockRepository.findFirst.mockResolvedValue(null);
      mockRepository.update.mockResolvedValue(existing);

      await service.update('p1', { title: 'Updated' });

      expect(mockCache.del).toHaveBeenCalledWith('post_p1');
    });
  });

  /* ─── remove ─── */
  describe('remove', () => {
    it('soft-deletes and clears cache', async () => {
      const post = { id: 'p1', deletedAt: null };
      mockRepository.findOne.mockResolvedValue(post);
      mockRepository.softRemove.mockResolvedValue({ ...post, deletedAt: new Date() });

      const result = await service.remove('p1');

      expect(mockRepository.softRemove).toHaveBeenCalledWith({ id: 'p1' });
      expect(result.deletedAt).not.toBeNull();
    });

    it('throws NotFoundException if post does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
