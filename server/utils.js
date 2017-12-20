const moment = require('moment');
const cassandra = require('../database/cassandra.js');
const redis = require('../database/redis.js');

const dateIsYoungerThan10Min = (date) => {
  return moment(date).add(10, 'minutes').isSameOrAfter(new Date());
};

module.exports = {
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
    console.log('inside parseFeed');
    const params = '(' + tweetIds.join(', ') + ')';
    const query = `SELECT * FROM tweets WHERE id in ${params}`;

    cassandra.execute(query, (err, result) => {
      err && console.log(err);
      cb(result.rows);
    });
  },

  requestRecentFeed: (userId, count = 100, cb) => {
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
    if (service === 'engagement') {
      body.created_at = moment().format('ddd MMM D hh:mm:ss ZZ YYYY');
      // console.log('sent information to User Engagement Analysis route', route);
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
