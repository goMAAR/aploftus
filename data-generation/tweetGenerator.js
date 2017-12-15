const fs = require('fs');

const fakeTweet = require('./tweetGeneratorHelper.js').fakeTweet;

const file = __dirname + '/tweetSeedFinal.txt';

let tweet, prop, command;

// this runs a loop to generate 8000000 tweets
for (let x = 0; x < 8000000; x++) {
  tweet = fakeTweet();
  tweet.id = x;

  command = `HMSET tweets:${x} `;
  for (prop in tweet) {
    command += `${prop} \"${tweet[prop]}\" `;
  }
  command += '\n';
  fs.appendFileSync(file, command, (err) => {
    err && console.error(err);
  });
  if (x % 10000 === 0) {
    console.log(x);
  }
}

// this creates a set to inventory all tweets
command = 'SADD tweets ';
for (x = 0; x < 8000000; x++) {
  command += `${x} `;
  if (x % 10000 === 0) {
    console.log(x);
  }
}
command += '\n';

fs.appendFileSync(file, command, (err) => {
  err && console.error(err);
});

console.log('Done!');