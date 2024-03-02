export class MessageRegistry {
  readonly messageToDecode: string;
  uniqueIndices: string;
  uniqueCharCount: number;

  constructor(message: string) {
    this.messageToDecode = message;
    this.uniqueIndices = "";
    this.uniqueCharCount = 0;
  }

  generateIndices() {
    let uniqCharacters = "";
    let solution = "";

    for (let i = 0; i < this.messageToDecode.length; i++) {
      // Account for whitespace
      if (this.messageToDecode[i] == ' ') {
        solution += ' ';
        continue;
      }

      // Determine whether we need to append a comma or not
      // if we're at i=0, don't append
      // if the previous char was a ' ', don't append
      if ((i != 0) && (this.messageToDecode[i - 1] != ' ')) {
        solution += ',';
      }

      // If we haven't seen this specific character before
      if (!uniqCharacters.includes(this.messageToDecode[i])) {
        // Concatenate the character with uniqCharacters
        uniqCharacters += this.messageToDecode[i];

        solution += uniqCharacters.length;
      } else {
        // if we've seen this char before
        // find the index of of the char in our uniqCharacters string
        let indexOfChar = uniqCharacters.indexOf(this.messageToDecode[i]) + 1;

        // concatenate this index of where we saw it
        solution += String(indexOfChar);
      }
    }

    this.uniqueIndices = solution;
    this.uniqueCharCount = uniqCharacters.length;
  }

  getUniqueCount() {
    return this.uniqueCharCount;
  }

  print() {
    // Header
    console.log("Message to decode: " + this.messageToDecode);
    console.log();
    console.log("Unique indices are as follows:");

    // Print message with commas
    let messageWithCommas = "";
    for (let i = 0; i < this.messageToDecode.length; i++) {
      // Account for whitespace
      if (this.messageToDecode[i] == ' ') {
        messageWithCommas += ' ';
        continue;
      }

      // Determine whether we need to append a comma or not
      // if we're at i=0, don't append
      // if the previous char was a ' ', don't append
      if ((i != 0) && (this.messageToDecode[i - 1] != ' ')) {
        messageWithCommas += ',';
      }

      messageWithCommas += this.messageToDecode[i];
    }
    console.log("  " + messageWithCommas);

    // Print indices with commas
    console.log("  " + this.uniqueIndices);
    console.log();
  }
}