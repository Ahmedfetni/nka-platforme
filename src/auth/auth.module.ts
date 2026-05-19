import { Module } from '@nestjs/common';
import { JwtModule }  from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';


@Module({
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
