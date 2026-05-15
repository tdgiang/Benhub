import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PostStatus } from '@prisma/client';
import { PaginationDto } from '../../../../common/dto/pagination.dto';

export class PostQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: PostStatus, description: 'Lọc theo trạng thái' })
  @IsEnum(PostStatus)
  @IsOptional()
  status?: PostStatus;
}
