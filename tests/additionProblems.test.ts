import { AdditionProblems } from '../src/additionProblems';
import { MessageRegistry } from '../src/messageRegistry';

describe('testing generation of addition problems', () => {
  test('testing conversion to arrays', () => {
    expect(AdditionProblems.convertDigitsToArray(123)).toEqual([1,2,3]);
  });

  test('testing generateRandomEquation results in a correct addition equation', () => {
    let messageEncoder = new MessageRegistry("you are absolutely amazing");
    let problemSet = new AdditionProblems(messageEncoder);

    function convertArrayToDigits(array: number[]): number {
      return (array[0] * 100) + (array[1] * 10) + array[2];
    }

    let randomEquation = problemSet.generateRandomEquation();
    let numA = convertArrayToDigits(randomEquation.numA);
    let numB = convertArrayToDigits(randomEquation.numB);
    let soln = convertArrayToDigits(randomEquation.soln);
    expect(numA + numB).toBe(soln);
  });

  test('testing carry digits are generated correctly', () => {
    let messageEncoder = new MessageRegistry("you are absolutely amazing");
    let problemSet = new AdditionProblems(messageEncoder);

    let randomEquation = problemSet.generateRandomEquation();

    if (randomEquation.numA[2] + randomEquation.numB[2] >= 10)
      expect(randomEquation.carry[1]).toBe(1);
    else
      expect(randomEquation.carry[1]).toBe(0);

    if (randomEquation.numA[1] + randomEquation.numB[1] >= 10)
      expect(randomEquation.carry[0]).toBe(1);
    else
      expect(randomEquation.carry[0]).toBe(0);
  });

  test('testing generation of 1 random equation', () => {
    let messageEncoder = new MessageRegistry("y");
    let problemSet = new AdditionProblems(messageEncoder);
    let spy = jest.spyOn(problemSet, 'generateRandomEquation').mockImplementation(() => {
      return {
        carry: [0,1,0],
        numA: [1,3,4],
        numB: [4,2,6],
        soln: [5,6,0]
      };
    });

    // Generate problems
    problemSet.generateProblems();

    // Now test mocked results for random generator
    let equation = problemSet.problemsWithSolutions[0];
    expect(equation.numA).toEqual([1,3,4]);

    // Test letter decoder
    expect(problemSet.letterDecoders[0][4]).toBe('y');

    // Test problemsWithSolutions array
    expect(problemSet.problemsWithSolutions[0]).toEqual({
      carry: [0,1,0],
      numA: [1,3,4],
      numB: [4,2,6],
      soln: [5,6,0]
    });
  });
});