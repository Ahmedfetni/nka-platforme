import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAllUsers(): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }[]>;
    createUser(dto: CreateUserDto): Promise<{
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: number;
    }>;
    findUsinEmail(email: string): Promise<{
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        phone: string | null;
        id: number;
    } | null>;
}
