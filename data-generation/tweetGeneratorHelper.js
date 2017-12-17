const faker = require('faker');
const moment = require('moment');
const { randomInt } = require('./helpers');

const sources = ['Safari for iOS', 'Twitter for Mac', 'Twitter for Android', 'Twitter for iOS'];
const prefaces = [
  'Ask me why I think',
  'After much consideration I have finally decided that',
  'Today made me realize',
  'Have you ever thought about how',
];
const nouns = [
  'pumpkin spice lattes',
  'dogs that skateboard',
  'critically acclaimed foreign films',
  'all of my ideas',
  'old timey hats',
  'footlong sandwiches from Subway',
  'chatty cashiers',
  'my imaginary friends from elementary school'
];
const adjs = [
  'awesome',
  'stupid',
  'amazing',
  'awful',
  'whatever',
  'fine',
  'a thing',
  'meh'
];

const fakeTweetText = () => {
  let preface = prefaces[randomInt(4)];
  let noun = nouns[randomInt(8)];
  let adj = adjs[randomInt(8)];

  return `${preface} ${noun} are ${adj}`;
};

const fakeTweet = () => {
  let tweet = {
    // id: assigned by generator function, a num from 0 to numUsers
    text: fakeTweetText(),
    truncated: false,
    // created_at: moment(faker.date.recent()).format('ddd MMM D hh:mm:ss ZZ YYYY'),
    created_at: moment(faker.date.recent()).format('YYYY-MM-DD hh:mm:ss.SSS'),
    reply_count: randomInt(500),
    favorite_count: randomInt(700),
    // favorited: false,
    retweet_count: randomInt(800),
    // retweeted: true,
    in_reply_to_user_id: -1,
    in_reply_to_screen_name: -1,
    in_reply_to_status_id: -1,
    possibly_sensitive: false,
    source: `${sources[randomInt(4)]}`,
    user_id: randomInt(2000000),
    // 'user:following': false
  };
  return tweet;
};

module.exports.fakeTweet = fakeTweet;
