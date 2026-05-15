import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
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
import { LeadsService } from '../application/leads.service';
import { CreateLeadDto } from './dto/create-lead.dto';
import { LeadQueryDto } from './dto/lead-query.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Leads (Đăng ký)')
@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  /* ─── Public: nhận form từ landing page ─── */

  @Post()
  @Public()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Gửi đăng ký từ landing page (public)' })
  @ApiResponse({ status: 201, description: 'Đăng ký thành công' })
  @ApiResponse({ status: 400, description: 'Dữ liệu không hợp lệ' })
  async create(@Body() dto: CreateLeadDto) {
    const data = await this.leadsService.create(dto);
    return { message: 'Đăng ký thành công. Chúng tôi sẽ liên hệ sớm nhất!', data };
  }

  /* ─── Admin only ─── */

  @Get()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Danh sách leads (Admin, phân trang + lọc)' })
  @ApiResponse({ status: 200, description: 'Danh sách leads với metadata phân trang' })
  async findAll(@Query() query: LeadQueryDto) {
    const data = await this.leadsService.findAll(query);
    return { message: 'Lấy danh sách leads thành công', data };
  }

  @Get('export/csv')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Export leads ra CSV (Admin)' })
  async exportCsv(@Query() query: LeadQueryDto, @Res() res: Response) {
    const leads = await this.leadsService.findAllForExport(query);

    const date = new Date().toISOString().slice(0, 10);
    res.setHeader('Content-Type', 'text/csv; charset=utf-8');
    res.setHeader('Content-Disposition', `attachment; filename="leads-${date}.csv"`);

    const headers = [
      'ID', 'Phân khúc', 'Họ tên', 'Điện thoại', 'Email',
      'Tỉnh/Khu vực', 'Tên công ty', 'Biển số xe',
      'Quy mô/Nhu cầu', 'Số xe', 'Nguồn', 'Ghi chú', 'Ngày đăng ký',
    ];

    const escape = (v: unknown) => {
      if (v == null) return '';
      const s = String(v).replace(/"/g, '""');
      return s.includes(',') || s.includes('\n') || s.includes('"') ? `"${s}"` : s;
    };

    // BOM for UTF-8 Excel compatibility
    let csv = '﻿';
    csv += headers.map(escape).join(',') + '\n';

    for (const lead of leads) {
      csv += [
        lead.id,
        lead.segment,
        lead.fullName,
        lead.phone,
        lead.email,
        lead.province,
        lead.companyName,
        lead.licensePlate,
        lead.projectScale,
        lead.fleetSize,
        lead.source,
        lead.note,
        lead.createdAt.toISOString(),
      ].map(escape).join(',') + '\n';
    }

    res.send(csv);
  }

  @Get(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Chi tiết lead (Admin)' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy lead' })
  async findOne(@Param('id') id: string) {
    const data = await this.leadsService.findOne(id);
    return { message: 'Lấy thông tin lead thành công', data };
  }

  @Delete(':id')
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa mềm lead (Admin)' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy lead' })
  async remove(@Param('id') id: string) {
    const data = await this.leadsService.remove(id);
    return { message: 'Xóa lead thành công', data };
  }
}
