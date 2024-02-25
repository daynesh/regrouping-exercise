import { findUnique } from '../src/main';

describe('testing findUnique func', () => {
  test('testing unique characters without whitespace', () => {
    expect(findUnique("you are absolutely amazing")).toBe("youarebsltmzing");
  });
});