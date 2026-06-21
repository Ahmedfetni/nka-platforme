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
exports.CustomerService = void 0;
const prisma_service_1 = require("./../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
let CustomerService = class CustomerService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    create(dto, userId) {
        return this.prisma.customerProfile.create({
            data: {
                userId: userId,
                firstName: dto.firstName,
                lastName: dto.lastName,
                phoneNumber: dto.phoneNumber,
                address: dto.address,
            },
        });
    }
    findAll() {
        return this.prisma.customerProfile.findMany({
            select: {
                userId: true,
                firstName: true,
                lastName: true,
                phoneNumber: true,
                address: true,
            },
        });
    }
    findOne(userId) {
        return this.prisma.customerProfile.findUnique({
            where: {
                userId,
            },
        });
    }
    async update(id, dto) {
        const profile = await this.prisma.customerProfile.findUnique({
            where: { id },
        });
        if (!profile) {
            throw new common_2.NotFoundException('that profile is not found');
        }
        return this.prisma.customerProfile.update({
            where: { id },
            data: dto,
        });
    }
    remove(id) {
        return `This action removes a #${id} customer`;
    }
};
exports.CustomerService = CustomerService;
exports.CustomerService = CustomerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomerService);
//# sourceMappingURL=customer.service.js.map