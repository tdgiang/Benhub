import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsDateString } from 'class-validator';
import { LeadSegment } from '@prisma/client';
import { PaginationDto } from '../../../../common/dto/pagination.dto';

export class LeadQueryDto extends PaginationDto {
  @ApiPropertyOptional({ enum: LeadSegment, description: 'Lọc theo phân khúc' })
  @IsEnum(LeadSegment)
  @IsOptional()
  segment?: LeadSegment;

  @ApiPropertyOptional({ description: 'Lọc theo tỉnh / khu vực' })
  @IsString()
  @IsOptional()
  province?: string;

  @ApiPropertyOptional({ description: 'Từ ngày (ISO 8601)', example: '2026-01-01' })
  @IsDateString()
  @IsOptional()
  dateFrom?: string;

  @ApiPropertyOptional({ description: 'Đến ngày (ISO 8601)', example: '2026-12-31' })
  @IsDateString()
  @IsOptional()
  dateTo?: string;
}
