import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Static/specific routes first
  @Get()
  findAll(@Query('role') role?: 'INTERN' | 'ENGINEER' | 'GOV') {
    return this.usersService.findAll(role);
  }

  @Post()
  createUser(
    @Body()
    userData: {
      name: string;
      email: string;
      role?: 'INTERN' | 'ENGINEER' | 'GOV';
    },
  ) {
    return this.usersService.create(userData);
  }

  // Dynamic routes with :id LAST
  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
    // return this.usersService.findOne(Number(id));
  }

  @Patch(':id')
  updateOne(
    @Param('id') id: string,
    @Body()
    updateData: {
      name?: string;
      email?: string;
      role?: 'INTERN' | 'ENGINEER' | 'GOV';
    },
  ) {
    return this.usersService.update(+id, updateData);
  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.usersService.delete(+id);
  }
}
