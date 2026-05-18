import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../../users/application/users.service';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt');

const mockUsersService = {
  create: jest.fn(),
  findByEmail: jest.fn(),
  findOne: jest.fn(),
};

const mockJwtService = {
  sign: jest.fn(),
  verify: jest.fn(),
};

const mockConfigService = {
  get: jest.fn((key: string) => {
    const map: Record<string, string> = {
      JWT_EXPIRATION: '15m',
      JWT_REFRESH_SECRET: 'refresh-secret',
      JWT_REFRESH_EXPIRATION: '7d',
    };
    return map[key] ?? null;
  }),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockJwtService.sign.mockReturnValue('signed-token');

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: mockUsersService },
        { provide: JwtService, useValue: mockJwtService },
        { provide: ConfigService, useValue: mockConfigService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  /* ─── register ─── */
  describe('register', () => {
    it('delegates to usersService.create and returns result', async () => {
      const dto = { email: 'new@example.com', password: 'pass123', firstName: 'A', lastName: 'B' };
      const created = { id: 'u1', email: dto.email };
      mockUsersService.create.mockResolvedValue(created);

      const result = await service.register(dto as any);

      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
      expect(result).toEqual(created);
    });
  });

  /* ─── login ─── */
  describe('login', () => {
    const activeUser = {
      id: 'u1',
      email: 'test@example.com',
      password: 'hashed',
      isActive: true,
      role: 'USER',
    };

    it('returns tokens and user on valid credentials', async () => {
      mockUsersService.findByEmail.mockResolvedValue(activeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login({ email: activeUser.email, password: 'plain' });

      expect(result.accessToken).toBe('signed-token');
      expect(result.refreshToken).toBe('signed-token');
      expect(result.user).not.toHaveProperty('password');
      expect(result.user.email).toBe(activeUser.email);
    });

    it('throws UnauthorizedException when email not found', async () => {
      mockUsersService.findByEmail.mockResolvedValue(null);

      await expect(service.login({ email: 'no@example.com', password: 'x' }))
        .rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when password is wrong', async () => {
      mockUsersService.findByEmail.mockResolvedValue(activeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await expect(service.login({ email: activeUser.email, password: 'wrong' }))
        .rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when account is inactive', async () => {
      mockUsersService.findByEmail.mockResolvedValue({ ...activeUser, isActive: false });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      await expect(service.login({ email: activeUser.email, password: 'plain' }))
        .rejects.toThrow(UnauthorizedException);
    });

    it('strips password from returned user object', async () => {
      mockUsersService.findByEmail.mockResolvedValue(activeUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await service.login({ email: activeUser.email, password: 'plain' });

      expect(result.user).not.toHaveProperty('password');
    });
  });

  /* ─── refresh ─── */
  describe('refresh', () => {
    it('returns new accessToken on valid refresh token', async () => {
      mockJwtService.verify.mockReturnValue({ sub: 'u1', type: 'refresh' });
      mockUsersService.findOne.mockResolvedValue({ id: 'u1', email: 'a@b.com', isActive: true });

      const result = await service.refresh('valid-refresh-token');

      expect(result.accessToken).toBe('signed-token');
    });

    it('throws UnauthorizedException when token type is not refresh', async () => {
      mockJwtService.verify.mockReturnValue({ sub: 'u1', type: 'access' });

      await expect(service.refresh('bad-token')).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when user is inactive', async () => {
      mockJwtService.verify.mockReturnValue({ sub: 'u1', type: 'refresh' });
      mockUsersService.findOne.mockResolvedValue({ id: 'u1', isActive: false });

      await expect(service.refresh('valid-refresh-token')).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when jwt.verify throws', async () => {
      mockJwtService.verify.mockImplementation(() => { throw new Error('expired'); });

      await expect(service.refresh('expired-token')).rejects.toThrow(UnauthorizedException);
    });

    it('throws UnauthorizedException when user not found', async () => {
      mockJwtService.verify.mockReturnValue({ sub: 'missing', type: 'refresh' });
      mockUsersService.findOne.mockRejectedValue(new Error('not found'));

      await expect(service.refresh('token')).rejects.toThrow(UnauthorizedException);
    });
  });

  /* ─── validateUser ─── */
  describe('validateUser', () => {
    it('returns user from usersService.findOne', async () => {
      const user = { id: 'u1', email: 'a@b.com' };
      mockUsersService.findOne.mockResolvedValue(user);

      const result = await service.validateUser({ sub: 'u1', email: 'a@b.com' });

      expect(result).toEqual(user);
      expect(mockUsersService.findOne).toHaveBeenCalledWith('u1');
    });
  });
});
