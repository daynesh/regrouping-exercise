export function findUnique(str: string) {
  // The variable that contains the unique values
  let uniq = "";

  for (let i = 0; i < str.length; i++) {
    // strip whitespace
    if (str[i] == ' ')
      continue;

    // Checking if the uniq contains the character
    if (!uniq.includes(str[i])) {
      // If the character not present in uniq
      // Concatenate the character with uniq
      uniq += str[i]
    }
  }
  return uniq;
}

function findUniqueCount(str: string) {
  return findUnique(str).length
}

function findIndices(str: string) {
  let uniqIndices = "";
  let uniqCharacters = "";
  let lastIndexAdded = 0;
  let exampleStrWithCommas = "";

  //console.debug("String to process: " + str);

  for (let i = 0; i < str.length; i++) {
    //console.debug("Char: " + str[i]);

    // Account for whitespace
    if (str[i] == ' ') {
      //console.debug("Found a space, adding a space to index");
      uniqIndices += ' ';
      exampleStrWithCommas += ' ';
      continue;
    }

    // Checking if the uniq contains the character
    if (!uniqCharacters.includes(str[i])) {
      // If the character not present in uniq
      // Concatenate the character with uniq
      uniqCharacters += str[i];

      lastIndexAdded++;
      //console.debug("Adding a new index of: " + String(lastIndexAdded));
      uniqIndices += String(lastIndexAdded) + ',';
    } else {

      //console.debug("Reusing existing index of: " + String(str.indexOf(str[i])+1));
      let indexOfChar = str.indexOf(str[i]);

      uniqIndices += String(indexOfChar) + ',';
    }

    exampleStrWithCommas += str[i] + ',';
  }

  console.debug(exampleStrWithCommas);

  return uniqIndices;
}

let messageToDecode = "you are absolutely amazing";
console.log(findUniqueCount(messageToDecode));
console.log(findUnique("you are absolutely amazing"));

console.log("Finding indices for: " + messageToDecode);
console.log(findIndices(messageToDecode));

console.log("Hello, world!");