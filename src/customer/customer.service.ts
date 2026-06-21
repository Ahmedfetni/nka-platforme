import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { NotFoundException } from '@nestjs/common';
@Injectable()
export class CustomerService {
  constructor(private prisma: PrismaService) {}
  create(dto: CreateCustomerProfileDto, userId: number) {
    return this.prisma.customerProfile.create({
      data: {
        userId: userId,
        firstName: dto.firstName,
        lastName: dto.lastName,
        phoneNumber: dto.phoneNumber,
        address: dto.address,
      },
    });
  }

  findAll() {
    return this.prisma.customerProfile.findMany({
      select: {
        userId: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        address: true,
      },
    });
  }

  findOne(userId: number) {
    return this.prisma.customerProfile.findUnique({
      where: {
        userId,
      },
    });
  }

  async update(id: number, dto: UpdateCustomerProfileDto) {
    const profile = await this.prisma.customerProfile.findUnique({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException('that profile is not found');
    }
    return this.prisma.customerProfile.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
