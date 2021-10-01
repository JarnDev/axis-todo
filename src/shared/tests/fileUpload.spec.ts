import { editFileName, imageFileFilter } from '../fileUpload';

describe('editFileName', () => {
  const mockFile = {
    originalname: 'test.txt',
  };
  const callback = jest.fn();

  it('should edit the file name', () => {
    editFileName({}, mockFile, callback);
    expect(callback).toHaveBeenCalledWith(
      null,
      expect.stringMatching(/test-[a-zA-Z0-9]+.txt/),
    );
  });
});

describe('imageFileFilter', () => {
  const InvalidError = Error('Only image files are allowed!');

  const testCases = [
    ['accept jpg', 'jpg', [null, true]],
    ['accept jpeg', 'jpeg', [null, true]],
    ['accept png', 'png', [null, true]],
    ['accept gif', 'gif', [null, true]],
    ['accept JPG', 'JPG', [null, true]],
    ['accept JPEG', 'JPEG', [null, true]],
    ['accept PNG', 'PNG', [null, true]],
    ['accept GIF', 'GIF', [null, true]],
    ['not accept txt', 'txt', [InvalidError, false]],
    ['not accept py', 'py', [InvalidError, false]],
  ];

  const callback = jest.fn();

  testCases.forEach(([description, extension, expected]) => {
    it(`should ${description}`, () => {
      const mockFile = {
        originalname: `file.${extension}`,
      };
      imageFileFilter({}, mockFile, callback);
      expect(callback).toHaveBeenCalledWith(...expected);
    });
  });
});
