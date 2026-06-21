import { PrismaService } from './../prisma/prisma.service';
import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
export declare class CustomerService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateCustomerProfileDto, userId: number): import(".prisma/client").Prisma.Prisma__CustomerProfileClient<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string | null;
        userId: number;
    }[]>;
    findOne(userId: number): import(".prisma/client").Prisma.Prisma__CustomerProfileClient<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateCustomerProfileDto): Promise<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    remove(id: number): string;
}
