import { Auth } from '../../auth/auth.entity';
import { Task } from '../../tasks/task.entity';

export class GetTodoDto {
  name: string;
  date: Date;
  picture: string;
  createdBy: number;
  tasks?: Task[];
  auth?: Auth;
}
