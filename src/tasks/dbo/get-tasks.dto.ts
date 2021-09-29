import { TaskStatus } from './create-task.dto';

export class GetTaskDto {
  name: string;
  status: TaskStatus;
}
