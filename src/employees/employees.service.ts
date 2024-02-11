import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
import { ERole } from 'src/enum';

@Injectable()
export class EmployeesService {
  constructor(private readonly databaseService: DatabaseService){

  }

  async create(createEmployeeDto: Prisma.UserCreateInput) {
    return this.databaseService.user.create({
      data: createEmployeeDto
    })
  }

  async findAll(role?: ERole) {
    if(role) return this.databaseService.user.findMany({
      where: {
        role: role as ERole
      }
    })

    return this.databaseService.user.findMany()
  }

  async findOne(id: number) {
    return this.databaseService.user.findUnique({
      where: {
        id,
      }
    })
  }

  async update(id: number, updateEmployeeDto: Prisma.UserUpdateInput) {
    return this.databaseService.user.update({
      where: {
        id,
      },
      data : updateEmployeeDto
    })
  }

  async remove(id: number) {
    return this.databaseService.user.delete({
      where: {
        id,
      }
    })
  }
}
