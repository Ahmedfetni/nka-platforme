import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
export declare class BookingsController {
    private readonly bookingsService;
    constructor(bookingsService: BookingsService);
    create(user: any, createBookingDto: CreateBookingDto): Promise<{
        assignments: {
            id: number;
            status: import(".prisma/client").$Enums.AssignmentStatus;
            bookingId: number;
            workerId: number;
            assignedAt: Date;
        }[];
        customer: {
            user: {
                email: string;
                role: import(".prisma/client").$Enums.Role;
                phone: string | null;
                id: number;
            };
        } & {
            id: number;
            address: string | null;
            userId: number;
            firstName: string;
            lastName: string;
            phoneNumber: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        title: string;
        description: string | null;
        address: string;
        scheduledDate: Date;
        priority: import(".prisma/client").$Enums.Priority;
        requiredWorkers: number;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: number;
    }>;
    findMyBookings(user: any): Promise<({
        assignments: ({
            worker: {
                user: {
                    email: string;
                    phone: string | null;
                    id: number;
                };
            } & {
                id: number;
                userId: number;
                createdAt: Date;
                updatedAt: Date;
                specialty: string;
                experience: number;
            };
        } & {
            id: number;
            status: import(".prisma/client").$Enums.AssignmentStatus;
            bookingId: number;
            workerId: number;
            assignedAt: Date;
        })[];
    } & {
        id: number;
        title: string;
        description: string | null;
        address: string;
        scheduledDate: Date;
        priority: import(".prisma/client").$Enums.Priority;
        requiredWorkers: number;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: number;
    })[]>;
    findAll(): Promise<({
        assignments: ({
            worker: {
                user: {
                    email: string;
                    phone: string | null;
                    id: number;
                };
            } & {
                id: number;
                userId: number;
                createdAt: Date;
                updatedAt: Date;
                specialty: string;
                experience: number;
            };
        } & {
            id: number;
            status: import(".prisma/client").$Enums.AssignmentStatus;
            bookingId: number;
            workerId: number;
            assignedAt: Date;
        })[];
        customer: {
            user: {
                email: string;
                role: import(".prisma/client").$Enums.Role;
                phone: string | null;
                id: number;
            };
        } & {
            id: number;
            address: string | null;
            userId: number;
            firstName: string;
            lastName: string;
            phoneNumber: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        title: string;
        description: string | null;
        address: string;
        scheduledDate: Date;
        priority: import(".prisma/client").$Enums.Priority;
        requiredWorkers: number;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: number;
    })[]>;
    findOne(id: string): Promise<{
        assignments: ({
            worker: {
                user: {
                    email: string;
                    phone: string | null;
                    id: number;
                };
            } & {
                id: number;
                userId: number;
                createdAt: Date;
                updatedAt: Date;
                specialty: string;
                experience: number;
            };
        } & {
            id: number;
            status: import(".prisma/client").$Enums.AssignmentStatus;
            bookingId: number;
            workerId: number;
            assignedAt: Date;
        })[];
        customer: {
            user: {
                email: string;
                role: import(".prisma/client").$Enums.Role;
                phone: string | null;
                id: number;
            };
        } & {
            id: number;
            address: string | null;
            userId: number;
            firstName: string;
            lastName: string;
            phoneNumber: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: number;
        title: string;
        description: string | null;
        address: string;
        scheduledDate: Date;
        priority: import(".prisma/client").$Enums.Priority;
        requiredWorkers: number;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: number;
    }>;
    update(id: string, updateBookingDto: UpdateBookingDto): Promise<{
        id: number;
        title: string;
        description: string | null;
        address: string;
        scheduledDate: Date;
        priority: import(".prisma/client").$Enums.Priority;
        requiredWorkers: number;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: number;
    }>;
    remove(id: string): Promise<{
        id: number;
        title: string;
        description: string | null;
        address: string;
        scheduledDate: Date;
        priority: import(".prisma/client").$Enums.Priority;
        requiredWorkers: number;
        status: import(".prisma/client").$Enums.BookingStatus;
        createdAt: Date;
        updatedAt: Date;
        customerId: number;
    }>;
}
