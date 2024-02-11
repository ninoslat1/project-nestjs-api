import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { EmployeesModule } from './employees/employees.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModuleModule } from './logger-module/logger-module.module';

@Module({
  imports: [DatabaseModule, EmployeesModule, ThrottlerModule.forRoot([{
    name: 'long',
    ttl: 60000,
    limit: 10
  }, {
    name: 'short',
    ttl: 1000,
    limit: 1
  }]), LoggerModuleModule],
  controllers: [AppController],
  providers: [AppService, {
    provide:APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule {}
