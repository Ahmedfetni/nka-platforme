"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
async function main() {
    await prisma.$connect();
    console.log('connected');
}
main();
//# sourceMappingURL=test-prisma.js.map