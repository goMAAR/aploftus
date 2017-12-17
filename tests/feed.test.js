const axios = require('axios');
const { expect } = require('chai');
const sinon = require('sinon');
const port = require('../server/index.js').port;
const helpers = require('../server/helpers.js');

describe('Client Service Feed Handler', () => {
  describe('serveFeed', () => {
    it('should serve tweets from the cache', (done) => {
      let tweetIds = ['test1', 'test2', 'test3', 'test4', 'test5'];
      let result = helpers.serveFeed('testFeed', tweetIds);

      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
      expect(result.length).to.equal(5);
      done();
    });

    it('should fetch a tweet from Social Network Processing if the tweet is not in the cache', () => {
      sinon.spy(helpers, 'fetchTweet');

      let tweetIds = [1, 'test2', 3, 4, 5];
      let result = helpers.serveFeed('testFeed', tweetIds);

      expect(helpers.fetchTweet).to.have.been.called;
      done();

    });
  });

  describe('refreshTweets', () => {
    it('should parse tweet objects into cache', (done) => {
      let result = helpers.refreshTweets(
        [
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
            'user:id': 'testUser',
            id: 0
          }
        ]
      );

      expect(result).to.equal(1);
      done();
    });

  });

  describe('GET requests to /feed', () => {
    it('should respond with a user feed', (done) => {
      const body = {
        user_id: 'testUser',
        count: 5
      };

      axios.post(`http://localhost:${port}/tweets`, body)
        .then((response) => {
          expect(response.data).to.be.an('array');
          expect(response.data[0]).to.be.an('object');
          expect(response.data.length).to.equal(5);
          done();
        })
        .catch(err => console.error('error with request'));
    });
  });
});
