import { Auth } from '../../auth/auth.entity';
import { Task } from '../../tasks/task.entity';
import { IsNumber, IsString } from 'class-validator';
export enum TaskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}

export class CreateTaskDto {
  @IsString()
  name: string;
  @IsString()
  status: TaskStatus;
  @IsNumber()
  todoId: number;
}

export class DBCreateTaskDto extends CreateTaskDto {
  createdBy?: number;
  tasks?: Task[];
}
