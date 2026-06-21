import { WorkerService } from './worker.service';
import { CreateWorkerProfileDto } from './dto/create-worker.dto';
import { UpdateWorkerProfileDto } from './dto/update-worker.dto';
export declare class WorkerController {
    private readonly workerService;
    constructor(workerService: WorkerService);
    create(createWorkerDto: CreateWorkerProfileDto): Promise<{
        specialty: string;
        experience: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        specialty: string;
        experience: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }[]>;
    findOne(id: string): import(".prisma/client").Prisma.Prisma__WorkerProfileClient<{
        specialty: string;
        experience: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    } | null, null, import("@prisma/client/runtime/library").DefaultArgs>;
    update(id: string, updateWorkerDto: UpdateWorkerProfileDto): Promise<{
        specialty: string;
        experience: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }>;
    remove(id: string): import(".prisma/client").Prisma.Prisma__WorkerProfileClient<{
        specialty: string;
        experience: number;
        createdAt: Date;
        updatedAt: Date;
        id: number;
        userId: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findProfileByUserId(userId: number): void;
}
