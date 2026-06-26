import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { CustomerProfile } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerProfile)
    private readonly customerRepository: Repository<CustomerProfile>,
  ) {}

  create(dto: CreateCustomerProfileDto, userId: number) {
    const profile = this.customerRepository.create({
      userId,
      firstName: dto.firstName,
      lastName: dto.lastName,
      phoneNumber: dto.phoneNumber,
      address: dto.address,
    });
    return this.customerRepository.save(profile);
  }

  findAll() {
    return this.customerRepository.find({
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
    return this.customerRepository.findOne({
      where: { userId },
    });
  }

  async update(id: number, dto: UpdateCustomerProfileDto) {
    const profile = await this.customerRepository.findOne({
      where: { id },
    });
    if (!profile) {
      throw new NotFoundException('that profile is not found');
    }
    Object.assign(profile, dto);
    return this.customerRepository.save(profile);
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
