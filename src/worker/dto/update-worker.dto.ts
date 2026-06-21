import { IsInt, IsOptional, IsString } from 'class-validator';

export class UpdateWorkerProfileDto {
  @IsOptional()
  @IsString()
  specialty?: string;

  @IsOptional()
  @IsInt()
  experience?: number;
}
