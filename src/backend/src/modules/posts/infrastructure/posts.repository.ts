import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Prisma, Post } from '@prisma/client';
import { BaseRepository } from '../../../common/infrastructure/base.repository';

@Injectable()
export class PostsRepository extends BaseRepository<
  Post,
  Prisma.PostCreateInput,
  Prisma.PostUpdateInput,
  Prisma.PostWhereUniqueInput,
  Prisma.PostWhereInput,
  Prisma.PostOrderByWithRelationInput
> {
  constructor(prisma: PrismaService) {
    super(prisma, prisma.post as any);
  }
}
