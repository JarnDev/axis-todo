import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import checkExistence from '../shared/checkExistence';
import checkOwnership from '../shared/checkOwnedship';
import { Todo } from '../todo/todo.entity';
import { CreateTaskDto } from './dbo/create-task.dto';
import { PatchTaskDto } from './dbo/patch-task.dto';
import { Task } from './task.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectModel(Task)
    private taskRepository: typeof Task,
  ) {}

  async findAll(userId: number): Promise<Task[]> {
    return this.taskRepository.findAll<Task>({
      include: [
        {
          model: Todo,
          where: { createdBy: userId },
        },
      ],
    });
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = await this.taskRepository.create(createTaskDto);
    return task.save();
  }

  async findOne(id: number, userId: number): Promise<Task> {
    const task = await this.taskRepository.findByPk<Task>(id, {
      include: [
        {
          model: Todo,
          where: { createdBy: userId },
        },
      ],
    });

    checkExistence(task);

    checkOwnership(task.getDataValue('todo').createdBy, userId);

    return task;
  }

  async patch(
    id: number,
    patchTaskDto: PatchTaskDto,
    userId: number,
  ): Promise<Task> {
    const task = await this.taskRepository.findByPk<Task>(id, {
      include: [{ model: Todo, attributes: ['createdBy'] }],
    });

    checkExistence(task);

    checkOwnership(task.getDataValue('todo').createdBy, userId);

    task.update(patchTaskDto);
    return task.save();
  }

  async remove(id: number, userId: number): Promise<void> {
    const task = await this.taskRepository.findByPk<Task>(id, {
      include: [{ model: Todo, attributes: ['createdBy'] }],
    });

    checkExistence(task);

    checkOwnership(task.getDataValue('todo').createdBy, userId);

    return task.destroy();
  }
}
