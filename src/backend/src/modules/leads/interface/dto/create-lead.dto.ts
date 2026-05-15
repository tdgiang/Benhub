import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsEmail,
  IsInt,
  Min,
  MaxLength,
  Matches,
} from 'class-validator';
import { LeadSegment } from '@prisma/client';

export class CreateLeadDto {
  @ApiProperty({ enum: LeadSegment, description: 'Phân khúc: driver hoặc partner' })
  @IsEnum(LeadSegment)
  @IsNotEmpty()
  segment: LeadSegment;

  @ApiProperty({ description: 'Họ tên', example: 'Nguyễn Văn A' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  fullName: string;

  @ApiProperty({ description: 'Số điện thoại', example: '0912345678' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^0[0-9]{9}$/, { message: 'Số điện thoại không hợp lệ (10 số, bắt đầu bằng 0)' })
  phone: string;

  @ApiPropertyOptional({ description: 'Email liên hệ' })
  @IsEmail()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Tỉnh / khu vực hoạt động' })
  @IsString()
  @IsOptional()
  @MaxLength(80)
  province?: string;

  @ApiPropertyOptional({ description: 'Tên công ty (partner)' })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  companyName?: string;

  @ApiPropertyOptional({ description: 'Biển số xe (driver)' })
  @IsString()
  @IsOptional()
  @MaxLength(20)
  licensePlate?: string;

  @ApiPropertyOptional({ description: 'Quy mô dự án / nhu cầu hợp tác' })
  @IsString()
  @IsOptional()
  @MaxLength(120)
  projectScale?: string;

  @ApiPropertyOptional({ description: 'Số lượng xe (fleet size)' })
  @IsInt()
  @Min(0)
  @IsOptional()
  fleetSize?: number;

  @ApiPropertyOptional({ description: 'Nguồn (driver_signup_page, partner_page…)' })
  @IsString()
  @IsOptional()
  @MaxLength(80)
  source?: string;

  @ApiPropertyOptional({ description: 'Ghi chú thêm' })
  @IsString()
  @IsOptional()
  @MaxLength(500)
  note?: string;
}
