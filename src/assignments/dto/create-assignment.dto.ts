import { IsInt, IsPositive } from 'class-validator';

export class CreateAssignmentDto {
  @IsInt()
  @IsPositive()
  bookingId: number;

  @IsInt()
  @IsPositive()
  workerId: number;
}
