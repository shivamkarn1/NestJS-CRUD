import { Injectable } from '@nestjs/common';
import { Prisma, Role } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';
@Injectable()
export class EmployeesService {
  constructor(private readonly databaseServices: DatabaseService) {}

  async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
    return await this.databaseServices.employee.create({
      data: createEmployeeDto,
    });
  }

  async findAll(role?: Role) {
    if (role)
      return await this.databaseServices.employee.findMany({
        where: {
          role,
        },
      });
    return await this.databaseServices.employee.findMany();
  }

  async findOne(id: number) {
    return await this.databaseServices.employee.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
    return await this.databaseServices.employee.update({
      where: {
        id,
      },
      data: updateEmployeeDto,
    });
  }

  async remove(id: number) {
    return await this.databaseServices.employee.delete({
      where: {
        id,
      },
    });
  }
}
