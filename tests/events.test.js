const { expect } = require('chai');
const moment = require('moment');
const sinon = require('sinon');
const supertest = require('supertest');
const utils = require('../server/utils.js');
const server = require('../server/index.js');

const request = supertest.agent(server);

describe('Client Service Events', () => {
  describe('POST requests to /favorite', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        tweet_id: 1,
        favoriter_id: 1,
        author_id: 2,
        destroy: true
      };

      request
        .post('/favorite')
        .send(body)
        .expect(201, done);
    });

    it('should send favorite event to User Engagement Analysis', () => {
      sinon.spy(utils, 'sendEvent');

      const body = {
        tweet_id: 1,
        favoriter_id: 1,
        author_id: 2,
        destroy: true
      };

      request
        .post('/favorite')
        .send(body)
        .then(res => {
          expect(utils.sendEvent).to.have.been.calledWith('engagement', '/favorite', body);
          done();
        });
    });
  });

  describe('POST requests to /follow', () => {
    it('should respond with a 201 status code', (done) => {
      const body = {
        follower_id: 1,
        followed_id: 2,
        destroy: true
      };

      request
        .post('/follow')
        .send(body)
        .expect(201, done);
    });

    it('should send follow event to User Engagement Analysis', () => {
      const body = {
        follower_id: 1,
        followed_id: 2,
        destroy: true
      };

      request
        .post('/follow')
        .send(body)
        .then(res => {
          expect(utils.sendEvent).to.have.been.calledWith('engagement', '/follow', body);
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

    it('should respond with a full tweet object', (done) => {
      const body = {
        user_id: 1,
        status: 'Maybe he\'ll finally find his keys. #peterfalk',
        source: 'Safari for iOS'
      };

      request
        .post('/tweets')
        .send(body)
        .then(res => {
          expect(res.body).to.be.an('object');
          expect(res.body.user).to.be.an('object');
          done();
        });
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
          expect(utils.sendEvent).to.have.been.calledWith('tweets', '/tweets', body);
          done();
        });
    });
  });
});
