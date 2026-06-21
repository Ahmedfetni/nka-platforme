import { Injectable, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAllUsers() {
    return await this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  }
  // Creating a user function
  async createUser(dto: CreateUserDto) {
    const userExist = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (userExist) {
      throw new ConflictException(
        'There is already a user with that eamil adress',
      );
    }
    const hashedPass = await bcrypt.hash(dto.password, 10);
    return await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPass,
        role: dto.role,
        phone: dto.phone,
      },

      select: {
        id: true,
        email: true,
        role: true,
      },
    });
  }
  // login function
  async findUsinEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }
}
