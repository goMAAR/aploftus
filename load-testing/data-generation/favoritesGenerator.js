const fs = require('fs');
const { randomInt, fakeBool } = require('../../data-generation/helpers.js');

const file = __dirname + '/favorites.csv';

let command;

// var stream = fs.createWriteStream(file, {'flags': 'a', 'encoding': null, 'mode': 0666});
console.log('\x1b[0m' + 'start');
stream.once('open', (fd) => {

  // this runs a loop to generate 2000000 tweets
  for (let x = 0; x < 500; x++) {
    command = [randomInt(10000000), randomInt(500000), randomInt(500000), randomInt(500), randomInt(500), fakeBool()];

    stream.write(command.join(',') + '\n');

    if (x % 100000 === 0) {
      console.log(x);
    }
  }
  stream.end();
  console.log('Done!');
});