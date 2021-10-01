import { NotFoundException } from '@nestjs/common';
import checkExistence from '../checkExistence';

describe('checkExistence', () => {
  it('should return true if the resource exists', () => {
    expect(checkExistence({})).toBeUndefined();
  });

  it('should return false if the resource does not exist', async () => {
    try {
      checkExistence(undefined);
    } catch (error) {
      expect(error).toBeInstanceOf(NotFoundException);
    }
  });
});
