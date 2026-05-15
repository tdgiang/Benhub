import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { PostStatus } from '@prisma/client';

export class CreatePostDto {
  @ApiProperty({ description: 'Tiêu đề bài viết', example: 'BenHub ra mắt platform mới' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(200)
  title: string;

  @ApiProperty({ description: 'Slug URL', example: 'benhub-ra-mat-platform-moi' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^[a-z0-9-]+$/, { message: 'Slug chỉ được chứa chữ thường, số và dấu gạch ngang' })
  @MaxLength(220)
  slug: string;

  @ApiPropertyOptional({ description: 'Tóm tắt (max 300 ký tự)', maxLength: 300 })
  @IsString()
  @IsOptional()
  @MaxLength(300)
  excerpt?: string;

  @ApiProperty({ description: 'Nội dung HTML từ rich-text editor' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiPropertyOptional({ enum: PostStatus, default: PostStatus.DRAFT })
  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus = PostStatus.DRAFT;
}
