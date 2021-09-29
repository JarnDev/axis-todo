import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.dto';

export class LoginDto extends PartialType(
  OmitType(CreateAuthDto, ['name'] as const),
) {}
