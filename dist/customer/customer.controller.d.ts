import { CreateCustomerProfileDto } from './dto/create-customer-profile.dto';
import { UpdateCustomerProfileDto } from './dto/update-customer-profile.dto';
import { CustomerService } from './customer.service';
export declare class CustomerController {
    private readonly customerService;
    constructor(customerService: CustomerService);
    create(createCustomerDto: CreateCustomerProfileDto, user: any): import(".prisma/client").Prisma.Prisma__CustomerProfileClient<{
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
    findOne(id: string): import(".prisma/client").Prisma.Prisma__CustomerProfileClient<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateCustomerDto: UpdateCustomerProfileDto): Promise<{
        firstName: string;
        lastName: string;
        phoneNumber: string;
        address: string | null;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    remove(id: string): string;
}
