import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { StatsService } from '../application/stats.service';
import { Roles } from '../../../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@ApiTags('Stats (Dashboard)')
@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get()
  @Roles(Role.ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Dashboard statistics (Admin)' })
  async getDashboard() {
    const data = await this.statsService.getDashboardStats();
    return { message: 'Lấy thống kê thành công', data };
  }
}
