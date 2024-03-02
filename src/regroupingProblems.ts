// 1. Generate N random 3-digit equations where sum is less than 1000
// 2. Identify placement of boxes where student will need to identify
//    the right number
// 3. Identify letter decoder based on generated equations and boxes
// 4. Print equations with boxes prefilled
// 5. Print equations with boxes unfilled
type AdditionEquation = {
  addendA: number;
  addendB: number;
  sum: number;
};

export function generateAdditionEquation(numOfDigits: number) {
  let max = Math.pow(10, numOfDigits);
  let sum = Math.floor(Math.random() * max);
  let addendB = Math.floor(Math.random() * sum);


  return {
    addendA: sum - addendB,
    addendB: addendB,
    sum: sum
  };
}

export function convertDigitsToArray(input: number) {
  let ones = input % 10;
  let tens = Math.floor((input % 100) / 10);
  let hundreds = Math.floor(input / 100);

  return [
      hundreds,
      tens,
      ones
  ]
}

export function identifyFillers(equation: AdditionEquation) {
  let carry = [0,0,0];

  // Convert equation to 2d array
  let addendA = convertDigitsToArray(equation.addendA);
  let addendB = convertDigitsToArray(equation.addendB);

  // Is there a carry in the ones digit?
  if (addendA[2] + addendB[2] >= 10) {
    carry[2] = 1;
  }

  if (addendA[1] + addendB[1] >= 10) {
    carry[1] = 1;
  }

  return {
    carryDigits: carry,
    addendA: addendA,
    addendB: addendB,
    sum: convertDigitsToArray(equation.sum)
  }
}

export function printAdditionEquation(equation: AdditionEquation) {
  let firstLine = "  " + equation.addendA;
  let secondLine = "+ " + equation.addendB;
  let thirdLine = " " + equation.sum;

  console.log(firstLine);
  console.log(secondLine);
  console.log("-----");
  console.log(thirdLine);
}