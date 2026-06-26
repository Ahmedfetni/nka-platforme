import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Assignment } from '../../assignments/entities/assignments.entity';

@Entity('worker_profiles')
export class WorkerProfile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  specialty: string;

  @Column({ type: 'int' })
  experience: number;

  @Column()
  userId: number;

  @OneToOne(() => User, (u) => u.workerProfile)
  @JoinColumn()
  user: User;

  @OneToMany(() => Assignment, (a) => a.worker)
  assignments: Assignment[];
}
