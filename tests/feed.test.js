const { expect } = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const utils = require('../server/utils.js');
const server = require('../server/index.js');

const request = supertest.agent(server);

describe('Client Service Feed Handler', () => {
  describe('attachUsers', () => {
    it('should extend tweet object with user object', (done) => {
      const tweets = [
        { id: -1, user_id: 1 },
        { id: -2, user_id: 3 },
        { id: -3, user_id: 2 },
      ];

      utils.attachUsers(tweets, (extendedTweets) => {
        expect(extendedTweets[0].user).to.be.an('object');
        done();
      });
    });
  });

  describe('parseFeed', () => {
    it('should serve tweets from the cache', (done) => {
      const feed = [1, 2, 3, 4, 5];

      utils.parseFeed(feed, (result) => {
        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('object');
        expect(result.length).to.equal(5);
        done();
      });
    });
  });

  describe('userAccessedInLast10Min', () => {
    it('should return a boolean', (done) => {
      const userId = -1;

      utils.userAccessedInLast10Min(userId, (boolean) => {
        expect(boolean).to.be.a('boolean');
        done();
      });
    });
  });

  describe('getFeedList', () => {
    it('should return a list of tweets', (done) => {
      const userId = 1;

      utils.getFeedList(userId, 5, (feed) => {
        expect(feed).to.be.an('array');
        expect(feed[0]).to.be.a('string');
        expect(feed.length).to.equal(5);
        done();
      });
    });
  });

  describe('requestRecentFeed', () => {
    it('should send a request to Social Network Processing', (done) => {
      const userId = -1;

      utils.requestRecentFeed(userId, 5, (feed) => {
        expect(feed).to.be.an('array');
        expect(feed[0]).to.be.a('string');
        done();
      });
    });

    it('should insert recent feed into cache', (done) => {
      const userId = -1;

      utils.requestRecentFeed(userId, 5, (recentFeed) => {
        utils.getFeedList(userId, 5, (feedFromCache) => {
          expect(feedFromCache).to.deep.equal(recentFeed);
          done();
        });
      });
    });
  });

  describe('insertTweet', () => {
    it('should parse tweet objects into cache', (done) => {
      const newTweet =
        {
          text: 'Today made me realize footlong sandwiches from Subway are amazing',
          truncated: false,
          created_at: 'Wed Apr 26 12:52:17 -0700 2017',
          reply_count: 67,
          favorite_count: 93,
          retweet_count: 107,
          in_reply_to_user_id: 'null',
          in_reply_to_screen_name: 'null',
          in_reply_to_status_id: 'null',
          possibly_sensitive: false,
          source: 'Safari for iOS',
          user_id: 1,
          id: -1
        };
      utils.insertTweet(newTweet, (result) => {
        expect(result).to.exist;
        done();
      });
    });
  });

  describe('GET requests to /feed', () => {
    it('should respond with a user feed', (done) => {
      const body = {
        user_id: 1,
        count: 5
      };

      request
        .get('/feed')
        .query(body)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0]).to.be.an('object');
          expect(res.body.length).to.equal(5);
          done();
        });
    });
  });
});
