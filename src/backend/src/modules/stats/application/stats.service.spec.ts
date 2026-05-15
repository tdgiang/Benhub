import { Test, TestingModule } from '@nestjs/testing';
import { StatsService } from './stats.service';
import { PrismaService } from '../../../prisma/prisma.service';

const recentLeads = [
  { id: 'l1', segment: 'driver', fullName: 'A', phone: '09', province: 'HCM', createdAt: new Date() },
  { id: 'l2', segment: 'partner', fullName: 'B', phone: '08', province: null, createdAt: new Date() },
];

const recentPosts = [
  { id: 'p1', title: 'Post 1', status: 'PUBLISHED', createdAt: new Date() },
];

const mockPrisma = {
  post: {
    count: jest.fn(),
  },
  lead: {
    count: jest.fn(),
    findMany: jest.fn(),
  },
  user: {
    count: jest.fn(),
  },
};

describe('StatsService', () => {
  let service: StatsService;

  beforeEach(async () => {
    jest.clearAllMocks();

    // Default mock values: 3 posts (2 published, 1 draft), 5 leads (3 driver, 2 partner, 2 this week), 4 users (all active)
    mockPrisma.post.count
      .mockResolvedValueOnce(3)    // total
      .mockResolvedValueOnce(2)    // published
      .mockResolvedValueOnce(1);   // draft
    mockPrisma.lead.count
      .mockResolvedValueOnce(5)    // total
      .mockResolvedValueOnce(3)    // driver
      .mockResolvedValueOnce(2)    // partner
      .mockResolvedValueOnce(2);   // this week
    mockPrisma.user.count
      .mockResolvedValueOnce(4)    // total
      .mockResolvedValueOnce(4);   // active
    mockPrisma.lead.findMany.mockResolvedValue(recentLeads);
    mockPrisma.post.count // findMany for posts is separate
    const mockPrismaWithFindMany = {
      ...mockPrisma,
      post: { ...mockPrisma.post, findMany: jest.fn().mockResolvedValue(recentPosts) },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StatsService,
        { provide: PrismaService, useValue: mockPrismaWithFindMany },
      ],
    }).compile();

    service = module.get<StatsService>(StatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getDashboardStats', () => {
    it('returns correct shape with all required keys', async () => {
      const stats = await service.getDashboardStats();

      expect(stats).toMatchObject({
        posts: expect.objectContaining({
          total: expect.any(Number),
          published: expect.any(Number),
          draft: expect.any(Number),
        }),
        leads: expect.objectContaining({
          total: expect.any(Number),
          driver: expect.any(Number),
          partner: expect.any(Number),
          thisWeek: expect.any(Number),
        }),
        users: expect.objectContaining({
          total: expect.any(Number),
          active: expect.any(Number),
        }),
        recentLeads: expect.any(Array),
        recentPosts: expect.any(Array),
      });
    });

    it('recentLeads and recentPosts are arrays (max 5 items)', async () => {
      const stats = await service.getDashboardStats();

      expect(stats.recentLeads.length).toBeLessThanOrEqual(5);
      expect(stats.recentPosts.length).toBeLessThanOrEqual(5);
    });

    it('leads.driver + leads.partner equals leads.total in single-segment scenario', async () => {
      const stats = await service.getDashboardStats();

      // driver (3) + partner (2) = 5 = total
      expect(stats.leads.driver + stats.leads.partner).toBe(stats.leads.total);
    });

    it('queries with thisWeek cutoff date 7 days ago', async () => {
      await service.getDashboardStats();

      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

      // Find the call to lead.count that has a createdAt.gte filter (thisWeek call)
      const calls = (service['prisma'].lead.count as jest.Mock).mock.calls;
      const weekCall = calls.find((args: any[]) =>
        args[0]?.where?.createdAt?.gte !== undefined,
      );
      expect(weekCall).toBeDefined();
      const gte: Date = weekCall[0].where.createdAt.gte;
      const diffMs = Math.abs(gte.getTime() - sevenDaysAgo.getTime());
      expect(diffMs).toBeLessThan(5000); // within 5 seconds of expected cutoff
    });
  });
});
