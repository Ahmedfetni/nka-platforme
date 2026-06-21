import { CreateWorkerProfileDto } from './dto/create-worker.dto';
import { UpdateWorkerProfileDto } from './dto/update-worker.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class WorkerService {
    private prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateWorkerProfileDto): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        specialty: string;
        experience: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        specialty: string;
        experience: number;
    }[]>;
    findOne(id: number): import(".prisma/client").Prisma.Prisma__WorkerProfileClient<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        specialty: string;
        experience: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: number, dto: UpdateWorkerProfileDto): Promise<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        specialty: string;
        experience: number;
    }>;
    remove(id: number): import(".prisma/client").Prisma.Prisma__WorkerProfileClient<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        specialty: string;
        experience: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getProfilebyUser(userId: number): import(".prisma/client").Prisma.Prisma__WorkerProfileClient<{
        id: number;
        userId: number;
        createdAt: Date;
        updatedAt: Date;
        specialty: string;
        experience: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
