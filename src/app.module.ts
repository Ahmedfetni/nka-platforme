import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BookingsModule } from './bookings/bookings.module';
import { AssignmentsModule } from './assignments/assignments.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { CustomerModule } from './customer/customer.module';
import { WorkerModule } from './worker/worker.module';
import { AssignmentController } from './assignment/assignment.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    BookingsModule,
    AssignmentsModule,
    PrismaModule,
    AuthModule,
    CustomerModule,
    WorkerModule,
  ],
  controllers: [AppController, AssignmentController],
  providers: [AppService],
})
export class AppModule {}
