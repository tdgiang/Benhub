import { Module } from '@nestjs/common';
import { UploadsController } from './interface/uploads.controller';

@Module({
  controllers: [UploadsController],
})
export class UploadsModule {}
