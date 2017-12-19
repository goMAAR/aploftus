const moment = require('moment');
const cassandra = require('../database/cassandra.js');
const redis = require('../database/redis.js');
// const dbHelp = require('../database/helpers.js');

const dateIsYoungerThan10Min = (date) => {
  return moment(date).add(10, 'minutes').isSameOrAfter(new Date());
};

module.exports = {
  sendEvent: (service, route, body) => {
    if (service === 'engagement') {
      body.created_at = moment().format('ddd MMM D hh:mm:ss ZZ YYYY');
      // console.log('sent information to User Engagement Analysis route', route);
    }
  },

  serveLocalFeed: (tweetIds, cb) => {
    const params = '(' + tweetIds.join(', ') + ')';
    const query = `SELECT text FROM tweets WHERE id in ${params}`;

    cassandra.execute(query, (err, result) => {
      cb(result.rows);
    });
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
