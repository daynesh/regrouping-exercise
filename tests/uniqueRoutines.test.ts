import unique = require('../src/uniqueRoutines');

describe('testing findUniqueChars', () => {
  test('testing unique characters without whitespace', () => {
    expect(unique.findUniqueChars("you are absolutely amazing")).toBe("youarebsltmzing");
  });

  test('testing finding the count of unique characters', () => {
    expect(unique.findUniqueCharCount("you are absolutely amazing")).toBe(15);
  });
});

describe('testing generateUniqueCharIndices', () => {
  test('testing generation of unique char indices with no spaces', () => {
    expect(unique.generateUniqueCharIndices("you")).toBe("1,2,3");
  });

  test('testing generation of unique char indices with 1 space', () => {
    expect(unique.generateUniqueCharIndices("you are")).toBe("1,2,3 4,5,6");
  });

  test('testing generation of unique char indices', () => {
    expect(unique.generateUniqueCharIndices("you are absolutely amazing")).toBe("1,2,3 4,5,6 4,7,8,2,9,3,10,6,9,1 4,11,4,12,13,14,15");
  });
});
