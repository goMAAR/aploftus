const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

const randomInt = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const sources = ['Safari for iOS', 'Twitter for Mac', 'Twitter for Android', 'Twitter for iOS'];

const prefaces = [
  'Ask me why I think',
  'After much consideration I have finally decided that',
  'Today made me realize',
  'Have you ever thought about how',
];
const nouns = [
  'pumpkin spice lattes',
  'dogs that skateboard',
  'critically acclaimed foreign films',
  'all of my ideas',
  'old timey hats',
  'footlong sandwiches from Subway',
  'chatty cashiers',
  'my imaginary friends from elementary school'
];
const adjs = [
  'awesome',
  'stupid',
  'amazing',
  'awful',
  'whatever',
  'fine',
  'a thing',
  'meh'
];

module.exports = {
  randomInt: randomInt,

  fakeHex: () => {
    let result = '';
    for (let x = 0; x < 6; x++) {
      result += hex[randomInt(16)];
    }
    return result;
  },

  fakeBool: () => {
    let bools = [true, false];
    return bools[Math.floor(Math.random() * 2)];
  },

  fakeSource: () => {
    return `${sources[randomInt(4)]}`;
  },

  fakeTweetText: () => {
    let preface = prefaces[randomInt(4)];
    let noun = nouns[randomInt(8)];
    let adj = adjs[randomInt(8)];

    return `${preface} ${noun} are ${adj}`;
  }
};
