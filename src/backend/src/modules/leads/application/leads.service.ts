import {
  Injectable,
  NotFoundException,
  Inject,
  Logger,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Prisma } from '@prisma/client';
import { LeadsRepository } from '../infrastructure/leads.repository';
import { CreateLeadDto } from '../interface/dto/create-lead.dto';
import { LeadQueryDto } from '../interface/dto/lead-query.dto';

@Injectable()
export class LeadsService {
  private readonly logger = new Logger(LeadsService.name);
  private readonly listCacheKeys = new Set<string>();

  constructor(
    private readonly repository: LeadsRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(dto: CreateLeadDto) {
    const lead = await this.repository.create({ ...dto });
    await this.invalidateListCache();
    this.logger.log(`Lead created: ${lead.id} [${lead.segment}] ${lead.phone}`);
    return lead;
  }

  async findAll(query: LeadQueryDto) {
    const cacheKey = `leads_list_${JSON.stringify(query)}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      segment,
      province,
      dateFrom,
      dateTo,
    } = query;

    const skip = (page - 1) * limit;
    const where: Prisma.LeadWhereInput = { deletedAt: null };

    if (segment) where.segment = segment;
    if (province) where.province = { contains: province, mode: 'insensitive' };
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    const [items, total] = await this.repository.findAll({
      skip,
      take: limit,
      where,
      orderBy: { [sortBy]: sortOrder } as Prisma.LeadOrderByWithRelationInput,
    });

    const result = {
      items,
      meta: { total, page, limit, totalPages: Math.ceil(total / limit) },
    };

    this.listCacheKeys.add(cacheKey);
    await this.cacheManager.set(cacheKey, result, 60000);
    return result;
  }

  async findOne(id: string) {
    const lead = await this.repository.findOne({ id });
    if (!lead || lead.deletedAt) {
      throw new NotFoundException(`Không tìm thấy lead với ID: ${id}`);
    }
    return lead;
  }

  async remove(id: string) {
    await this.findOne(id);
    const lead = await this.repository.softRemove({ id });
    await this.invalidateListCache();
    this.logger.log(`Lead soft-deleted: ${id}`);
    return lead;
  }

  /** Returns ALL non-deleted leads matching filters — used by CSV export. */
  async findAllForExport(query: LeadQueryDto) {
    const where: Prisma.LeadWhereInput = { deletedAt: null };

    if (query.segment) where.segment = query.segment;
    if (query.province) where.province = { contains: query.province, mode: 'insensitive' };
    if (query.dateFrom || query.dateTo) {
      where.createdAt = {};
      if (query.dateFrom) where.createdAt.gte = new Date(query.dateFrom);
      if (query.dateTo) {
        const end = new Date(query.dateTo);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    const [items] = await this.repository.findAll({
      where,
      orderBy: { createdAt: 'desc' },
      take: 10000,
    });
    return items;
  }

  private async invalidateListCache() {
    await Promise.all([...this.listCacheKeys].map((k) => this.cacheManager.del(k)));
    this.listCacheKeys.clear();
  }
}
