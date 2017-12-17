const fs = require('fs');

const fakeTweet = require('./tweetGeneratorHelper.js').fakeTweet;

const file = __dirname + '/tweetSeedTest.csv';

let tweet, prop, command;

// var stream = fs.createWriteStream(file, {'flags': 'a', 'encoding': null, 'mode': 0666});
console.log('\x1b[0m' + 'start');
stream.once('open', (fd) => {

  // this runs a loop to generate 2000000 tweets
  for (let x = 0; x < 2; x++) {
    tweet = fakeTweet();
    tweet.id = x;

    command = [];
    for (prop in tweet) {
      command.push(tweet[prop].toString());
    }
    stream.write(command.join(', ') + '\n');

    if (x % 100000 === 0) {
      console.log(x);
    }
  }
  stream.end();
  console.log('Done!');
});
