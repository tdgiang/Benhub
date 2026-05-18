import { ExecutionContext, CallHandler } from '@nestjs/common';
import { of } from 'rxjs';
import { TransformInterceptor } from './transform.interceptor';

const makeContext = (url = '/api/v1/test', statusCode = 200): ExecutionContext => ({
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: jest.fn().mockReturnValue({ url }),
    getResponse: jest.fn().mockReturnValue({ statusCode }),
  }),
} as unknown as ExecutionContext);

const makeHandler = (data: unknown): CallHandler => ({
  handle: jest.fn().mockReturnValue(of(data)),
});

describe('TransformInterceptor', () => {
  let interceptor: TransformInterceptor<unknown>;

  beforeEach(() => {
    interceptor = new TransformInterceptor();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('wraps response with success envelope', (done) => {
    const ctx = makeContext('/api/v1/users', 200);
    const handler = makeHandler({ message: 'Lấy thành công', data: { id: 'u1' } });

    interceptor.intercept(ctx, handler).subscribe((result) => {
      expect(result.success).toBe(true);
      expect(result.statusCode).toBe(200);
      expect(result.path).toBe('/api/v1/users');
      expect(result.message).toBe('Lấy thành công');
      expect((result.data as any).id).toBe('u1');
      expect(typeof result.timestamp).toBe('string');
      done();
    });
  });

  it('uses "Success" as default message when data has no message field', (done) => {
    const ctx = makeContext();
    const handler = makeHandler({ id: 'u1' });

    interceptor.intercept(ctx, handler).subscribe((result) => {
      expect(result.message).toBe('Success');
      done();
    });
  });

  it('returns raw data when response has no data wrapper', (done) => {
    const ctx = makeContext();
    const rawData = [{ id: '1' }, { id: '2' }];
    const handler = makeHandler(rawData);

    interceptor.intercept(ctx, handler).subscribe((result) => {
      expect(result.data).toEqual(rawData);
      done();
    });
  });

  it('includes timestamp as valid ISO string', (done) => {
    const ctx = makeContext();
    const handler = makeHandler(null);

    interceptor.intercept(ctx, handler).subscribe((result) => {
      expect(() => new Date(result.timestamp)).not.toThrow();
      expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp);
      done();
    });
  });
});
