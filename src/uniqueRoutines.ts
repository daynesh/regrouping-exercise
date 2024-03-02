export function findUniqueChars(str: string) {
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

export function findUniqueCharCount(str: string) {
  return findUniqueChars(str).length
}

export function generateUniqueCharIndices(input: string) {
  let uniqCharacters = "";
  let solution = "";
  let numOfSpaces = 0;


  for (let i = 0; i < input.length; i++) {
    // Account for whitespace
    if (input[i] == ' ') {
      numOfSpaces++;
      solution += ' ';
      continue;
    }

    // Determine whether we need to append a comma or not
    // if we're at i=0, don't append
    // if the previous char was a ' ', don't append
    if ((i != 0) && (input[i-1] != ' ')) {
      solution += ',';
    }

    // If we haven't seen this specific character before
    if (!uniqCharacters.includes(input[i])) {
      // Concatenate the character with uniqCharacters
      uniqCharacters += input[i];

      solution += uniqCharacters.length;
    } else {
      // if we've seen this char before
      // find the index of of the char in our uniqCharacters string
      let indexOfChar = uniqCharacters.indexOf(input[i]) + 1;

      // concatenate this index of where we saw it
      solution += String(indexOfChar);
    }
  }

  return solution;
}