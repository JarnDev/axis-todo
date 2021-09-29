import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateTodoDto } from './create-todo.dto';

export class PatchTodoDto extends PartialType(
  OmitType(CreateTodoDto, ['tasks']),
) {}
