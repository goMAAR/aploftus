const fs = require('fs');
const { randomInt } = require('./helpers');

const file = __dirname + '/feedSeed.csv';

let feed, tweetId, command;

// var stream = fs.createWriteStream(file, {'flags': 'a', 'encoding': null, 'mode': 0666});
console.log('\x1b[0m' + 'start');
stream.once('open', (fd) => {

  // this runs a loop to generate 500000 users
  for (let x = 0; x < 500000; x++) {
    command = `insert into feeds (user_id, feed) values (${x}, [`;

    feed = [];

    for (let i = 0; i < 100; i++) {
      feed.push('\'' + randomInt(10000000).toString() + '\'');
    }

    stream.write(command += feed.join(', ') + ']);\n');

    if (x % 100000 === 0) {
      console.log(x);
    }
  }
  stream.end();
  console.log('Done!');
});
