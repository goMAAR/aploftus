const fs = require('fs');

// const fakeTweet = require('./tweetGeneratorHelper.js').fakeTweet;

const file = __dirname + '/feedSeedFinal.txt';

let tweetId, command;

// for each user
for (let x = 0; x < 2000000; x++) {
  // generate 200 random tweets
  command = `ZADD ${x}:feed `;
  for (let y = 0; y < 200; y++) {
    tweetId = Math.floor(Math.random() * 8000000);
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