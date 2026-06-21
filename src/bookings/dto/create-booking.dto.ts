import {
  IsDateString,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';
import { Priority } from '@prisma/client';

export class CreateBookingDto {
  @IsString()
  @IsNotEmpty()
  title!: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsNotEmpty()
  address!: string;

  @IsDateString()
  scheduledDate!: string;

  @IsEnum(Priority)
  @IsOptional()
  priority?: Priority;

  @IsInt()
  @Min(1)
  @IsOptional()
  requiredWorkers?: number;
}
