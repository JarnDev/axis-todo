import { Module } from '@nestjs/common';
import { TodoService } from './todo.service';
import { TodoController } from './todo.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Todo } from './todo.entity';
import { TasksModule } from '../tasks/tasks.module';

@Module({
  imports: [SequelizeModule.forFeature([Todo]), TasksModule],
  controllers: [TodoController],
  providers: [TodoService],
})
export class TodoModule {}
