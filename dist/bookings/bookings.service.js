"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, createBookingDto) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                customerProfile: true,
            },
        });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        if (user.role !== client_1.Role.CLIENT) {
            throw new common_1.ForbiddenException('Only clients can create bookings');
        }
        if (!user.customerProfile) {
            throw new common_1.BadRequestException('You must create a customer profile first');
        }
        return this.prisma.booking.create({
            data: {
                title: createBookingDto.title,
                description: createBookingDto.description,
                address: createBookingDto.address,
                scheduledDate: new Date(createBookingDto.scheduledDate),
                priority: createBookingDto.priority,
                requiredWorkers: createBookingDto.requiredWorkers,
                customerId: user.customerProfile.id,
            },
            include: {
                customer: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                role: true,
                                phone: true,
                            },
                        },
                    },
                },
                assignments: true,
            },
        });
    }
    async findMyBookings(userId) {
        const customerProfile = await this.prisma.customerProfile.findUnique({
            where: { userId },
        });
        if (!customerProfile) {
            throw new common_1.BadRequestException('Customer profile not found');
        }
        return this.prisma.booking.findMany({
            where: {
                customerId: customerProfile.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                assignments: {
                    include: {
                        worker: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        email: true,
                                        phone: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }
    async findAll() {
        return this.prisma.booking.findMany({
            orderBy: {
                createdAt: 'desc',
            },
            include: {
                customer: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                role: true,
                                phone: true,
                            },
                        },
                    },
                },
                assignments: {
                    include: {
                        worker: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        email: true,
                                        phone: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
    }
    async findOne(id) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                customer: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                email: true,
                                role: true,
                                phone: true,
                            },
                        },
                    },
                },
                assignments: {
                    include: {
                        worker: {
                            include: {
                                user: {
                                    select: {
                                        id: true,
                                        email: true,
                                        phone: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });
        if (!booking) {
            throw new common_1.NotFoundException('Booking not found');
        }
        return booking;
    }
    async update(id, updateBookingDto) {
        await this.findOne(id);
        return this.prisma.booking.update({
            where: { id },
            data: {
                ...updateBookingDto,
                scheduledDate: updateBookingDto.scheduledDate
                    ? new Date(updateBookingDto.scheduledDate)
                    : undefined,
            },
        });
    }
    async remove(id) {
        await this.findOne(id);
        return this.prisma.booking.delete({
            where: { id },
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map