import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { Todo } from '../todo/todo.entity';
import { TaskStatus } from './dbo/create-task.dto';

@Table
export class Task extends Model {
  @Column({ allowNull: false })
  name: string;

  @Column({
    type: DataType.ENUM('OPEN', 'IN_PROGRESS', 'DONE'),
    defaultValue: 'OPEN',
    allowNull: false,
  })
  status: TaskStatus;

  @ForeignKey(() => Todo)
  @Column
  todoId: number;

  @BelongsTo(() => Todo)
  todo: Todo;
}
