import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '@prisma/client';
import { RolesGuard } from './roles.guard';

const makeContext = (user: unknown): ExecutionContext => ({
  getHandler: jest.fn(),
  getClass: jest.fn(),
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: jest.fn().mockReturnValue({ user }),
  }),
} as unknown as ExecutionContext);

describe('RolesGuard', () => {
  let guard: RolesGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new RolesGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('returns true when no roles are required (no @Roles decorator)', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(undefined);
    const ctx = makeContext(null);

    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('returns true when user has a required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);
    const ctx = makeContext({ id: 'u1', role: Role.ADMIN });

    expect(guard.canActivate(ctx)).toBe(true);
  });

  it('returns false when user does not have required role', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);
    const ctx = makeContext({ id: 'u1', role: Role.USER });

    expect(guard.canActivate(ctx)).toBe(false);
  });

  it('returns falsy when user is missing from request', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN]);
    const ctx = makeContext(undefined);

    expect(guard.canActivate(ctx)).toBeFalsy();
  });

  it('returns true when user has one of multiple allowed roles', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue([Role.ADMIN, Role.USER]);
    const ctx = makeContext({ id: 'u1', role: Role.USER });

    expect(guard.canActivate(ctx)).toBe(true);
  });
});
