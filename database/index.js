const redis = require('redis');

const fakeTweet = require('./tweetGenerator.js').fakeTweet;
const fakeUser = require('./tweetGenerator.js').fakeUser;

const client = redis.createClient();

// if you'd like to select database 2, instead of 0 (default), call
client.select(2, () => { 

  client.on('error', (err) => {
    console.log('Error ' + err);
  });

  let users = [];
  let count = 0;

  // generate 10 random users
  for (let x = 0; x < 2; x++) {
    users.push(fakeUser());
    console.log('userID: ', users[x].id);
  }
  // generate 100 random tweets, assigning each to an existing user
  for (x = 0; x < 10; x++) {
    // assign to a feed
    let feedId = users[Math.floor(Math.random() * users.length)].id;
    let tweet = fakeTweet();

    client.lpush(`${feedId}:feed`, tweet.id);
    // make a tweet
    console.log('tweetid: ', tweet.id);
    // assign to an author
    tweet.user = users[Math.floor(Math.random() * users.length)];
    // lpush each tweet into the feed
    client.lpush(`${feedId}:feed`, tweet.id);
    // hset each tweet prop except user
    for (let prop in tweet) {
      if (prop !== 'user') {
        client.hset(`${feedId}:feed:${tweet.id}`, prop, tweet[prop]);
      }
    }
    // hset all the user properties
    for (prop in tweet.user) {
      client.hset(`${feedId}:feed:${tweet.id}:user`, prop, tweet.user[prop]);
    }
    console.log('count is now ', ++count);
  }

  client.quit();

});  