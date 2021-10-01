import { UnauthorizedException } from '@nestjs/common';
import checkOwnership from '../checkOwnedship';

describe('Check Ownership', () => {
  it('should not throw an UnauthorizedException Error', () => {
    const userId = 1;
    const createdBy = 1;
    expect(checkOwnership(createdBy, userId)).toBeUndefined();
  });

  it('should not throw an UnauthorizedException Error', () => {
    const userId = 1;
    const createdBy = 2;
    try {
      checkOwnership(createdBy, userId);
    } catch (error) {
      expect(error).toBeInstanceOf(UnauthorizedException);
    }
  });
});
