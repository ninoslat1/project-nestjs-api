import { Module } from '@nestjs/common';
import { LoggerModuleService } from './logger-module.service';

@Module({
  providers: [LoggerModuleService],
  exports: [LoggerModuleService]
})
export class LoggerModuleModule {}
