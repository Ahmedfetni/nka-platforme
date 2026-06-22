import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CustomerProfile } from '../../customer/entities/customer.entity';
import { WorkerProfile } from '../../worker/entities/worker.entity';

export enum Role {
  ADMIN = 'ADMIN',
  CLIENT = 'CLIENT',
  WORKER = 'WORKER',
}

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ unique: true })
  email: string;
  
  @Column()
  password: string;  
  
  @Column({ type: 'enum', enum: Role })
  role: Role;
  
  @Column({ nullable: true })
  phone: string;

  @OneToOne(() => CustomerProfile, (c) => c.user)
  customerProfile: CustomerProfile;

  @OneToOne(() => WorkerProfile, (w) => w.user)
  workerProfile: WorkerProfile;
  
}
