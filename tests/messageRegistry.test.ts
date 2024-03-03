import { MessageRegistry } from '../src/messageRegistry';

describe('testing MessageRegistry class', () => {
  test('testing generating of encoded message', () => {
    let messageToDecode = new MessageRegistry("you are absolutely amazing");
    // expect(messageToDecode.messageAsArray).toEqual(['y', 'o', 'u', ' ', 'a', 'r', 'e', ' ', 'a', 'b', 's', 'o', 'l', 'u', 't', 'e', 'l', 'y', ' ', 'a', 'm', 'a', 'z', 'i', 'n', 'g']);
    expect(messageToDecode.encodedMessage).toEqual([0,1,2,3,4,5,3,6,7,1,8,2,9,5,8,0,3,10,3,11,12,13,14]);
  });

  test('testing getLetterFromIndex', () => {
    let messageToDecode = new MessageRegistry("you are absolutely amazing");
    expect(messageToDecode.getCharFromIndex(3)).toBe('a');
    expect(messageToDecode.getCharFromIndex(11)).toBe('z');
  });
});