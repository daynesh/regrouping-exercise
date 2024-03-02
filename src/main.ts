import unique = require('../src/uniqueRoutines');
import regrouping = require('../src/regroupingProblems');
import mr = require('../src/messageRegistry');
import ap = require('../src/additionProblems');

const messageToDecode = "you are absolutely amazing"; // TODO: Get this from CLI
let messageRegistry = new mr.MessageRegistry(messageToDecode);
messageRegistry.generateIndices();
messageRegistry.print();

// Now generate problems
let numOfProblems = messageRegistry.getUniqueCount();
let problems = new ap.AdditionProblems(1);
problems.generateProblems();
problems.print();
problems.printWithSolutions();