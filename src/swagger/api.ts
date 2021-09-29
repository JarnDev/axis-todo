import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { INestApplication } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { HeartbeatModule } from '../heartbeat/heartbeat.module';
import { TodoModule } from '../todo/todo.module';
import { TasksModule } from '../tasks/tasks.module';

export default (app: INestApplication): void => {
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Axis')
    .setDescription('To be defined!')
    .setVersion('1.0')
    .addTag(
      'Heartbeat',
      'Endpoint responsable for checking if application is alive!',
    )
    .addTag('Login', 'Login here to get you token and enjoy this API')
    .addTag('Register', 'Create your user to be able to Login into de API')
    .addTag('Todo', 'Crud for Todo Resource')
    .addTag('Task', 'Crud for Tasks Resource')
    .build();

  const document = SwaggerModule.createDocument(app, options, {
    include: [HeartbeatModule, AuthModule, TodoModule, TasksModule],
  });

  SwaggerModule.setup('api/docs', app, document);
};
