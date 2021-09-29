import { BadRequestException } from '@nestjs/common';
import { ValidDateRule } from './dateValidator';

export default function businessRulesValidator(name: string, date: string) {
  if (name.length < 8 || name.length > 16) {
    throw new BadRequestException('Name must have size 8-16');
  }
  const dateValidator = new ValidDateRule();
  if (!dateValidator.validate(date)) {
    throw new BadRequestException('Date should not be at weekend');
  }
}
