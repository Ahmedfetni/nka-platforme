import { Injectable } from '@nestjs/common';
import { CreateWorkerProfileDto } from './dto/create-worker.dto';
import { UpdateWorkerProfileDto } from './dto/update-worker.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class WorkerService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateWorkerProfileDto) {
    return this.prisma.workerProfile.create({
      data: {
        userId: dto.userId,
        specialty: dto.specialty,
        experience: dto.experience,
      },
    });
  }

  findAll() {
    return this.prisma.workerProfile.findMany();
  }

  findOne(id: number) {
    return this.prisma.workerProfile.findUnique({
      where: { id },
    });
  }

  async update(id: number, dto: UpdateWorkerProfileDto) {
    return this.prisma.workerProfile.update({
      where: { id },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.workerProfile.delete({
      where: { id },
    });
  }

  getProfilebyUser(userId: number) {
    return this.prisma.workerProfile.findUnique({
      where: { userId },
    });
  }
}
