type Equation = {
  numA: number[];
  numB: number[];
  soln: number[];
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

export class AdditionProblems {
  readonly numOfProblems: number;
  generatedProblems: Equation[];

  constructor(numOfProblems: number) {
    this.numOfProblems = numOfProblems;
    this.generatedProblems = new Array<Equation>(numOfProblems);
    for (let i = 0; i < numOfProblems; i++) {
      this.generatedProblems[numOfProblems] = {
        numA: [0,0,0],
        numB: [0,0,0],
        soln: [0,0,0]
      }
    }
  }

  generateProblems() {
    for (let i = 0; i < this.numOfProblems; i++) {
      let max = Math.pow(10, 3);
      let sum = Math.floor(Math.random() * max);
      let addendB = Math.floor(Math.random() * sum);
      let addendA = sum - addendB;

      this.generatedProblems[i] = {
        numA: convertDigitsToArray(addendA),
        numB: convertDigitsToArray(addendB),
        soln: convertDigitsToArray(sum)
      }
    }
  }



  printWithSolutions() {
    console.log("Generated problems with solutions:");

    for (let i = 0; i < this.numOfProblems; i++) {
     console.log(i+1 + ")   " + this.generatedProblems[i].numA[0] + "," +
                         this.generatedProblems[i].numA[1]+ "," +
                         this.generatedProblems[i].numA[2]);
     console.log("  +  " + this.generatedProblems[i].numB[0] + "," +
                         this.generatedProblems[i].numB[1]+ "," +
                         this.generatedProblems[i].numB[2]);
     console.log("   -------");
     console.log("     " + this.generatedProblems[i].soln[0] + "," +
                         this.generatedProblems[i].soln[1]+ "," +
                         this.generatedProblems[i].soln[2]);
    }
  }

  print() {

  }
}