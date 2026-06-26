import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAllUsers() {
    return await this.userRepository.find({
      select: { id: true, email: true, role: true },
    });
  }
  // Creating a user function
  async createUser(dto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
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
    const user = this.userRepository.create({
      email: dto.email,
      password: hashedPass,
      role: dto.role,
      phone: dto.phone,
    });

    const saved = await this.userRepository.save(user);
    return {
      id: saved.id,
      eamil: saved.email,
      role: saved.role,
    };
  }
  // login function
  async findUsinEmail(email: string) {
    return await this.userRepository.findOne({
      where: { email },
    });
  }
}
