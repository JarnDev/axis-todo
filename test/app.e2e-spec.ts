import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { postgresConstants } from '../src/constants';
import { SequelizeModule } from '@nestjs/sequelize';
import { Auth } from '../src/auth/auth.entity';
import { Todo } from '../src/todo/todo.entity';
import { Task } from '../src/tasks/task.entity';
import { TodoModule } from '../src/todo/todo.module';
import { AuthModule } from '../src/auth/auth.module';
import { TasksModule } from '../src/tasks/tasks.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        AppModule,
        SequelizeModule.forRoot({
          dialect: 'postgres',
          host: postgresConstants.host,
          port: parseInt(
            postgresConstants.test_port,

            10,
          ),
          username: postgresConstants.user,
          password: postgresConstants.password,
          database: postgresConstants.database,
          models: [Auth, Todo, Task],
          synchronize: true,
          autoLoadModels: true,
        }),
        TodoModule,
        AuthModule,
        TasksModule,
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/heartbeat (GET) - Teste Heartbeat', () => {
    return request(app.getHttpServer())
      .get('/heartbeat')
      .expect(200)
      .expect('I`m working!');
  });

  it('/api/auth (POST) - Create new User - teste2', () => {
    return request(app.getHttpServer())
      .post('/auth')
      .send({
        name: 'teste2',
        login: 'teste2',
        password: '1234',
      })
      .expect(200);
  });

  it('/api/auth/login (POST) - Login with teste2', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        login: 'teste2',
        password: '1234',
      })
      .expect(200)
      .expect((res) => {
        token = res.body.token;
        expect(res.body.token).toBeDefined();
      });
  });

  it('/api/todos/{id} (GET) - should not fetch not owned todo', () => {
    return request(app.getHttpServer())
      .get('/todos/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(401);
  });

  it('/api/auth/login (POST) - Login with teste', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        login: 'teste',
        password: '1234',
      })
      .expect(200)
      .expect((res) => {
        token = res.body.token;
        expect(res.body.token).toBeDefined();
      });
  });

  it('/api/todos/{id} (GET) - should fetch owned todo', () => {
    return request(app.getHttpServer())
      .get('/todos/1')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);
  });
});
