import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';
import { HeartbeatModule } from './heartbeat/heartbeat.module';
import { env, postgresConstants } from './constants';
import { Todo } from './todo/todo.entity';
import { Auth } from './auth/auth.entity';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/task.entity';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';

@Module({
  imports: [
    MulterModule.register({
      dest: '../_upload',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '_upload'),
      serveRoot: '/images',
      serveStaticOptions: {
        dotfiles: 'deny',
        index: false,
        redirect: false,
        extensions: ['jpg'],
      },
    }),
    HeartbeatModule,
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: postgresConstants.host,
      port: parseInt(postgresConstants.port, 10),
      username: postgresConstants.user,
      password: postgresConstants.password,
      database: postgresConstants.database,
      models: [Auth, Todo, Task],
    }),
    TodoModule,
    AuthModule,
    TasksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
