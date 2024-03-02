import ap = require('../src/additionProblems');

describe('testing generation of addition problems', () => {
  test('testing conversion to arrays', () => {
    expect(ap.convertDigitsToArray(123)).toEqual([1,2,3]);
  });
});