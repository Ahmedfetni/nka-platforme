import { Strategy } from './../../../node_modules/effect/dist/dts/Queue.d';
import { Injectable, UanthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import { ExtractJwt, Strategy, Strategy } from 'passport-jwt';

import { PrismaService } from '../../prisma/prisma.service';


//TODO explain the classes hiarachy in nestjs 
@Injectable()
export class JwtStrategy extands PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrkey: process
        })
    }
}