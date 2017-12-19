const { expect } = require('chai');
const moment = require('moment');
const sinon = require('sinon');
const supertest = require('supertest');
const helpers = require('../server/helpers.js');
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

    it('should send favorite event to User Engagement Analysis', () => {
      sinon.spy(helpers, 'sendEvent');

      const body = {
        tweet_id: 'testTweet',
        favoriter_id: 'testUser',
      };

      request
        .post('/favorite/create')
        .send(body)
        .then(res => {
          expect(helpers.sendEvent.to.have.been.calledWith('engagement', '/favorite/create', body));
          done();
        });
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

    it('should send favorite event to User Engagement Analysis', () => {
      const body = {
        tweet_id: 'testTweet',
        favoriter_id: 'testUser', // id of person doing the favoriting
      };

      request
        .post('/favorite/destroy')
        .send(body)
        .then(res => {
          expect(helpers.sendEvent.to.have.been.calledWith('engagement', '/favorite/destroy', body));
          done();
        });
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

    it('should send follow event to User Engagement Analysis', () => {
      const body = {
        follower_id: 'testUser1', // authenticated user doing the following
        followed_id: 'testUser2' // id of the person to be followed
      };

      request
        .post('/follow/create')
        .send(body)
        .then(res => {
          expect(helpers.sendEvent.to.have.been.calledWith('engagement', '/follow/create', body));
          done();
        });
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

    it('should send follow event to User Engagement Analysis', () => {
      const body = {
        follower_id: 'testUser1', // authenticated user doing the following
        followed_id: 'testUser2' // id of the person to be followed
      };

      request
        .post('/follow/destroy')
        .send(body)
        .then(res => {
          expect(helpers.sendEvent.to.have.been.calledWith('engagement', '/follow/destroy', body));
          done();
        });
    });
  });

  describe('POST requests to /tweets', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        user_id: 'testUser1',
        status: 'Maybe he\'ll finally find his keys. #peterfalk',
        source: 'Safar for iOS'
      };

      request
        .post('/tweets')
        .send(body)
        .expect(201, done);
    });

    it('should send tweet event to Tweet Inventory', () => {
      const body = {
        user_id: 'testUser1',
        status: 'Maybe he\'ll finally find his keys. #peterfalk',
        source: 'Safari for iOS'
      };

      request
        .post('/tweets')
        .send(body)
        .then(res => {
          expect(helpers.sendEvent.to.have.been.calledWith('engagement', '/favorite/create', body));
          done();
        });
    });
  });
});
