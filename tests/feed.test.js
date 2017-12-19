const { expect } = require('chai');
const sinon = require('sinon');
const supertest = require('supertest');
const utils = require('../server/utils.js');
const server = require('../server/index.js');

const request = supertest.agent(server);

describe('Client Service Feed Handler', () => {
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
      const userId = 1;

      utils.userAccessedInLast10Min(userId, (boolean) => {
        expect(boolean).to.be.a('boolean');
        done();
      });
    });
  });

  describe('getFeedList', () => {
    it('should return a list of tweets', (done) => {
      const userId = 1;

      utils.getFeedList(userId, (feed) => {
        expect(feed).to.be.an('array');
        expect(feed[0]).to.be.a('string');
        expect(feed.length).to.equal(101);
        done();
      });
    });
  });

  describe('refreshTweets', () => {
    it('should parse tweet objects into cache', (done) => {
      const newTweets = [
        {
          text: 'Today made me realize footlong sandwiches from Subway are amazing',
          truncated: false,
          created_at: 'Wed Apr 26 12:52:17 -0700 2017',
          reply_count: 67,
          favorite_count: 93,
          favorited: false,
          retweet_count: 107,
          retweeted: true,
          in_reply_to_user_id: 'null',
          in_reply_to_screen_name: 'null',
          in_reply_to_status_id: 'null',
          possibly_sensitive: false,
          source: 'Safari for iOS',
          'user:id': -1,
          id: -1
        }
      ];
      utils.refreshTweets(newTweets, (result) => {
        expect(result).to.equal(1);
        done();
      });
    });
  });

  describe('GET requests to /feed', () => {
    it('should respond with a user feed', (done) => {
      const body = {
        user_id: -1,
        count: 5
      };

      request
        .post('/feed')
        .query(body)
        .then(res => {
          expect(res.data).to.be.an('array');
          expect(res.data[0]).to.be.an('object');
          expect(res.data.length).to.equal(5);
          done();
        });
    });
  });
});
