import { Priority } from '@prisma/client';
export declare class CreateBookingDto {
    title: string;
    description?: string;
    address: string;
    scheduledDate: string;
    priority?: Priority;
    requiredWorkers?: number;
}
