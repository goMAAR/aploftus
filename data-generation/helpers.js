const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

const randomInt = (max, min = 0) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const fakeHex = () => {
  let result = '';
  for (let x = 0; x < 6; x++) {
    result += hex[randomInt(16)];
  }
  return result;
};

module.exports = {
  randomInt: randomInt,
  fakeHex: fakeHex
};
