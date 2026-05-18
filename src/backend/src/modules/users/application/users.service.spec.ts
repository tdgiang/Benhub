import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersRepository } from '../infrastructure/users.repository';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

describe('UsersService', () => {
  let service: UsersService;
  let repository: UsersRepository;

  const mockRepository = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    findFirst: jest.fn(),
    update: jest.fn(),
    softRemove: jest.fn(),
    userSelect: {},
  };

  const mockCacheManager = {
    get: jest.fn(),
    set: jest.fn(),
    del: jest.fn(),
  };

  beforeEach(async () => {
    jest.clearAllMocks();
    mockCacheManager.get.mockResolvedValue(null);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UsersRepository,
          useValue: mockRepository,
        },
        {
          provide: CACHE_MANAGER,
          useValue: mockCacheManager,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<UsersRepository>(UsersRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findOne', () => {
    it('should return a user from cache if available', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      mockCacheManager.get.mockResolvedValue(mockUser);

      const result = await service.findOne('1');

      expect(result).toEqual(mockUser);
      expect(mockCacheManager.get).toHaveBeenCalledWith('user_1');
      // eslint-disable-next-line @typescript-eslint/unbound-method
      expect(repository.findOne).not.toHaveBeenCalled();
    });

    it('should return a user from repository if not in cache', async () => {
      const mockUser = { id: '1', email: 'test@example.com' };
      mockCacheManager.get.mockResolvedValue(null);
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne('1');

      expect(result).toEqual(mockUser);
      expect(mockRepository.findOne).toHaveBeenCalled();
      expect(mockCacheManager.set).toHaveBeenCalled();
    });

    it('should throw NotFoundException if user does not exist', async () => {
      mockCacheManager.get.mockResolvedValue(null);
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne('1')).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should call repository with correct search filters', async () => {
      const query = { search: 'John', page: 1, limit: 10 };
      const mockUsers = [
        { id: '1', email: 'john@example.com', firstName: 'John' },
      ];
      const total = 1;

      mockRepository.findAll.mockResolvedValue([mockUsers, total]);

      const result = await service.findAll(query as any);

      expect(result.items).toEqual(mockUsers);
      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({
            deletedAt: null,
            OR: [
              { email: { contains: 'John', mode: 'insensitive' } },
              { firstName: { contains: 'John', mode: 'insensitive' } },
              { lastName: { contains: 'John', mode: 'insensitive' } },
            ],
          }),
        }),
      );
    });

    it('filters by email when provided', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAll({ email: 'admin@example.com', page: 1, limit: 10 } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ email: 'admin@example.com' }),
        }),
      );
    });

    it('filters by isActive when provided', async () => {
      mockRepository.findAll.mockResolvedValue([[], 0]);

      await service.findAll({ isActive: true, page: 1, limit: 10 } as any);

      expect(mockRepository.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          where: expect.objectContaining({ isActive: true }),
        }),
      );
    });

    it('returns cached result without hitting repository', async () => {
      const cached = { items: [], meta: { total: 0, page: 1, limit: 10, totalPages: 0 } };
      mockCacheManager.get.mockResolvedValue(cached);

      const result = await service.findAll({ page: 1, limit: 10 } as any);

      expect(result).toEqual(cached);
      expect(mockRepository.findAll).not.toHaveBeenCalled();
    });
  });

  /* ─── create ─── */
  describe('create', () => {
    it('hashes password and creates user', async () => {
      mockRepository.findFirst.mockResolvedValue(null); // email not taken
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed-pass');
      const created = { id: 'u1', email: 'new@example.com', password: 'hashed-pass' };
      mockRepository.create.mockResolvedValue(created);

      const result = await service.create({
        email: 'new@example.com',
        password: 'plain',
        firstName: 'Test',
        lastName: 'User',
      } as any);

      expect(bcrypt.hash).toHaveBeenCalledWith('plain', 10);
      expect(mockRepository.create).toHaveBeenCalledWith(
        expect.objectContaining({ password: 'hashed-pass' }),
      );
      expect(result).not.toHaveProperty('password');
    });

    it('throws ConflictException when email already exists', async () => {
      mockRepository.findFirst.mockResolvedValue({ id: 'existing' });

      await expect(
        service.create({ email: 'taken@example.com', password: 'x' } as any),
      ).rejects.toThrow(ConflictException);
      expect(mockRepository.create).not.toHaveBeenCalled();
    });
  });

  /* ─── update ─── */
  describe('update', () => {
    it('updates user and invalidates cache', async () => {
      const existing = { id: 'u1', email: 'a@b.com', password: 'old' };
      mockRepository.findOne.mockResolvedValue(existing);
      const updated = { ...existing, firstName: 'New Name', password: 'old' };
      mockRepository.update.mockResolvedValue(updated);

      const result = await service.update('u1', { firstName: 'New Name' } as any);

      expect(mockRepository.update).toHaveBeenCalledWith(
        expect.objectContaining({ where: { id: 'u1' } }),
      );
      expect(mockCacheManager.del).toHaveBeenCalledWith('user_u1');
      expect(result).not.toHaveProperty('password');
    });

    it('hashes new password when password is being updated', async () => {
      const existing = { id: 'u1', email: 'a@b.com', password: 'old' };
      mockRepository.findOne.mockResolvedValue(existing);
      (bcrypt.hash as jest.Mock).mockResolvedValue('new-hashed');
      mockRepository.update.mockResolvedValue({ ...existing, password: 'new-hashed' });

      await service.update('u1', { password: 'newplain' } as any);

      expect(bcrypt.hash).toHaveBeenCalledWith('newplain', 10);
    });

    it('throws NotFoundException when user does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.update('missing', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── remove ─── */
  describe('remove', () => {
    it('soft-deletes user and invalidates cache', async () => {
      const existing = { id: 'u1', email: 'a@b.com', password: 'hashed' };
      mockRepository.findOne.mockResolvedValue(existing);
      mockRepository.softRemove.mockResolvedValue({ ...existing, deletedAt: new Date() });

      const result = await service.remove('u1');

      expect(mockRepository.softRemove).toHaveBeenCalledWith({ id: 'u1' });
      expect(mockCacheManager.del).toHaveBeenCalledWith('user_u1');
      expect(result).not.toHaveProperty('password');
    });

    it('throws NotFoundException when user does not exist', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      await expect(service.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── findByEmail ─── */
  describe('findByEmail', () => {
    it('returns user when found by email', async () => {
      const user = { id: 'u1', email: 'a@b.com', deletedAt: null };
      mockRepository.findFirst.mockResolvedValue(user);

      const result = await service.findByEmail('a@b.com');

      expect(result).toEqual(user);
      expect(mockRepository.findFirst).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'a@b.com', deletedAt: null }),
      );
    });

    it('returns null when email not found', async () => {
      mockRepository.findFirst.mockResolvedValue(null);

      const result = await service.findByEmail('missing@example.com');

      expect(result).toBeNull();
    });
  });
});
