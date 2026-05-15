import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma, Lead } from '@prisma/client';
import { BaseRepository } from '../../../common/infrastructure/base.repository';

@Injectable()
export class LeadsRepository extends BaseRepository<
  Lead,
  Prisma.LeadCreateInput,
  Prisma.LeadUpdateInput,
  Prisma.LeadWhereUniqueInput,
  Prisma.LeadWhereInput,
  Prisma.LeadOrderByWithRelationInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.lead as any);
  }
}
