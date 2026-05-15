import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PostStatus } from '@prisma/client';

@Injectable()
export class StatsService {
  constructor(private readonly prisma: PrismaService) {}

  async getDashboardStats() {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const [
      postTotal,
      postPublished,
      postDraft,
      leadTotal,
      leadDriver,
      leadPartner,
      leadThisWeek,
      userTotal,
      userActive,
      recentLeads,
      recentPosts,
    ] = await Promise.all([
      this.prisma.post.count({ where: { deletedAt: null } }),
      this.prisma.post.count({ where: { deletedAt: null, status: PostStatus.PUBLISHED } }),
      this.prisma.post.count({ where: { deletedAt: null, status: PostStatus.DRAFT } }),
      this.prisma.lead.count({ where: { deletedAt: null } }),
      this.prisma.lead.count({ where: { deletedAt: null, segment: 'driver' } }),
      this.prisma.lead.count({ where: { deletedAt: null, segment: 'partner' } }),
      this.prisma.lead.count({ where: { deletedAt: null, createdAt: { gte: weekAgo } } }),
      this.prisma.user.count({ where: { deletedAt: null } }),
      this.prisma.user.count({ where: { deletedAt: null, isActive: true } }),
      this.prisma.lead.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: {
          id: true,
          segment: true,
          fullName: true,
          phone: true,
          province: true,
          createdAt: true,
        },
      }),
      this.prisma.post.findMany({
        where: { deletedAt: null },
        orderBy: { createdAt: 'desc' },
        take: 5,
        select: { id: true, title: true, status: true, createdAt: true },
      }),
    ]);

    return {
      posts: { total: postTotal, published: postPublished, draft: postDraft },
      leads: { total: leadTotal, driver: leadDriver, partner: leadPartner, thisWeek: leadThisWeek },
      users: { total: userTotal, active: userActive },
      recentLeads,
      recentPosts,
    };
  }
}
