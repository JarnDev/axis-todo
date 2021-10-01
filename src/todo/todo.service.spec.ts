import { BadRequestException } from '@nestjs/common';
import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Task } from '../tasks/task.entity';
import { TaskService } from '../tasks/task.service';
import { Todo } from './todo.entity';
import { TodoService } from './todo.service';

const testTodo = {
  name: 'Create Todo',
  date: '2021-09-28T16:08:45.257Z',
  createdBy: 1,
  picture: 'default',
  createdAt: new Date(),
  updatedAt: new Date(),
  save: () => testTodo,
};

const testTask = {
  name: 'Task 1',
  todoId: 1,
  status: 'OPEN',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo),
          useValue: {
            findAll: jest.fn(() => [testTodo]),
            create: jest.fn(() => testTodo),
            save: jest.fn(() => testTodo),
          },
        },
        TaskService,
        {
          provide: getModelToken(Task),
          useValue: {
            findAll: jest.fn(() => [testTask]),
            create: jest.fn(() => testTask),
          },
        },
      ],
    }).compile();

    service = module.get<TodoService>(TodoService);
  });

  describe('CREATE', () => {
    it('should not accept name with lenght less than 8', async () => {
      try {
        await service.create(
          {
            name: '1234',
            date: '2021-09-28T16:08:45.257Z',
            picture: 'default',
          },
          1,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Name must have size 8-16');
      }
    });
    it('should not accept name with lenght over 16', async () => {
      try {
        await service.create(
          {
            name: 'TestingInvalidLongName',
            date: '2021-09-28T16:08:45.257Z',
            picture: 'default',
          },
          1,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Name must have size 8-16');
      }
    });
    it('should not accept date to be a saturday', async () => {
      try {
        await service.create(
          {
            name: 'ValueTesting',
            date: '2021-09-25T16:08:45.257Z',
            picture: 'default',
          },
          1,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Date should not be at weekend');
      }
    });
    it('should not accept date to be a sunday', async () => {
      try {
        await service.create(
          {
            name: 'ValueTesting',
            date: '2021-09-26T16:08:45.257Z',
            picture: 'default',
          },
          1,
        );
      } catch (error) {
        expect(error).toBeInstanceOf(BadRequestException);
        expect(error.message).toBe('Date should not be at weekend');
      }
    });

    it('should accept valid name and date', async () => {
      expect(
        await service.create(
          {
            name: 'ValueTesting',
            date: '2021-09-28T16:08:45.257Z',
            picture: 'default',
          },
          1,
        ),
      ).toBe(testTodo);
    });
  });
});
