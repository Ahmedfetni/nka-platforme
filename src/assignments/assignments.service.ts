import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Assignment } from './entities/assignments.entity';
import { Booking } from '../bookings/entities/bookings.entity';
import { WorkerProfile } from '../worker/entities/worker.entity';
import { AssignmentStatus, BookingStatus } from '../common/enums';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(
    @InjectRepository(Assignment)
    private readonly assignmentRepo: Repository<Assignment>,
    @InjectRepository(Booking)
    private readonly bookingRepo: Repository<Booking>,
    @InjectRepository(WorkerProfile)
    private readonly workerRepo: Repository<WorkerProfile>,
  ) {}

  async create(dto: CreateAssignmentDto) {
    const booking = await this.bookingRepo.findOne({
      where: { id: dto.bookingId },
    });
    if (!booking) throw new NotFoundException('Booking not found');
    if (booking.status === BookingStatus.CANCELLED)
      throw new BadRequestException('Cannot assign to a cancelled booking');

    const worker = await this.workerRepo.findOne({
      where: { id: dto.workerId },
    });
    if (!worker) throw new NotFoundException('Worker not found');

    const duplicate = await this.assignmentRepo.findOne({
      where: { bookingId: dto.bookingId, workerId: dto.workerId },
    });
    if (duplicate)
      throw new BadRequestException('Worker already assigned to this booking');

    const assignment = this.assignmentRepo.create(dto);
    return this.assignmentRepo.save(assignment);
  }

  async updateStatus(id: number, status: AssignmentStatus, userId: number) {
    const assignment = await this.assignmentRepo.findOne({
      where: { id },
      relations: { worker: true },
    });
    if (!assignment) throw new NotFoundException('Assignment not found');
    if (assignment.worker.userId !== userId)
      throw new ForbiddenException('You can only update your own assignments');

    assignment.status = status;
    return this.assignmentRepo.save(assignment);
  }

  findByWorker(workerId: number) {
    return this.assignmentRepo.find({
      where: { workerId },
      relations: { booking: true },
    });
  }

  findByBooking(bookingId: number) {
    return this.assignmentRepo.find({
      where: { bookingId },
      relations: { worker: { user: true } },
    });
  }
}
