const fs = require('fs');

const file = __dirname + '/feeds.csv';

let command;

// var stream = fs.createWriteStream(file, {'flags': 'a', 'encoding': null, 'mode': 0666});
console.log('\x1b[0m' + 'start');
stream.once('open', (fd) => {

  // this runs a loop to generate 2000000 tweets
  for (let x = 0; x < 500; x++) {
    command = [x, 100];

    stream.write(command.join(',') + '\n');

    if (x % 100000 === 0) {
      console.log(x);
    }
  }
  stream.end();
  console.log('Done!');
});