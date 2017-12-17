const faker = require('faker');
const moment = require('moment');
const { randomInt, fakeHex } = require('./helpers');

const timezones = ['Pacific Time', 'Mountain Time', 'Central Time', 'Eastern Time'];

const fakeUser = () => {
  let user = {
    // id: assigned by generator function, a num from 0 to numUsers
    screen_name: faker.random.word(),
    name: faker.name.findName(),
    description: faker.lorem.sentence(),
    profile_sidebar_fill_color: fakeHex(),
    profile_sidebar_border_color: fakeHex(),
    profile_background_color: fakeHex(),
    profile_background_tile: false,
    profile_background_image_url: 'http://lorempixel.com/400/200/',
    profile_background_image_url_https: 'http://lorempixel.com/400/200/',
    profile_use_background_image: true,
    profile_image_url: 'http://lorempixel.com/400/200/',
    profile_image_url_https: 'http://lorempixel.com/400/200/',
    default_profile_image: false,
    profile_link_color: fakeHex(),
    profile_text_color: fakeHex(),
    // created_at: moment(faker.date.recent()).format('ddd MMM D hh:mm:ss ZZ YYYY'),
    created_at: moment(faker.date.recent()).format('YYYY-MM-DD hh:mm:ss.SSS'),
    default_profile: true,
    url: faker.internet.url(),
    contributors_enabled: false,
    favorites_count: randomInt(500),
    statuses_count: randomInt(800),
    friends_count: randomInt(600),
    followers_count: randomInt(700),
    listed_count: randomInt(400),
    location: `${faker.address.city()} ${faker.address.stateAbbr()}`,
    time_zone: `${timezones[randomInt(4)]}`,
    utc_offset: (randomInt(-5, -8) * 360),
    lang: 'en',
    protected: false,
    verified: false,
  };
  return user;
};

module.exports.fakeUser = fakeUser;
