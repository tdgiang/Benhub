import { HttpException, HttpStatus, ArgumentsHost } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { AllExceptionsFilter } from './all-exceptions.filter';

const mockHttpAdapter = {
  getRequestUrl: jest.fn().mockReturnValue('/api/v1/test'),
  reply: jest.fn(),
};

const mockHttpAdapterHost = {
  httpAdapter: mockHttpAdapter,
} as unknown as HttpAdapterHost;

const makeHost = (): ArgumentsHost => ({
  switchToHttp: jest.fn().mockReturnValue({
    getRequest: jest.fn().mockReturnValue({}),
    getResponse: jest.fn().mockReturnValue({}),
  }),
} as unknown as ArgumentsHost);

describe('AllExceptionsFilter', () => {
  let filter: AllExceptionsFilter;

  beforeEach(() => {
    jest.clearAllMocks();
    filter = new AllExceptionsFilter(mockHttpAdapterHost);
  });

  it('should be defined', () => {
    expect(filter).toBeDefined();
  });

  it('returns 500 for non-HTTP exceptions', () => {
    filter.catch(new Error('unexpected'), makeHost());

    expect(mockHttpAdapter.reply).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ success: false, statusCode: 500 }),
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  });

  it('returns correct status for HttpException', () => {
    filter.catch(new HttpException('Not found', 404), makeHost());

    expect(mockHttpAdapter.reply).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ success: false, statusCode: 404 }),
      404,
    );
  });

  it('includes error code mapping for known statuses', () => {
    filter.catch(new HttpException('Unauthorized', 401), makeHost());

    const body = mockHttpAdapter.reply.mock.calls[0][1];
    expect(body.error.code).toBe('unauthorized');
  });

  it('includes validation details when response.message is array', () => {
    const exception = new HttpException(
      { message: ['field is required', 'field must be string'], error: 'Bad Request', statusCode: 400 },
      400,
    );
    filter.catch(exception, makeHost());

    const body = mockHttpAdapter.reply.mock.calls[0][1];
    expect(body.error.details).toEqual(['field is required', 'field must be string']);
  });

  it('data field is always null in error response', () => {
    filter.catch(new HttpException('Forbidden', 403), makeHost());

    const body = mockHttpAdapter.reply.mock.calls[0][1];
    expect(body.data).toBeNull();
  });

  it('sets path from httpAdapter.getRequestUrl', () => {
    filter.catch(new Error('oops'), makeHost());

    const body = mockHttpAdapter.reply.mock.calls[0][1];
    expect(body.path).toBe('/api/v1/test');
  });

  it('uses internal_server_error code for unmapped status codes', () => {
    filter.catch(new HttpException('I am a teapot', 418), makeHost());

    const body = mockHttpAdapter.reply.mock.calls[0][1];
    expect(body.error.code).toBe('internal_server_error');
  });
});
