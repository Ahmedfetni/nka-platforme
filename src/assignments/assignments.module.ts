import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssignmentsController } from './assignments.controller';
import { AssignmentsService } from './assignments.service';
import { Assignment } from './entities/assignments.entity';
import { Booking } from '../bookings/entities/bookings.entity';
import { WorkerProfile } from '../worker/entities/worker.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Assignment, Booking, WorkerProfile])],
  controllers: [AssignmentsController],
  providers: [AssignmentsService],
})
export class AssignmentsModule {}
