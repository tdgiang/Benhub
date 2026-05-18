import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from '../application/users.service';

const mockUsersService = {
  create: jest.fn(),
  findAll: jest.fn(),
  findOne: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
};

const mockRes = { header: jest.fn() };

const makeUser = (overrides = {}) => ({
  id: 'u1',
  email: 'test@example.com',
  firstName: 'Test',
  lastName: 'User',
  role: 'USER',
  isActive: true,
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

describe('UsersController', () => {
  let controller: UsersController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /* ─── create ─── */
  describe('create', () => {
    it('creates user, sets Location header, returns message + data', async () => {
      const user = makeUser();
      mockUsersService.create.mockResolvedValue(user);

      const result = await controller.create(
        { email: 'test@example.com', password: 'pass' } as any,
        mockRes as any,
      );

      expect(mockUsersService.create).toHaveBeenCalled();
      expect(mockRes.header).toHaveBeenCalledWith('Location', `/api/v1/users/${user.id}`);
      expect(result.message).toContain('thành công');
      expect(result.data).toEqual(user);
    });
  });

  /* ─── findAll ─── */
  describe('findAll', () => {
    it('returns paginated user list', async () => {
      const paginated = {
        items: [makeUser()],
        meta: { total: 1, page: 1, limit: 10, totalPages: 1 },
      };
      mockUsersService.findAll.mockResolvedValue(paginated);

      const result = await controller.findAll({ page: 1, limit: 10 } as any);

      expect(result.data).toEqual(paginated);
      expect(result.message).toContain('thành công');
    });
  });

  /* ─── findOne ─── */
  describe('findOne', () => {
    it('returns user by id', async () => {
      const user = makeUser();
      mockUsersService.findOne.mockResolvedValue(user);

      const result = await controller.findOne('u1');

      expect(result.data).toEqual(user);
    });

    it('propagates NotFoundException from service', async () => {
      mockUsersService.findOne.mockRejectedValue(new NotFoundException());

      await expect(controller.findOne('missing')).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── update ─── */
  describe('update', () => {
    it('updates user and returns updated data', async () => {
      const updated = makeUser({ firstName: 'Updated' });
      mockUsersService.update.mockResolvedValue(updated);

      const result = await controller.update('u1', { firstName: 'Updated' } as any);

      expect(result.data).toEqual(updated);
      expect(result.message).toContain('thành công');
    });

    it('propagates NotFoundException when user not found', async () => {
      mockUsersService.update.mockRejectedValue(new NotFoundException());

      await expect(controller.update('missing', {} as any)).rejects.toThrow(NotFoundException);
    });
  });

  /* ─── remove ─── */
  describe('remove', () => {
    it('soft-deletes user and returns success message', async () => {
      const user = makeUser({ deletedAt: new Date() });
      mockUsersService.remove.mockResolvedValue(user);

      const result = await controller.remove('u1');

      expect(mockUsersService.remove).toHaveBeenCalledWith('u1');
      expect(result.message).toContain('thành công');
    });

    it('propagates NotFoundException when user not found', async () => {
      mockUsersService.remove.mockRejectedValue(new NotFoundException());

      await expect(controller.remove('missing')).rejects.toThrow(NotFoundException);
    });
  });
});
