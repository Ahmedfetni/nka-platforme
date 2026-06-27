import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { JwtGuard } from '../auth/guards/jwt.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { AssignmentStatus } from '../common/enums';

@UseGuards(JwtGuard)
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  create(@Body() dto: CreateAssignmentDto) {
    return this.assignmentsService.create(dto);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status') status: AssignmentStatus,
    @CurrentUser() user: { sub: number },
  ) {
    return this.assignmentsService.updateStatus(id, status, user.sub);
  }

  @Get('booking/:bookingId')
  findByBooking(@Param('bookingId', ParseIntPipe) bookingId: number) {
    return this.assignmentsService.findByBooking(bookingId);
  }

  @Get('my')
  findMine(@CurrentUser() user: { sub: number }) {
    return this.assignmentsService.findByWorker(user.sub);
  }
}
