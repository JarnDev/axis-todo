import { NotFoundException } from '@nestjs/common';

export default function checkExistence(resource) {
  if (!resource) {
    throw new NotFoundException();
  }
}
