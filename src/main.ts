import { MessageRegistry } from '../src/messageRegistry';
import ap = require('../src/additionProblems');

const messageToDecode = "you are absolutely amazing"; // TODO: Get this from CLI
let messageEncoder = new MessageRegistry(messageToDecode);
messageEncoder.print();

// Now generate problems
let numOfProblems = messageEncoder.getUniqueCharCount();
let problems = new ap.AdditionProblems(messageEncoder);
problems.generateProblems();
problems.print();
problems.printWithSolutions();