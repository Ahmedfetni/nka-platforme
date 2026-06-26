import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CustomerProfile } from '../../customer/entities/customer.entity';
import { Assignment } from '../../assignments/entities/assignments.entity';
import { BookingStatus, Priority } from '../../common/enums';

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  address: string;

  @Column({ type: 'timestamp' })
  scheduledDate: Date;

  @Column({ type: 'enum', enum: Priority, default: Priority.MEDIUM })
  priority: Priority;

  @Column({ type: 'int', default: 1 })
  requiredWorkers: number;

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.PENDING })
  status: BookingStatus;

  @Column()
  customerId: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => CustomerProfile, (c) => c.bookings)
  @JoinColumn({ name: 'customerId' })
  customer: CustomerProfile;

  @OneToMany(() => Assignment, (a) => a.booking)
  assignments: Assignment[];
}
