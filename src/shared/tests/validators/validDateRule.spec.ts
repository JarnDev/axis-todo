import { ValidDateRule } from '../../validators/dateValidator';

describe('ValidDateRule', () => {
  const testCases = [
    ['Should not Accept Sunday', '2021-09-26T16:08:45.257Z', false],
    ['Should not Accept Saturday', '2021-09-25T16:08:45.257Z', false],
    ['Should Accept Monday', '2021-09-27T16:08:45.257Z', true],
    ['Should Accept Tuesday', '2021-09-28T16:08:45.257Z', true],
    ['Should Accept Wednesday', '2021-09-29T16:08:45.257Z', true],
    ['Should Accept Thursday', '2021-09-30T16:08:45.257Z', true],
    ['Should Accept Friday', '2021-10-01T16:08:45.257Z', true],
  ];

  const validator = new ValidDateRule();
  testCases.forEach(([description, date, expected]) => {
    it(`${description}`, () => {
      expect(validator.validate(date as string)).toBe(expected);
    });
  });

  it('Should have a default Message', () => {
    expect(validator.defaultMessage()).toBe(`Date should not be at weekend`);
  });
});
