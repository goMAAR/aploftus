const moment = require('moment');
const Promise = require('bluebird');
const cassandra = require('../database/cassandra.js');
const redis = require('../database/redis.js');

const attachUsers = (tweets, cb) => {
  let userIds = [];
  for (let i = 0; i < tweets.length; i++) {
    userIds.push(tweets[i].user_id);
  }
  const query = `SELECT * from tweetly.users WHERE id in (${userIds.join(', ')})`;

  cassandra.execute(query, (err, result) => {
    let users = {};
    for (i = 0; i < result.rows.length; i++) {
      let user = result.rows[i];
      users[user.id] = user;
    }
    for (i = 0; i < tweets.length; i++) {
      let tweet = tweets[i];
      tweet.user = users[tweet.user_id];
    }
    cb(tweets);
  });
};

const dateIsYoungerThan10Min = (date) => {
  return moment(date).add(10, 'minutes').isSameOrAfter(new Date());
};

module.exports = {
  attachUsers: attachUsers,

  insertTweet: (tweet, cb) => {
    let columns = [];
    let values = [];
    for (let prop in tweet) {
      columns.push(prop);
      if (prop === 'text' || prop === 'created_at' || prop === 'source') {
        values.push(`'${tweet[prop]}'`);
      } else {
        values.push(tweet[prop]);
      }
    }

    const query = `INSERT INTO tweetly.tweets (${columns.join(', ')}) VALUES (${values.join(', ')})`;
    cassandra.execute(query, (err, result) => {
      err && console.log(err);
      cb(result);
    });
  },

  getFeedList: (userId, count = 100, cb) => {
    redis.zrange(`${userId}:feed`, 0, count - 1, (err, results) => {
      err && console.log(err);
      cb(results);
    });
  },

  parseFeed: (tweetIds, cb) => {
    const params = '(' + tweetIds.join(', ') + ')';
    const query = `SELECT * FROM tweets WHERE id in ${params}`;

    cassandra.execute(query, (err, result) => {
      err && console.log(err);
      let tweetHash = {};
      let tweets = [];
      for (let i = 0; i < result.rows.length; i++) {
        let tweet = result.rows[i];
        tweetHash[tweet.id] = i;
      }
      for (i = 0; i < tweetIds.length; i++) {
        let indexOfTweet = tweetHash[tweetIds[i]];
        tweets.push(result.rows[indexOfTweet]);
      }

      cb(tweets);
    });
  },

  requestRecentFeed: (userId, count = 100, cb) => {
    // console.log('inside requestRecentFeed');
    // console.log('requesting feed from social network processing');
    // send http request to social network processing, await response
    let response = ['1', '2', '3', '4', '5'];
    let params = [];
    redis.del(`${userId}:feed`, (err, result) => {
      for (let i = 0; i < response.length; i++) {
        params.push(i, response[i]);
      }
      redis.zadd(`${userId}:feed`, ...params);
      cb(response);
    });
  },

  sendEvent: (service, route, body) => {
    body.created_at = moment().format('ddd MMM D hh:mm:ss ZZ YYYY');
    if (service === 'engagement') {
      // send http request to user engagement
    }
    if (service === 'tweets') {
      return new Promise((resolve, reject) => {
        // send http request to tweet inventory
        // it should return a tweet object, like so
        let tweet = {
          id: -1,
          user_id: 1,
          created_at: ' 2017-12-17 07:24:22.885',
          favorite_count: 668,
          in_reply_to_screen_name: -1,
          in_reply_to_status_id: -1,
          in_reply_to_user_id: -1,
          possibly_sensitive: false,
          reply_count: 62,
          retweet_count: 709,
          source: ' Twitter for Android',
          text: 'Today made me realize pumpkin spice lattes are awesome',
          truncated: false
        };

        attachUsers([tweet], (tweets) => {
          resolve(tweets[0]);
        });
      });
    }
  },

  userAccessedInLast10Min: (userId, cb) => {
    redis.get(`${userId}:accessed`, (err, datetime) => {
      if (!datetime || !dateIsYoungerThan10Min(datetime)) {
        cb(false);
      } else {
        cb(true);
      }
      redis.set(`${userId}:accessed`, moment().format('YYYY-MM-DD hh:mm:ss'));
    });
  }
};
