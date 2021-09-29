import {
  Table,
  Column,
  Model,
  HasMany,
  BeforeCreate,
} from 'sequelize-typescript';
import * as bcrypt from 'bcryptjs';
import { Todo } from '../todo/todo.entity';

@Table
export class Auth extends Model {
  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false })
  login: string;

  @Column({ allowNull: false })
  password: string;

  @HasMany(() => Todo)
  todos: Todo[];

  @BeforeCreate
  static hashPassword(instance: Auth) {
    instance.password = bcrypt.hashSync(instance.password, 12);
  }
}
