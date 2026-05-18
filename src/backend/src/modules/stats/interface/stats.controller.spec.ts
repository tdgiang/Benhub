import { Test, TestingModule } from '@nestjs/testing';
import { StatsController } from './stats.controller';
import { StatsService } from '../application/stats.service';

const mockStats = {
  posts: { total: 3, published: 2, draft: 1 },
  leads: { total: 5, driver: 3, partner: 2, thisWeek: 2 },
  users: { total: 4, active: 4 },
  recentLeads: [],
  recentPosts: [],
};

const mockStatsService = {
  getDashboardStats: jest.fn(),
};

describe('StatsController', () => {
  let controller: StatsController;

  beforeEach(async () => {
    jest.clearAllMocks();
    mockStatsService.getDashboardStats.mockResolvedValue(mockStats);

    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatsController],
      providers: [{ provide: StatsService, useValue: mockStatsService }],
    }).compile();

    controller = module.get<StatsController>(StatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getDashboard', () => {
    it('calls statsService.getDashboardStats and returns stats with message', async () => {
      const result = await controller.getDashboard();

      expect(mockStatsService.getDashboardStats).toHaveBeenCalledTimes(1);
      expect(result.data).toEqual(mockStats);
      expect(result.message).toContain('thành công');
    });

    it('result contains posts, leads, users, recentLeads, recentPosts', async () => {
      const result = await controller.getDashboard();

      expect(result.data).toMatchObject({
        posts: expect.objectContaining({ total: expect.any(Number) }),
        leads: expect.objectContaining({ total: expect.any(Number) }),
        users: expect.objectContaining({ total: expect.any(Number) }),
        recentLeads: expect.any(Array),
        recentPosts: expect.any(Array),
      });
    });
  });
});
