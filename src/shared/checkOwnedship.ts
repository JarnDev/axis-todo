import { UnauthorizedException } from '@nestjs/common';

export default function checkOwnership(createdBy: number, userId: number) {
  if (createdBy !== userId) {
    throw new UnauthorizedException(`Resource does not belong to you!`);
  }
}
