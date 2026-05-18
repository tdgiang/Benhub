import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';

const makeContext = (isPublic: boolean | undefined, hasUser = false): ExecutionContext => ({
  getHandler: jest.fn(),
  getClass: jest.fn(),
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: jest.fn().mockReturnValue({ user: hasUser ? { id: 'u1' } : undefined }),
  }),
} as unknown as ExecutionContext);

describe('JwtAuthGuard', () => {
  let guard: JwtAuthGuard;
  let reflector: Reflector;

  beforeEach(() => {
    reflector = new Reflector();
    guard = new JwtAuthGuard(reflector);
  });

  it('should be defined', () => {
    expect(guard).toBeDefined();
  });

  it('returns true immediately for @Public() routes', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(true);
    const ctx = makeContext(true);

    const result = guard.canActivate(ctx);

    expect(result).toBe(true);
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(IS_PUBLIC_KEY, [
      ctx.getHandler(),
      ctx.getClass(),
    ]);
  });

  it('delegates to passport JWT strategy for non-public routes', () => {
    jest.spyOn(reflector, 'getAllAndOverride').mockReturnValue(false);
    const ctx = makeContext(false);
    // canActivate on AuthGuard calls super — it will throw without full DI setup
    // We just verify the reflector check returns false and super is invoked
    const superActivate = jest.spyOn(
      Object.getPrototypeOf(JwtAuthGuard.prototype),
      'canActivate',
    ).mockReturnValue(true);

    guard.canActivate(ctx);

    expect(superActivate).toHaveBeenCalledWith(ctx);
    superActivate.mockRestore();
  });
});
