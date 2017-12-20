const moment = require('moment');
const cassandra = require('../database/cassandra.js');
const redis = require('../database/redis.js');

const dateIsYoungerThan10Min = (date) => {
  return moment(date).add(10, 'minutes').isSameOrAfter(new Date());
};

module.exports = {
  getFeedList: (userId, count = 100, cb) => {
    redis.zrange(`${userId}:feed`, 0, count - 1, (err, results) => {
      cb(results);
    });
  },

  parseFeed: (tweetIds, cb) => {
    const params = '(' + tweetIds.join(', ') + ')';
    const query = `SELECT text FROM tweets WHERE id in ${params}`;

    cassandra.execute(query, (err, result) => {
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
    // redis.get(`${userId}:accessed`, (err, datetime) => {
    //   if (!datetime || !dateIsYoungerThan10Min(datetime)) {
    //     cb(false);
    //   } else {
    //     cb(true);
    //   }
    //   redis.set(`${userId}:accessed`, moment().format('YYYY-MM-DD hh:mm:ss'));
    // });
    /* uncomment the above and comment out the below for production */
    cb(true);
  }
};
