export class MessageRegistry {
  readonly messageToDecode: string;
  readonly messageAsArray: string[];
  uniqueCharLookup: string[]          // array of all unique characters from message
  uniqueIndices: string;
  encodedMessage: number[];           // array of unique numbers mapped to each unique letter from message
  uniqueCharCount: number;

  constructor(message: string) {
    this.messageToDecode = message;
    this.messageAsArray = message.replace(/ /g, '').split('');
    this.uniqueCharLookup = [];
    this.encodedMessage = [];
    this.uniqueIndices = "";
    this.uniqueCharCount = 0;
    this.generateIndices();
  }

  generateIndices() {
    let encodedMessage = [];
    for (let i = 0; i < this.messageAsArray.length; i++) {
      let char = this.messageAsArray[i];

      // Account for whitespace
      if (char == ' ') {
        continue;
      }

      // If we haven't seen this specific character before
      if (!this.uniqueCharLookup.includes(char)) {
        // Keep a record of it
        this.uniqueCharLookup.push(char);

        // Append the index to our encodedMessage
        this.encodedMessage.push(this.uniqueCharLookup.length-1);
      } else {
        // if we've seen this char before
        // find the corresponding index from uniqueCharLookup
        let index = this.uniqueCharLookup.indexOf(char);

        // Append the index to our encodedMessage
        this.encodedMessage.push(index);
      }
    }
  }

  getUniqueCharCount() {
    return this.uniqueCharLookup.length;
  }

  getCharFromIndex(index: number) {
    return this.uniqueCharLookup[index];
  }

  print() {
    // Header
    console.log("Message to decode: " + this.messageToDecode);
    console.log();
    console.log("Unique indices are as follows:");
    console.log("  " + this.messageAsArray);
    console.log("  " + this.encodedMessage);
    console.log();
  }
}