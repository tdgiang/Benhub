import { Module } from '@nestjs/common';
import { LeadsService } from './application/leads.service';
import { LeadsController } from './interface/leads.controller';
import { LeadsRepository } from './infrastructure/leads.repository';

@Module({
  controllers: [LeadsController],
  providers: [LeadsService, LeadsRepository],
  exports: [LeadsService],
})
export class LeadsModule {}
