import { MessageRegistry } from "./messageRegistry";

type Equation = {
  carry: number[];
  numA: number[];
  numB: number[];
  soln: number[];
}

type PositionInEquation = {
  row: number;
  column: number;
}

// Registry that maps problem numbers to
// position in Equation that indicates the
// digit placement that the student needs to
// solve
//  <problem-number>: [<carry|numA|numB,soln>,<place-value>]
const positionToFillRegistry = [
  {row: 1, column: 2},
  {row: 1, column: 0},
  {row: 2, column: 1},
  {row: 0, column: 0},
  {row: 3, column: 0},
  {row: 0, column: 1},
  {row: 3, column: 1},
  {row: 1, column: 1},
  {row: 2, column: 2},
  {row: 3, column: 2}
]

const numOfDigitsUsed = 3;

export class AdditionProblems {
  readonly numOfProblems: number;
  messageToDecode: MessageRegistry;
  problemsWithSolutions: Equation[];
  letterDecoders: string[][];

  constructor(messageToDecode: MessageRegistry) {
    this.numOfProblems = messageToDecode.getUniqueCharCount();
    this.messageToDecode = messageToDecode;
    this.problemsWithSolutions = new Array<Equation>(this.numOfProblems);
    this.letterDecoders = [];

    // Initialize array of problems
    for (let i = 0; i < this.numOfProblems; i++) {
      this.problemsWithSolutions[i] = {
        carry: [0,0,0],
        numA: [0,0,0],
        numB: [0,0,0],
        soln: [0,0,0]
      }
    }

    // Problems are divided into sections of 10 problems
    let numOfSections = Math.ceil(this.numOfProblems / 10);
    for (let i = 0; i < numOfSections; i++) {
      this.letterDecoders[i] = [];
    }
  }

  generateRandomEquation(): Equation {
    let max = Math.pow(10, numOfDigitsUsed);
    let sum = Math.floor(Math.random() * max);
    let addendB = Math.floor(Math.random() * sum);
    let addendA = sum - addendB;

    let equation = this.defineCarryDigits({
      carry: [0,0,0],
      numA: AdditionProblems.convertDigitsToArray(addendA),
      numB: AdditionProblems.convertDigitsToArray(addendB),
      soln: AdditionProblems.convertDigitsToArray(sum)
    });

    return equation;
  }

  defineCarryDigits(input: Equation) {
    let carryDigits = [0, 0, 0];

    if ((input.numA[2] + input.numB[2]) >= 10) {
      carryDigits[1] = 1;
    }

    if ((input.numA[1] + input.numB[1]) >= 10) {
      carryDigits[0] = 1;
    }

    return {
      carry: carryDigits,
      numA: input.numA,
      numB: input.numB,
      soln: input.soln
    }
  }

  lookupDigitToFill(position: PositionInEquation, equation: Equation): number {
    let digitToFill = 0;

    switch(position.row) {
      case 0: {
        digitToFill = equation.carry[position.column];
        break;
      }
      case 1: {
        digitToFill = equation.numA[position.column];
        break;
      }
      case 2: {
        digitToFill = equation.numB[position.column];
        break;
      }
      case 3: {
        digitToFill = equation.soln[position.column];
        break;
      }
      default: {
        // TODO: Should we return some kind of error here?
        break;
      }
    }

    return digitToFill;
  }

  generateProblems() {
    // Generate random equations
    for (let i = 0; i < this.numOfProblems; i++) {
      let digitToFillAlreadyDefined = false;
      let sectionNumber = Math.floor(i / 10);
      let positionToFill = positionToFillRegistry[i % 10];
      let equation: Equation;
      let digitToFill: number;

      do {
        // Fetch random equation
        equation = this.generateRandomEquation();

        // Identify digit that student needs to populate
        digitToFill = this.lookupDigitToFill(positionToFill, equation);

        // If digitToFill is either a 0 or 1 and positionToFill is not a carry
        // refetch random equation
        if ((digitToFill == 0) || (digitToFill == 1)) {
          if (positionToFill.row != 0) {
            digitToFillAlreadyDefined = true;
            continue;
          }
        }

        // Does digitToFill already exist in our Letter Decoder?
        if (digitToFill in this.letterDecoders[sectionNumber]) {
          digitToFillAlreadyDefined = true;
        }
        else
          digitToFillAlreadyDefined = false;

      } while (digitToFillAlreadyDefined);

      // Identify the corresponding letter in the messageToDecode
      let letterInMessage = this.messageToDecode.getCharFromIndex(i);

      // Add the letter and digitToPopulate to this section's Letter Decoder
      this.letterDecoders[sectionNumber][digitToFill] = letterInMessage;

      // Finally, save equation before moving onto next problem
      this.problemsWithSolutions[i] = equation;
    }
  }

  static convertDigitsToArray(input: number) {
    let ones = input % 10;
    let tens = Math.floor((input % 100) / 10);
    let hundreds = Math.floor(input / 100);

    return [
      hundreds,
      tens,
      ones
    ]
  }

  printWithSolutions() {
    console.log("Generated problems with solutions:");

    let [firstLine, secondLine, thirdLine, fourthLine, fifthLine]: string[] = ['','','','','',''];
    for (let i = 0; i < this.numOfProblems; i++) {
      firstLine  +=      "     " + this.problemsWithSolutions[i].carry + "     ";

      // Add a space at the start when problem numbers are not two digits long
      if (i < 9) {
        secondLine += " ";
      }
      secondLine += i+1 + ")  " + this.problemsWithSolutions[i].numA + "     ";
      thirdLine  += "  +  " + this.problemsWithSolutions[i].numB + "     ";
      fourthLine += "  --------     ";
      fifthLine  += "     " + this.problemsWithSolutions[i].soln + "     ";

      if (((i+1) % 5) == 0) {
        console.log(firstLine);
        console.log(secondLine);
        console.log(thirdLine);
        console.log(fourthLine);
        console.log(fifthLine);
        console.log();

        // Clear lines
        [firstLine, secondLine, thirdLine, fourthLine, fifthLine] = ['','','','','',''];
      }
    }
  }

  print() {

  }
}