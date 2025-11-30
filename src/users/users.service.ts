import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

export type Role = 'INTERN' | 'ENGINEER' | 'GOV';

export interface User {
  id: number;
  name: string;
  email: string;
  role?: Role;
}

@Injectable()
export class UsersService {
  private users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'INTERN' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'GOV' },
    { id: 3, name: 'Bob Wilson', email: 'bob@example.com' }, // role omitted (optional)
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', role: 'GOV' },
    {
      id: 5,
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      role: 'INTERN',
    },
  ];

  findAll(role?: Role) {
    if (role) {
      const roleArray = this.users.filter((user) => user.role === role);
      if (roleArray.length === 0) {
        throw new NotFoundException('User role not found, Does not exist');
        return roleArray;
      }
    }
    return this.users;
  }

  findOne(id: number) {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found , doesnt exist');
    }
    return this.users.find((user) => user.id === id);
  }

  create(createUserDto: CreateUserDto) {
    const newId = this.users.length
      ? Math.max(...this.users.map((u) => u.id)) + 1
      : 1;
    const newUser: User = { id: newId, ...createUserDto } as unknown as User;
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, updatedUser: UpdateUserDto) {
    const cleanedUpdate = Object.fromEntries(
      Object.entries(updatedUser).filter(([, v]) => v !== undefined),
    ) as Partial<User>;

    this.users = this.users.map((user) => {
      if (user.id === id) {
        return { ...user, ...cleanedUpdate };
      }
      return user;
    });

    return this.findOne(id);
  }

  delete(id: number) {
    const removedUser = this.findOne(id);
    this.users = this.users.filter((user) => user.id !== id);
    return removedUser;
  }
}
