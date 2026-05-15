import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
  Logger,
} from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import type { Cache } from 'cache-manager';
import { Prisma, PostStatus } from '@prisma/client';
import { PostsRepository } from '../infrastructure/posts.repository';
import { CreatePostDto } from '../interface/dto/create-post.dto';
import { UpdatePostDto } from '../interface/dto/update-post.dto';
import { PostQueryDto } from '../interface/dto/post-query.dto';

@Injectable()
export class PostsService {
  private readonly logger = new Logger(PostsService.name);
  private readonly listCacheKeys = new Set<string>();

  constructor(
    private readonly repository: PostsRepository,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(dto: CreatePostDto, authorId: string) {
    const existing = await this.repository.findFirst({ slug: dto.slug, deletedAt: null } as any);
    if (existing) throw new ConflictException(`Slug "${dto.slug}" đã tồn tại`);

    const post = await this.repository.create({
      title: dto.title,
      slug: dto.slug,
      excerpt: dto.excerpt,
      content: dto.content,
      status: dto.status ?? PostStatus.DRAFT,
      author: { connect: { id: authorId } },
    });

    await this.invalidateListCache();
    this.logger.log(`Post created: ${post.id} slug="${post.slug}"`);
    return post;
  }

  async findAll(query: PostQueryDto) {
    const cacheKey = `posts_list_${JSON.stringify(query)}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const {
      page = 1,
      limit = 10,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      search,
      status,
    } = query;

    const skip = (page - 1) * limit;
    const where: Prisma.PostWhereInput = { deletedAt: null };

    if (status) where.status = status;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
      ];
    }

    const [items, total] = await this.repository.findAll({
      skip,
      take: limit,
      where,
      orderBy: { [sortBy]: sortOrder } as Prisma.PostOrderByWithRelationInput,
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
    const cacheKey = `post_${id}`;
    const cached = await this.cacheManager.get(cacheKey);
    if (cached) return cached;

    const post = await this.repository.findOne({ id });
    if (!post || post.deletedAt) {
      throw new NotFoundException(`Không tìm thấy bài viết với ID: ${id}`);
    }

    await this.cacheManager.set(cacheKey, post, 60000);
    return post;
  }

  async findBySlug(slug: string) {
    const post = await this.repository.findFirst({ slug, deletedAt: null } as any);
    if (!post) throw new NotFoundException(`Không tìm thấy bài viết với slug: ${slug}`);
    return post;
  }

  async update(id: string, dto: UpdatePostDto) {
    await this.findOne(id);

    if (dto.slug) {
      const conflict = await this.repository.findFirst({
        slug: dto.slug,
        deletedAt: null,
        NOT: { id },
      } as any);
      if (conflict) throw new ConflictException(`Slug "${dto.slug}" đã tồn tại`);
    }

    const post = await this.repository.update({
      where: { id },
      data: dto,
    });

    await this.invalidatePostCache(id);
    this.logger.log(`Post updated: ${id}`);
    return post;
  }

  async remove(id: string) {
    await this.findOne(id);
    const post = await this.repository.softRemove({ id });
    await this.invalidatePostCache(id);
    this.logger.log(`Post soft-deleted: ${id}`);
    return post;
  }

  private async invalidatePostCache(id: string) {
    await this.cacheManager.del(`post_${id}`);
    await this.invalidateListCache();
  }

  private async invalidateListCache() {
    await Promise.all([...this.listCacheKeys].map((k) => this.cacheManager.del(k)));
    this.listCacheKeys.clear();
  }
}
