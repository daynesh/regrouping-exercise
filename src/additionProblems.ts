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

    // Fill any unfilled Letter Decoder tuples
    // First get a list of available characters to fill with
    const possibleCharacters = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 10; i++) {
      let charToExclude = this.letterDecoders[this.letterDecoders.length-1][i];
      if (charToExclude != null) {
        // Remove the excluded character from the array.
        possibleCharacters.replace(charToExclude, '');
      }
    }

    // Now fill unfilled Letter Decode tuples
    for (let i = 0; i < 10; i++) {
      if (this.letterDecoders[this.letterDecoders.length-1][i] == null) {
        this.letterDecoders[this.letterDecoders.length-1][i] = possibleCharacters[i];
      }
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
    let [firstLine, secondLine, thirdLine, fourthLine, fifthLine]: string[] = ['','','','','',''];
    for (let i = 0; i < this.numOfProblems; i++) {
      // Print Letter Decoder
      if ((i == 0) || ((i % 10) == 0)) {
        let sectionNumber = Math.floor(i / 10);
        let [letterDecoderLine1, letterDecoderLine2, letterDecoderLine3] = ["  ", "  ", "  "];
        console.log("Section " + (sectionNumber + 1));
        letterDecoderLine1 += "  0 => " + this.letterDecoders[sectionNumber][0];
        letterDecoderLine2 += "  1 => " + this.letterDecoders[sectionNumber][1];
        letterDecoderLine3 += "  2 => " + this.letterDecoders[sectionNumber][2];
        letterDecoderLine1 += "  3 => " + this.letterDecoders[sectionNumber][3];
        letterDecoderLine2 += "  4 => " + this.letterDecoders[sectionNumber][4];
        letterDecoderLine3 += "  5 => " + this.letterDecoders[sectionNumber][5];
        letterDecoderLine1 += "  6 => " + this.letterDecoders[sectionNumber][6];
        letterDecoderLine2 += "  7 => " + this.letterDecoders[sectionNumber][7];
        letterDecoderLine3 += "  8 => " + this.letterDecoders[sectionNumber][8];
        letterDecoderLine1 += "  9 => " + this.letterDecoders[sectionNumber][9];
        console.log("    Letter Decoder");
        console.log(letterDecoderLine1);
        console.log(letterDecoderLine2);
        console.log(letterDecoderLine3);
        console.log();
        console.log("Problems:");
      }

      // Now construct our problems
      firstLine  +=      "     " + this.problemsWithSolutions[i].carry + "     ";

      // When problem numbers are single digits, add a space at the start
      if (i < 9) {
        secondLine += " ";
      }
      secondLine += i+1 + ")  " + this.problemsWithSolutions[i].numA + "     ";
      thirdLine  += "  +  " + this.problemsWithSolutions[i].numB + "     ";
      fourthLine += "  --------     ";
      fifthLine  += "     " + this.problemsWithSolutions[i].soln + "     ";

      // Now print to stdout
      if (((i+1) % 5) == 0) {
        console.log(firstLine);
        console.log(secondLine);
        console.log(thirdLine);
        console.log(fourthLine);
        console.log(fifthLine);
        console.log();

        // Clear lines so we can start afresh
        [firstLine, secondLine, thirdLine, fourthLine, fifthLine] = ['','','','','',''];
      }
    }
  }

  print() {

  }
}