import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { Task } from '../tasks/task.entity';
import { Auth } from '../auth/auth.entity';

@Table
export class Todo extends Model {
  @Column({ allowNull: false })
  name: string;

  @Column({ type: DataType.DATE, allowNull: false })
  date: Date;

  @Column({ allowNull: false })
  picture: string;

  @ForeignKey(() => Auth)
  @Column({ allowNull: false })
  createdBy: number;

  @BelongsTo(() => Auth)
  auth: Auth;

  @HasMany(() => Task)
  tasks: Task[];
}
