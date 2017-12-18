const { expect } = require('chai');
const supertest = require('supertest');
const server = require('../server/index.js');

const request = supertest.agent(server);

describe('Client Service Events', () => {
  describe('POST requests to /favorite/create', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        tweet_id: 'testTweet',
        favoriter_id: 'testUser', // id of person doing the favoriting
      };

      request
        .post('/favorite/create')
        .send(body)
        .expect(201, done);
    });
  });

  describe('POST requests to /favorite/destroy', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        tweet_id: 'testTweet',
        favoriter_id: 'testUser', // id of person doing the favoriting
      };

      request
        .post('/favorite/destroy')
        .send(body)
        .expect(201, done);
    });
  });

  describe('POST requests to /follow/create', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        follower_id: 'testUser1', // authenticated user doing the following
        followed_id: 'testUser2' // id of the person to be followed
      };

      request
        .post('/follow/create')
        .send(body)
        .expect(201, done);
    });
  });

  describe('POST requests to /follow/destroy', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        follower_id: 'testUser1', // authenticated user doing the following
        followed_id: 'testUser2' // id of the person to be followed
      };

      request
        .post('/follow/destroy')
        .send(body)
        .expect(201, done);
    });
  });

  describe('POST requests to /tweets', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        user_id: 'testUser1',
        status: 'Maybe he\'ll finally find his keys. #peterfalk'
      };

      request
        .post('/tweets')
        .send(body)
        .expect(201, done);
    });
  });
});

server.close();
