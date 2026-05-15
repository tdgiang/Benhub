import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Request,
  Res,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import type { Response } from 'express';
import { PostsService } from '../application/posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostQueryDto } from './dto/post-query.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Bài viết (Posts)')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /* ─── Public GET routes ─── */

  @Get()
  @Public()
  @ApiOperation({ summary: 'Danh sách bài viết (public, filter + phân trang)' })
  async findAll(@Query() query: PostQueryDto) {
    const data = await this.postsService.findAll(query);
    return { message: 'Lấy danh sách bài viết thành công', data };
  }

  @Get('slug/:slug')
  @Public()
  @ApiOperation({ summary: 'Lấy bài viết theo slug (public)' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bài viết' })
  async findBySlug(@Param('slug') slug: string) {
    const data = await this.postsService.findBySlug(slug);
    return { message: 'Lấy bài viết thành công', data };
  }

  @Get(':id')
  @Public()
  @ApiOperation({ summary: 'Lấy bài viết theo ID (public)' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bài viết' })
  async findOne(@Param('id') id: string) {
    const data = await this.postsService.findOne(id);
    return { message: 'Lấy bài viết thành công', data };
  }

  /* ─── Admin write routes ─── */

  @Post()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Tạo bài viết mới (Admin)' })
  @ApiResponse({ status: 201, description: 'Tạo bài viết thành công' })
  @ApiResponse({ status: 409, description: 'Slug đã tồn tại' })
  async create(@Body() dto: CreatePostDto, @Request() req: any, @Res({ passthrough: true }) res: Response) {
    const data = await this.postsService.create(dto, req.user.id);
    res.header('Location', `/api/v1/posts/${data.id}`);
    return { message: 'Tạo bài viết thành công', data };
  }

  @Patch(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật bài viết (Admin)' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bài viết' })
  @ApiResponse({ status: 409, description: 'Slug đã tồn tại' })
  async update(@Param('id') id: string, @Body() dto: UpdatePostDto) {
    const data = await this.postsService.update(id, dto);
    return { message: 'Cập nhật bài viết thành công', data };
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa mềm bài viết (Admin)' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy bài viết' })
  async remove(@Param('id') id: string) {
    const data = await this.postsService.remove(id);
    return { message: 'Xóa bài viết thành công', data };
  }
}
