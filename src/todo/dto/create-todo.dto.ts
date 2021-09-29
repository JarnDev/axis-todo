import { Task } from '../../tasks/task.entity';

export class CreateTodoDto {
  name: string;
  date: string;
  tasks?: Task[];
}

export class DBCreateTodoDto extends CreateTodoDto {
  picture?: string;
  createdBy?: number;
}
