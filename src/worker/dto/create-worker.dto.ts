import { IsInt, IsString } from 'class-validator';

export class CreateWorkerProfileDto {
  @IsInt()
  userId!: number;

  @IsString()
  specialty!: string;

  @IsInt()
  experience!: number;
}
