import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from '../application/auth.service';

const mockAuthService = {
  register: jest.fn(),
  login: jest.fn(),
  refresh: jest.fn(),
};

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  /* ─── register ─── */
  describe('register', () => {
    it('calls authService.register and returns success message with data', async () => {
      const dto = { email: 'new@example.com', password: 'pass', firstName: 'A', lastName: 'B' };
      const user = { id: 'u1', email: 'new@example.com' };
      mockAuthService.register.mockResolvedValue(user);

      const result = await controller.register(dto as any);

      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
      expect(result.message).toContain('thành công');
      expect(result.data).toEqual(user);
    });
  });

  /* ─── login ─── */
  describe('login', () => {
    it('calls authService.login and returns tokens + user', async () => {
      const dto = { email: 'test@example.com', password: 'pass' };
      const loginResult = {
        user: { id: 'u1', email: dto.email },
        accessToken: 'at',
        refreshToken: 'rt',
      };
      mockAuthService.login.mockResolvedValue(loginResult);

      const result = await controller.login(dto);

      expect(mockAuthService.login).toHaveBeenCalledWith(dto);
      expect(result.data.accessToken).toBe('at');
      expect(result.data.refreshToken).toBe('rt');
    });

    it('propagates UnauthorizedException from service', async () => {
      mockAuthService.login.mockRejectedValue(new UnauthorizedException());

      await expect(controller.login({ email: 'x', password: 'y' }))
        .rejects.toThrow(UnauthorizedException);
    });
  });

  /* ─── refresh ─── */
  describe('refresh', () => {
    it('calls authService.refresh with refreshToken and returns new accessToken', async () => {
      const dto = { refreshToken: 'valid-rt' };
      mockAuthService.refresh.mockResolvedValue({ accessToken: 'new-at' });

      const result = await controller.refresh(dto);

      expect(mockAuthService.refresh).toHaveBeenCalledWith('valid-rt');
      expect(result.data.accessToken).toBe('new-at');
    });

    it('propagates UnauthorizedException from service', async () => {
      mockAuthService.refresh.mockRejectedValue(new UnauthorizedException());

      await expect(controller.refresh({ refreshToken: 'bad' }))
        .rejects.toThrow(UnauthorizedException);
    });
  });
});
