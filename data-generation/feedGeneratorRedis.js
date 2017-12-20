const fs = require('fs');
const { randomInt } = require('./helpers.js');

const file = __dirname + '/feedSeedFinal.txt';

let tweetId, command;

// for each user
for (let x = 0; x < 500000; x++) {
  // generate 100 random tweets
  command = `ZADD ${x}:feed `;
  for (let y = 0; y < 100; y++) {
    tweetId = randomInt(10000000);
    command += `${y} ${tweetId} `;
  }
  command += '\n';

  fs.appendFileSync(file, command, (err) => {
    err && console.error(err);
  });

  if (x % 10000 === 0) {
    console.log(x);
  }
}

console.log('Done!');
