const faker = require('faker');
const moment = require('moment');
const helpers = require('./helpers');

const fakeTweet = () => {
  let tweet = {
    // id: assigned by generator function, a num from 0 to numUsers
    text: helpers.fakeTweetText(),
    truncated: false,
    // created_at: moment(faker.date.recent()).format('ddd MMM D hh:mm:ss ZZ YYYY'),
    created_at: moment(faker.date.recent()).format('YYYY-MM-DD hh:mm:ss.SSS'),
    reply_count: helpers.randomInt(500),
    favorite_count: helpers.randomInt(700),
    // favorited: false,
    retweet_count: helpers.randomInt(800),
    // retweeted: true,
    in_reply_to_user_id: -1,
    in_reply_to_screen_name: -1,
    in_reply_to_status_id: -1,
    possibly_sensitive: false,
    source: helpers.fakeSource(),
    user_id: helpers.randomInt(2000000),
    // 'user:following': false
  };
  return tweet;
};

module.exports.fakeTweet = fakeTweet;
