import { Injectable } from '@nestjs/common';
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'ValidDate', async: true })
@Injectable()
export class ValidDateRule implements ValidatorConstraintInterface {
  validate(value: string) {
    const date = new Date(value);
    const weekDay = date.getDay();
    return weekDay !== 0 && weekDay !== 6;
  }

  defaultMessage() {
    return `Date should not be at weekend`;
  }
}
