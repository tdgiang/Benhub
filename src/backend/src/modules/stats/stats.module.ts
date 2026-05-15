import { Module } from '@nestjs/common';
import { StatsService } from './application/stats.service';
import { StatsController } from './interface/stats.controller';

@Module({
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
