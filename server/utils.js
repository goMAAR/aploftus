const moment = require('moment');
const Promise = require('bluebird');
/* cassandra stores the tweet cache and user cache */
const cassandra = require('../database/cassandra.js');
/* redis stores the "feed list", in a sorted set data structure */
const redis = require('../database/redis.js');

const _attachUsers = (tweets) => {
  return new Promise((resolve, reject) => {
    let userIds = [];
    for (let i = 0; i < tweets.length; i++) {
      userIds.push(tweets[i].user_id);
    }
    const query = `SELECT * from tweetly.users WHERE id in (${userIds.join(', ')})`;

    cassandra.execute(query, (err, result) => {
      let users = {};
      for (i = 0; i < result.rows.length; i++) {
        let user = result.rows[i];
        users[user.id] = user;
      }
      for (i = 0; i < tweets.length; i++) {
        let tweet = tweets[i];
        tweet.user = users[tweet.user_id];
      }
      resolve(tweets);
    });
  });
};

const _insertTweet = (tweet) => {
  return new Promise((resolve, reject) => {
    let columns = [];
    let values = [];
    for (let prop in tweet) {
      columns.push(prop);
      // stringify the tweet properties text, created_at, and source for insertion to cassandra
      if (prop === 'text' || prop === 'created_at' || prop === 'source') {
        values.push(`'${tweet[prop]}'`);
      } else {
        values.push(tweet[prop]);
      }
    }

    const query = `INSERT INTO tweetly.tweets (${columns.join(', ')}) VALUES (${values.join(', ')})`;
    cassandra.execute(query, (err, result) => {
      // err && console.log(err);
      resolve(result);
    });
  });
};

const _dateIsYoungerThan10Min = (date) => {
  return moment(date).add(10, 'minutes').isSameOrAfter(new Date());
};

module.exports = {
  // exported for the sake of testing, but used only internally
  _attachUsers: _attachUsers,
  _insertTweet: _insertTweet,

  getFeedList: (userId, count = 100, cb) => {
    redis.zrange(`${userId}:feed`, 0, count - 1, (err, results) => {
      err && console.log(err);
      // this conversion to number types satisfies the tests, but isn't
      // necessary to query cassandra later.
      for (let i = 0; i < results.length; i++) {
        results[i] = parseInt(results[i], 10);
      }
      cb(results);
    });
  },

  parseFeed: (tweetIds, cb) => {
    const params = '(' + tweetIds.join(', ') + ')';
    const query = `SELECT * FROM tweets WHERE id in ${params}`;

    cassandra.execute(query, (err, result) => {
      err && console.log(err);
      // tweets are retrieved in ID order, not in order listed in the feed
      // therefore, create a new, feed-ordered list of tweets to return to client
      let tweetHash = {};
      let tweets = [];
      for (let i = 0; i < result.rows.length; i++) {
        let tweet = result.rows[i];
        tweetHash[tweet.id] = i;
      }
      for (i = 0; i < tweetIds.length; i++) {
        let indexOfTweet = tweetHash[tweetIds[i]];
        tweets.push(result.rows[indexOfTweet]);
      }

      cb(tweets);
    });
  },

  requestRecentFeed: (userId, count = 100, cb) => {
    // send http request to social network processing
    // response from SNP is a list of tweetIds
    let response = [1, 2, 3, 4, 5];
    let params = [];
    // deletes old version of the feed, inserts updated version
    redis.del(`${userId}:feed`, (err, result) => {
      for (let i = 0; i < response.length; i++) {
        // sets "score" of each item in the sorted set to item's index
        params.push(i, response[i]);
      }
      redis.zadd(`${userId}:feed`, ...params);
      cb(response);
    });
  },

  sendEvent: (service, route, body) => {
    body.created_at = moment().format('ddd MMM D hh:mm:ss ZZ YYYY');
    if (service === 'engagement') {
      // send http request to user engagement
    }
    if (service === 'tweets') {
      return new Promise((resolve, reject) => {
        // send http request to tweet inventory
        // it should return a tweet object, like so
        let tweet = {
          id: -1,
          user_id: 1,
          created_at: ' 2017-12-17 07:24:22.885',
          favorite_count: 668,
          in_reply_to_screen_name: -1,
          in_reply_to_status_id: -1,
          in_reply_to_user_id: -1,
          possibly_sensitive: false,
          reply_count: 62,
          retweet_count: 709,
          source: ' Twitter for Android',
          text: 'Today made me realize pumpkin spice lattes are awesome',
          truncated: false
        };

        _insertTweet(tweet);
        _attachUsers([tweet])
          .then(tweets => {
            resolve(tweets[0]);
          });
      });
    }
  },

  updateFavorite: (favoriteObj) => {
    let {
      tweet_id,
      favoriter_id,
      destroy,
      favorite_count,
      user_favorites_count
    } = favoriteObj;

    return new Promise((resolve, reject) => {
      favorite_count = destroy ? favorite_count - 1 : favorite_count + 1;
      user_favorites_count = destroy ? user_favorites_count - 1 : user_favorites_count + 1;
      favoriteObj.favorite_count = favorite_count;
      favoriteObj.user_favorites_count = user_favorites_count;

      let query = `UPDATE tweetly.tweets SET favorite_count = ${favorite_count} WHERE id = ${tweet_id}`;

      cassandra.execute(query, (err, result1) => {
        // err && console.log(err);
        query = `UPDATE tweetly.users SET favorites_count = ${user_favorites_count} WHERE id = ${favoriter_id}`;

        cassandra.execute(query, (err, result2) => {
          // err && console.log(err);
        });
      });

      resolve(favoriteObj);
    });
  },

  updateFollow: (followObj) => {
    let {
      follower_id,
      friends_count,
      followers_count,
      followed_id,
      destroy
    } = followObj;

    return new Promise((resolve, reject) => {
      friends_count = destroy ? friends_count - 1 : friends_count + 1;
      followers_count = destroy ? followers_count - 1 : followers_count + 1;
      followObj.friends_count = friends_count;
      followObj.followers_count = followers_count;

      let query = `UPDATE tweetly.users SET friends_count = ${friends_count} WHERE id = ${follower_id}`;

      cassandra.execute(query, (err, result1) => {
        // err && console.log(err);
        query = `UPDATE tweetly.users SET followers_count = ${followers_count} WHERE id = ${followed_id}`;

        cassandra.execute(query, (err, result2) => {
          // err && console.log(err);
        });
      });
      resolve(followObj);
    });
  },

  userAccessedInLast10Min: (userId, cb) => {
    redis.get(`${userId}:accessed`, (err, datetime) => {
      if (!datetime || !_dateIsYoungerThan10Min(datetime)) {
        cb(false);
      } else {
        cb(true);
      }
      redis.set(`${userId}:accessed`, moment().format('YYYY-MM-DD hh:mm:ss'));
    });
  }
};
