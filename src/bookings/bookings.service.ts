import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { Role } from '../common/enums';
import { Booking } from './entities/bookings.entity';
import { User } from '../users/entities/user.entity';
import { CustomerProfile } from '../customer/entities/customer.entity';

const BOOKING_RELATIONS = {
  customer: {
    user: true,
  },
  assignments: {
    worker: {
      user: true,
    },
  },
};

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private readonly bookingRepository: Repository<Booking>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(CustomerProfile)
    private readonly customerRepository: Repository<CustomerProfile>,
  ) {}

  // Remove password fields from any loaded user relations, mirroring the
  // Prisma `select` that only exposed id/email/role/phone.
  private sanitize<T>(booking: T): T {
    if (!booking) return booking;
    const b = booking as any;
    if (b.customer?.user) delete b.customer.user.password;
    if (Array.isArray(b.assignments)) {
      for (const a of b.assignments) {
        if (a.worker?.user) delete a.worker.user.password;
      }
    }
    return booking;
  }

  async create(userId: number, createBookingDto: CreateBookingDto) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: { customerProfile: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (user.role !== (Role.CLIENT as unknown as typeof user.role)) {
      throw new ForbiddenException('cant create a  bookings');
    }

    if (!user.customerProfile) {
      throw new BadRequestException('You must create a customer profile first');
    }

    const booking = this.bookingRepository.create({
      title: createBookingDto.title,
      description: createBookingDto.description,
      address: createBookingDto.address,
      scheduledDate: new Date(createBookingDto.scheduledDate),
      priority: createBookingDto.priority,
      requiredWorkers: createBookingDto.requiredWorkers,
      customerId: user.customerProfile.id,
    });

    const saved = await this.bookingRepository.save(booking);
    return this.findOne(saved.id);
  }

  async findMyBookings(userId: number) {
    const customerProfile = await this.customerRepository.findOne({
      where: { userId },
    });

    if (!customerProfile) {
      throw new BadRequestException('Customer profile not found');
    }

    const bookings = await this.bookingRepository.find({
      where: { customerId: customerProfile.id },
      order: { createdAt: 'DESC' },
      relations: {
        assignments: {
          worker: {
            user: true,
          },
        },
      },
    });

    return bookings.map((b) => this.sanitize(b));
  }

  async findAll() {
    const bookings = await this.bookingRepository.find({
      order: { createdAt: 'DESC' },
      relations: BOOKING_RELATIONS,
    });

    return bookings.map((b) => this.sanitize(b));
  }

  async findOne(id: number) {
    const booking = await this.bookingRepository.findOne({
      where: { id },
      relations: BOOKING_RELATIONS,
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return this.sanitize(booking);
  }

  async update(id: number, updateBookingDto: UpdateBookingDto) {
    await this.findOne(id);

    const payload = updateBookingDto as any;
    const { scheduledDate, ...rest } = payload;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    await this.bookingRepository.update(id, {
      ...rest,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      ...(scheduledDate ? { scheduledDate: new Date(scheduledDate) } : {}),
    });

    return this.findOne(id);
  }

  async remove(id: number) {
    const booking = await this.findOne(id);
    await this.bookingRepository.delete(id);
    return booking;
  }
}
