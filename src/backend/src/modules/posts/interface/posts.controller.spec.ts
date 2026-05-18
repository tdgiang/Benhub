import { Test, TestingModule } from '@nestjs/testing';
import { ConflictException, NotFoundException } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from '../application/posts.service';
import { PostStatus } from '@prisma/client';

const mockPostsService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  findBySlug: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockRes = { header: jest.fn() };
const mockReq = { user: { id: 'admin-uuid' } };

const makePost = (overrides = {}) => ({
  id: 'post-1',
  title: 'BenHub ra mắt',
  slug: 'benhub-ra-mat',
  content: '<p>Nội dung</p>',
  status: PostStatus.PUBLISHED,
  authorId: 'admin-uuid',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
  ...overrides,
});

describe('PostsController', () => {
  let controller: PostsController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [{ provide: PostsService, useValue: mockPostsService }],
    }).compile();

    controller = module.get<PostsController>(PostsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /* ─── findAll ─── */
  describe('findAll', () => {
    it('returns paginated posts with success message', async () => {
      const paginated = {
        items: [makePost()],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      };
      mockPostsService.findAll.mockResolvedValue(paginated);

      const result = await controller.findAll({ page: 1, limit: 10 } as any);

      expect(result.data).toEqual(paginated);
      expect(result.message).toContain('thành công');
    });
  });

  /* ─── findBySlug ─── */
  describe('findBySlug', () => {
    it('returns post by slug', async () => {
      const post = makePost();
      mockPostsService.findBySlug.mockResolvedValue(post);

      const result = await controller.findBySlug('benhub-ra-mat');

      expect(result.data.slug).toBe('benhub-ra-mat');
    });

    it('propagates NotFoundException when slug not found', async () => {
      mockPostsService.findBySlug.mockRejectedValue(new NotFoundException());

      await expect(controller.findBySlug('ghost')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── findOne ─── */
  describe('findOne', () => {
    it('returns post by id', async () => {
      const post = makePost();
      mockPostsService.findOne.mockResolvedValue(post);

      const result = await controller.findOne('post-1');

      expect(result.data).toEqual(post);
    });

    it('propagates NotFoundException when not found', async () => {
      mockPostsService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── create ─── */
  describe('create', () => {
    it('creates post, sets Location header, returns 201 data', async () => {
      const post = makePost();
      mockPostsService.create.mockResolvedValue(post);

      const result = await controller.create(
        { title: 'BenHub ra mắt', slug: 'benhub-ra-mat', content: '<p>X</p>' } as any,
        mockReq as any,
        mockRes as any,
      );

      expect(mockPostsService.create).toHaveBeenCalledWith(
        expect.any(Object),
        'admin-uuid',
      );
      expect(mockRes.header).toHaveBeenCalledWith('Location', `/api/v1/posts/${post.id}`);
      expect(result.message).toContain('thành công');
    });

    it('propagates ConflictException when slug is taken', async () => {
      mockPostsService.create.mockRejectedValue(new ConflictException());

      await expect(
        controller.create({ slug: 'taken' } as any, mockReq as any, mockRes as any),
      ).rejects.toThrow(ConflictException);
    });
  });

  /* ─── update ─── */
  describe('update', () => {
    it('updates post and returns updated data', async () => {
      const updated = makePost({ title: 'New Title' });
      mockPostsService.update.mockResolvedValue(updated);

      const result = await controller.update('post-1', { title: 'New Title' } as any);

      expect(result.data.title).toBe('New Title');
      expect(result.message).toContain('thành công');
    });

    it('propagates NotFoundException when post not found', async () => {
      mockPostsService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update('missing', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── remove ─── */
  describe('remove', () => {
    it('soft-deletes post and returns success message', async () => {
      const deleted = makePost({ deletedAt: new Date() });
      mockPostsService.remove.mockResolvedValue(deleted);

      const result = await controller.remove('post-1');

      expect(mockPostsService.remove).toHaveBeenCalledWith('post-1');
      expect(result.message).toContain('thành công');
    });

    it('propagates NotFoundException when post not found', async () => {
      mockPostsService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
