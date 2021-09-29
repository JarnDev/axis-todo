import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { User } from '../decorators/user.decorator';
import { JwtUser } from '../interfaces/jwtUser.interface';
import { CreateTaskDto } from './dbo/create-task.dto';
import { GetTaskDto } from './dbo/get-tasks.dto';
import { PatchTaskDto } from './dbo/patch-task.dto';
import { TaskService } from './task.service';

@ApiTags('Task')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  findAll(@User() user: JwtUser): Promise<GetTaskDto[]> {
    return this.taskService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: number, @User() user: JwtUser): Promise<GetTaskDto> {
    return this.taskService.findOne(id, user.userId);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() patchTodoDto: PatchTaskDto,
    @User() user: JwtUser,
  ) {
    return this.taskService.patch(id, patchTodoDto, user.userId);
  }

  @Delete(':id')
  remove(@Param('id') id: number, @User() user: JwtUser) {
    return this.taskService.remove(id, user.userId);
  }
}
