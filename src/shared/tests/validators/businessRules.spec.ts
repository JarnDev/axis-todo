import { BadRequestException } from '@nestjs/common';
import businessRulesValidator from '../../validators/businessRules';

describe('businessRulesValidator', () => {
  const lessThan8 = '1234';
  const overThan16 = '123457897852145678756123';
  const saturdayDate = '2021-09-25T16:08:45.257Z';
  const sundayDate = '2021-09-26T16:08:45.257Z';
  const validDate = '2021-09-28T16:08:45.257Z';
  const validName = 'validName';

  it('Should not accept name with length less than 8', () => {
    try {
      businessRulesValidator(lessThan8, validDate);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Name must have size 8-16');
    }
  });
  it('Should not accept name with length over than 16', () => {
    try {
      businessRulesValidator(overThan16, validDate);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Name must have size 8-16');
    }
  });
  it('Should not accept date on saturday', () => {
    try {
      businessRulesValidator(validName, saturdayDate);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Date should not be at weekend');
    }
  });

  it('Should not accept date on sunday', () => {
    try {
      businessRulesValidator(validName, sundayDate);
    } catch (error) {
      expect(error).toBeInstanceOf(BadRequestException);
      expect(error.message).toBe('Date should not be at weekend');
    }
  });
  it('Should accept valid date and name', () => {
    expect(businessRulesValidator(validName, validDate)).toBeUndefined();
  });
});
