import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Booking } from '../../bookings/entities/bookings.entity';
import { WorkerProfile } from '../../worker/entities/worker.entity';
import { AssignmentStatus } from '../../common/enums';

@Entity('assignments')
export class Assignment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: AssignmentStatus,
    default: AssignmentStatus.PENDING,
  })
  status: AssignmentStatus;

  @Column()
  bookingId: number;

  @Column()
  workerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => Booking, (b) => b.assignments)
  @JoinColumn({ name: 'bookingId' })
  booking: Booking;

  @ManyToOne(() => WorkerProfile, (w) => w.assignments)
  @JoinColumn({ name: 'workerId' })
  worker: WorkerProfile;
}
