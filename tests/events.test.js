const { expect } = require('chai');
const axios = require('axios');
const port = require('../server/index.js').port;

describe('Client Service Events', () => {
  describe('POST requests to /favorite/create', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        tweet_id: 'testTweet',
        favoriter_id: 'testUser', // id of person doing the favoriting
      };

      axios.post(`http://localhost:${port}/favorite/create`, body)
        .then((response) => {
          expect(response.statusCode).to.equal(201);
          done();
        })
        .catch(err => console.error('error with request'));
    });
  });

  describe('POST requests to /favorite/destroy', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        tweet_id: 'testTweet',
        favoriter_id: 'testUser', // id of person doing the favoriting
      };

      axios.post(`http://localhost:${port}/favorite/destroy`, body)
        .then((response) => {
          expect(response.statusCode).to.equal(201);
          done();
        })
        .catch(err => console.error('error with request'));
    });
  });

  describe('POST requests to /follow/create', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        follower_id: 'testUser1', // authenticated user doing the following
        followed_id: 'testUser2' // id of the person to be followed
      };

      axios.post(`http://localhost:${port}/follow/create`, body)
        .then((response) => {
          expect(response.statusCode).to.equal(201);
          done();
        })
        .catch(err => console.error('error with request'));
    });
  });

  describe('POST requests to /follow/destroy', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        follower_id: 'testUser1', // authenticated user doing the following
        followed_id: 'testUser2' // id of the person to be followed
      };

      axios.post(`http://localhost:${port}/follow/destroy`, body)
        .then((response) => {
          expect(response.statusCode).to.equal(201);
          done();
        })
        .catch(err => console.error('error with request'));
    });
  });

  describe('POST requests to /tweets', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        user_id: 'testUser1',
        status: 'Maybe he\'ll finally find his keys. #peterfalk'
      };

      axios.post(`http://localhost:${port}/tweets`, body)
        .then((response) => {
          expect(response.statusCode).to.equal(201);
          done();
        })
        .catch(err => console.error('error with request'));
    });
  });
});
