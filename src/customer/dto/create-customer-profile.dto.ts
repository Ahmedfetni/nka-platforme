import { IsString, IsOptional } from 'class-validator';

export class CreateCustomerProfileDto {
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsString()
  phoneNumber!: string;

  @IsOptional()
  @IsString()
  address?: string;
}
