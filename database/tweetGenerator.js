const faker = require('faker');
const moment = require('moment');

const tweetAdj = ['love', 'hate', 'awesome', 'stupid', 'amazing', 'awful'];
const sources = ['Safari for iOS', 'Twitter for Mac', 'Twitter for Android', 'Twitter for iOS'];
const timezones = ['Pacific Time', 'Mountain Time', 'Central Time', 'Eastern Time'];
const hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
const prefaces = [
  'Ask me why I think',
  'After much consideration, I have finally decided that',
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

const fakeHex = () => {
  let result = '';
  for (let x = 0; x < 6; x++) {
    let randIndex = Math.floor(Math.random() * 16);
    result += hex[randIndex];
  }
  return result;
};

const fakeTweetText = () => {
  let preface = prefaces[Math.floor(Math.random() * prefaces.length)];
  let noun = nouns[Math.floor(Math.random() * nouns.length)];
  let adj = adjs[Math.floor(Math.random() * adjs.length)];

  return `${preface} ${nouns} are ${adj}`;
};

const fakeUser = () => {
  let user = {
    id: Math.floor(Math.random() * 1000),
    screen_name: faker.random.word(),
    name: faker.name.findName(),
    description: faker.lorem.sentence(),
    profile_sidebar_fill_color: fakeHex(),
    profile_sidebar_border_color: fakeHex(),
    profile_background_color: fakeHex(),
    profile_background_tile: faker.random.boolean(),
    profile_background_image_url: faker.image.imageUrl(),
    profile_background_image_url_https: faker.image.imageUrl(),
    profile_use_background_image: faker.random.boolean(),
    profile_image_url: faker.image.imageUrl(),
    profile_image_url_https: faker.image.imageUrl(),
    default_profile_image: false,
    profile_link_color: fakeHex(),
    profile_text_color: fakeHex(),
    created_at: moment(faker.date.past()).format('ddd MMM D hh:mm:ss ZZ YYYY'),
    default_profile: true,
    url: faker.internet.url(),
    contributors_enabled: false,
    favorites_count: Math.floor(Math.random() * 1000),
    statuses_count: Math.floor(Math.random() * 1000),
    friends_count: Math.floor(Math.random() * 1000),
    followers_count: Math.floor(Math.random() * 1000),
    listed_count: Math.floor(Math.random() * 1000),
    location: `${faker.address.city()}, ${faker.address.stateAbbr()}`,
    time_zone: `${timezones[Math.floor(Math.random() * 4)]}`,
    utc_offset: (Math.floor(Math.random() * 3 - 8) * 360),
    lang: 'en',
    protected: false,
    verified: faker.random.boolean(),
    following: faker.random.boolean(),
  };
  return user;
};

const fakeTweet = () => {
  let tweet = {
    id: Math.floor(Math.random() * 1000 + 2000),
    text: fakeTweetText(),
    truncated: false,
    created_at: moment(faker.date.past()).format('ddd MMM D hh:mm:ss ZZ YYYY'),
    reply_count: Math.floor(Math.random() * 1000),
    favorite_count: Math.floor(Math.random() * 1000),
    favorited: faker.random.boolean(),
    retweet_count: Math.floor(Math.random() * 1000),
    retweeted: faker.random.boolean(),
    in_reply_to_user_id: 'null',
    in_reply_to_screen_name: 'null',
    in_reply_to_status_id: 'null',
    possibly_sensitive: false,
    source: `${sources[Math.floor(Math.random() * 4)]}`,
    user: fakeUser()
  };
  return tweet;
};

module.exports.fakeTweet = fakeTweet;
module.exports.fakeUser = fakeUser;
