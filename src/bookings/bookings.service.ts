import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Role } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: number, createBookingDto: CreateBookingDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        customerProfile: true,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== Role.CLIENT) {
      throw new ForbiddenException('Only clients can create bookings');
    }

    if (!user.customerProfile) {
      throw new BadRequestException('You must create a customer profile first');
    }

    return this.prisma.booking.create({
      data: {
        title: createBookingDto.title,
        description: createBookingDto.description,
        address: createBookingDto.address,
        scheduledDate: new Date(createBookingDto.scheduledDate),
        priority: createBookingDto.priority,
        requiredWorkers: createBookingDto.requiredWorkers,
        customerId: user.customerProfile.id,
      },
      include: {
        customer: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                role: true,
                phone: true,
              },
            },
          },
        },
        assignments: true,
      },
    });
  }

  async findMyBookings(userId: number) {
    const customerProfile = await this.prisma.customerProfile.findUnique({
      where: { userId },
    });

    if (!customerProfile) {
      throw new BadRequestException('Customer profile not found');
    }

    return this.prisma.booking.findMany({
      where: {
        customerId: customerProfile.id,
      },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        assignments: {
          include: {
            worker: {
              include: {
                user: {
                  select: {
                    id: true,
                    email: true,
                    phone: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.booking.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        customer: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                role: true,
                phone: true,
              },
            },
          },
        },
        assignments: {
          include: {
            worker: {
              include: {
                user: {
                  select: {
                    id: true,
                    email: true,
                    phone: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }

  async findOne(id: number) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: {
        customer: {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                role: true,
                phone: true,
              },
            },
          },
        },
        assignments: {
          include: {
            worker: {
              include: {
                user: {
                  select: {
                    id: true,
                    email: true,
                    phone: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return booking;
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    await this.findOne(id);

    return this.prisma.booking.update({
      where: { id },
      data: {
        ...updateBookingDto,
        scheduledDate: updateBookingDto.scheduledDate
          ? new Date(updateBookingDto.scheduledDate)
          : undefined,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);

    return this.prisma.booking.delete({
      where: { id },
    });
  }
}
