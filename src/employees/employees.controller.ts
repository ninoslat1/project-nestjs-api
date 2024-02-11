import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Ip } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client'
import { ERole } from 'src/enum';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { LoggerModuleService } from 'src/logger-module/logger-module.service';

@SkipThrottle()
@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}
  private readonly logger = new LoggerModuleService(EmployeesController.name)

  @Post()
  create(@Body() createEmployeeDto: Prisma.UserCreateInput) {
    return this.employeesService.create(createEmployeeDto);
  }

  @SkipThrottle({default: false})
  @Get()
  findAll(@Ip() ip:string ,@Query("role") role: ERole) {
    this.logger.log(`Request for ALL Employees\t${ip}`)
    return this.employeesService.findAll(role);
  }

  @Throttle({ short: {ttl: 1000, limit: 1}})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.UserUpdateInput) {
    return this.employeesService.update(+id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeesService.remove(+id);
  }
}
