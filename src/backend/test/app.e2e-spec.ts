import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { TransformInterceptor } from '../src/common/interceptors/transform.interceptor';

/* ─── Shared mock PrismaService ─── */
const makeEmptyResult = () => Promise.resolve([[], 0]);

const mockPrismaService = {
  // Users
  user: {
    findMany: jest.fn().mockResolvedValue([]),
    findFirst: jest.fn().mockResolvedValue(null),
    findUnique: jest.fn().mockResolvedValue(null),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn().mockResolvedValue(0),
  },
  // Posts
  post: {
    findMany: jest.fn().mockResolvedValue([]),
    findFirst: jest.fn().mockResolvedValue(null),
    findUnique: jest.fn().mockResolvedValue(null),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn().mockResolvedValue(0),
  },
  // Leads
  lead: {
    findMany: jest.fn().mockResolvedValue([]),
    findFirst: jest.fn().mockResolvedValue(null),
    findUnique: jest.fn().mockResolvedValue(null),
    create: jest.fn(),
    update: jest.fn(),
    count: jest.fn().mockResolvedValue(0),
  },
  // Prisma transaction helper
  $transaction: jest.fn((fn: any) => fn(mockPrismaService)),
};

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(PrismaService)
      .useValue(mockPrismaService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api/v1');
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, transform: true }),
    );
    app.useGlobalInterceptors(new TransformInterceptor());
    await app.init();
  });

  afterAll(async () => {
    if (app) await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset default resolved values
    mockPrismaService.user.findMany.mockResolvedValue([]);
    mockPrismaService.user.findFirst.mockResolvedValue(null);
    mockPrismaService.user.count.mockResolvedValue(0);
    mockPrismaService.post.findMany.mockResolvedValue([]);
    mockPrismaService.post.findFirst.mockResolvedValue(null);
    mockPrismaService.post.count.mockResolvedValue(0);
    mockPrismaService.lead.findMany.mockResolvedValue([]);
    mockPrismaService.lead.findFirst.mockResolvedValue(null);
    mockPrismaService.lead.count.mockResolvedValue(0);
  });

  /* ─── Generic app ─── */
  describe('App basics', () => {
    it('returns 401 for protected route without token', () => {
      return request(app.getHttpServer()).get('/api/v1/users').expect(401);
    });

    it('returns 404 for non-existent route', () => {
      return request(app.getHttpServer())
        .get('/api/v1/non-existent')
        .expect(404);
    });
  });

  /* ─── Leads ─── */
  describe('POST /api/v1/leads (public)', () => {
    it('returns 201 with valid driver lead', () => {
      const mockLead = {
        id: 'uuid-1',
        segment: 'driver',
        fullName: 'Nguyễn Văn An',
        phone: '0912345678',
        province: 'Hồ Chí Minh',
        source: 'driver_signup_page',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        deletedAt: null,
      };
      mockPrismaService.lead.create.mockResolvedValue(mockLead);

      return request(app.getHttpServer())
        .post('/api/v1/leads')
        .send({
          segment: 'driver',
          fullName: 'Nguyễn Văn An',
          phone: '0912345678',
          province: 'Hồ Chí Minh',
          source: 'driver_signup_page',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body.statusCode).toBe(201);
          expect(res.body.data.segment).toBe('driver');
          expect(res.body.data.fullName).toBe('Nguyễn Văn An');
        });
    });

    it('returns 201 with valid partner lead', () => {
      const mockLead = {
        id: 'uuid-2',
        segment: 'partner',
        fullName: 'B',
        phone: '0987654321',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      mockPrismaService.lead.create.mockResolvedValue(mockLead);

      return request(app.getHttpServer())
        .post('/api/v1/leads')
        .send({
          segment: 'partner',
          fullName: 'Công ty B',
          phone: '0987654321',
          companyName: 'Cty B',
        })
        .expect(201);
    });

    it('returns 400 when phone is invalid', () => {
      return request(app.getHttpServer())
        .post('/api/v1/leads')
        .send({ segment: 'driver', fullName: 'A', phone: '123' })
        .expect(400);
    });

    it('returns 400 when segment is missing', () => {
      return request(app.getHttpServer())
        .post('/api/v1/leads')
        .send({ fullName: 'A', phone: '0912345678' })
        .expect(400);
    });

    it('returns 400 when fullName is missing', () => {
      return request(app.getHttpServer())
        .post('/api/v1/leads')
        .send({ segment: 'driver', phone: '0912345678' })
        .expect(400);
    });

    it('returns 400 when segment is invalid enum value', () => {
      return request(app.getHttpServer())
        .post('/api/v1/leads')
        .send({ segment: 'invalid', fullName: 'A', phone: '0912345678' })
        .expect(400);
    });
  });

  describe('GET /api/v1/leads (admin)', () => {
    it('returns 401 without token', () => {
      return request(app.getHttpServer()).get('/api/v1/leads').expect(401);
    });
  });

  describe('GET /api/v1/leads/export/csv (admin)', () => {
    it('returns 401 without token', () => {
      return request(app.getHttpServer())
        .get('/api/v1/leads/export/csv')
        .expect(401);
    });
  });

  /* ─── Posts ─── */
  describe('GET /api/v1/posts (public)', () => {
    it('returns 200 with empty list when no posts', () => {
      mockPrismaService.post.findMany.mockResolvedValue([]);
      mockPrismaService.post.count.mockResolvedValue(0);

      return request(app.getHttpServer())
        .get('/api/v1/posts?page=1&limit=5')
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(Array.isArray(res.body.data.items)).toBe(true);
          expect(typeof res.body.data.meta.total).toBe('number');
        });
    });

    it('returns 200 with posts list', () => {
      const mockPosts = [
        {
          id: 'p1',
          title: 'Post 1',
          slug: 'post-1',
          status: 'PUBLISHED',
          content: '<p>test</p>',
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null,
        },
      ];
      mockPrismaService.post.findMany.mockResolvedValue(mockPosts);
      mockPrismaService.post.count.mockResolvedValue(1);

      return request(app.getHttpServer())
        .get('/api/v1/posts?page=2&limit=5') // different cache key
        .expect(200)
        .expect((res) => {
          expect(res.body.success).toBe(true);
          expect(res.body.data.meta.total).toBe(1);
        });
    });

    it('accepts status filter param', () => {
      mockPrismaService.post.findMany.mockResolvedValue([]);
      mockPrismaService.post.count.mockResolvedValue(0);

      return request(app.getHttpServer())
        .get('/api/v1/posts?status=PUBLISHED&page=3')
        .expect(200);
    });

    it('returns 400 when status is invalid enum', () => {
      return request(app.getHttpServer())
        .get('/api/v1/posts?status=INVALID')
        .expect(400);
    });
  });

  describe('POST /api/v1/posts (admin)', () => {
    it('returns 401 without token', () => {
      return request(app.getHttpServer())
        .post('/api/v1/posts')
        .send({ title: 'T', slug: 's', content: 'c' })
        .expect(401);
    });
  });

  describe('GET /api/v1/posts/slug/:slug (public)', () => {
    it('returns 404 for non-existent slug', () => {
      mockPrismaService.post.findFirst.mockResolvedValue(null);

      return request(app.getHttpServer())
        .get('/api/v1/posts/slug/non-existent-slug')
        .expect(404);
    });

    it('returns 200 for existing slug', () => {
      const post = {
        id: 'p1',
        slug: 'my-post',
        title: 'My Post',
        content: '<p>c</p>',
        status: 'PUBLISHED',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      };
      mockPrismaService.post.findFirst.mockResolvedValue(post);

      return request(app.getHttpServer())
        .get('/api/v1/posts/slug/my-post')
        .expect(200)
        .expect((res) => {
          expect(res.body.data.slug).toBe('my-post');
        });
    });
  });

  /* ─── Stats ─── */
  describe('GET /api/v1/stats (admin)', () => {
    it('returns 401 without token', () => {
      return request(app.getHttpServer()).get('/api/v1/stats').expect(401);
    });
  });
});
