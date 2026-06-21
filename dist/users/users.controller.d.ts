import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
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
}
