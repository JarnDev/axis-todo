import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Auth } from '../auth/auth.entity';
import checkExistence from '../shared/checkExistence';
import checkOwnership from '../shared/checkOwnedship';
import businessRulesValidator from '../shared/validators/businessRules';
import { Task } from '../tasks/task.entity';
import { TaskService } from '../tasks/task.service';
import { DBCreateTodoDto } from './dto/create-todo.dto';
import { PatchTodoDto } from './dto/patch-todo.dto';
import { Todo } from './todo.entity';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private todoRepository: typeof Todo,

    private taskService: TaskService,
  ) {}

  async findAll(userId: number): Promise<Todo[]> {
    return this.todoRepository.findAll<Todo>({
      where: { createdBy: userId },
      include: [
        {
          model: Auth,
          attributes: ['id', 'name', 'login', 'createdAt', 'updatedAt'],
        },
        { model: Task },
      ],
    });
  }

  async create(createTodoDto: DBCreateTodoDto, userId: number): Promise<Todo> {
    businessRulesValidator(createTodoDto.name, createTodoDto.date);
    createTodoDto.createdBy = userId;
    const todo = await this.todoRepository.create(createTodoDto);

    if (createTodoDto.tasks && createTodoDto.tasks.length) {
      createTodoDto.tasks.forEach((task) => {
        task.todoId = todo.id;
        this.taskService.create(task);
      });
    }
    return todo.save();
  }

  async findOne(id: number, userId: number): Promise<Todo> {
    const todo = await this.todoRepository.findByPk<Todo>(id, {
      include: [{ model: Task }],
    });
    checkExistence(todo);
    checkOwnership(todo.getDataValue('createdBy'), userId);
    return todo;
  }

  async patch(
    id: number,
    patchTodoDto: PatchTodoDto,
    userId: number,
  ): Promise<Todo> {
    const todo = await this.todoRepository.findByPk<Todo>(id);

    checkExistence(todo);
    checkOwnership(todo.getDataValue('createdBy'), userId);

    todo.update(patchTodoDto);
    return todo.save();
  }
  async remove(id: number, userId: number): Promise<void> {
    const todo = await this.todoRepository.findByPk<Todo>(id);

    checkExistence(todo);
    checkOwnership(todo.getDataValue('createdBy'), userId);

    return todo.destroy();
  }
}
