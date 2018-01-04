require('newrelic');
require('dotenv').config();

/* comment out apm below in order to run tests */
// var apm = require('elastic-apm-node').start({
//   appName: 'tweetly-client-server',
//   // Set custom APM Server URL (default: http://localhost:8200)
//   // serverUrl: 'process.env.AMP_IP'
// });

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.SERVER_PORT || 5000;

const utils = require('./utils.js');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// basic route for testing purposes
app.get('/', (req, res) => res.send('Hello World!'));

app.post('/favorite', (req, res) => {
  utils.sendEvent('engagement', req.path, req.body);
  // future feature will send http to sentiment analysis
  utils.updateFavorite(req.body)
    .then(favoriteObj => {
      res.status(201).send(favoriteObj);
    });
});

app.post('/follow', (req, res) => {
  // future feature will send http to sentiment analysis
  utils.sendEvent('engagement', req.path, req.body);
  utils.updateFollow(req.body)
    .then(followObj => {
      res.status(201).send(followObj);
    });
});

app.post('/tweets', (req, res) => {
  utils.sendEvent('tweets', '/tweets', req.body)
  // future feature will send http to tweet inventory
    .then(tweet => {
      res.status(201).send(tweet);
    });
});

app.get('/feed', (req, res) => {
  let userId = req.query.user_id;
  let count = req.query.count;

  utils.userAccessedInLast10Min(userId, (bool) => {
    if (bool === true) {
      utils.getFeedList(userId, count, (feed) => {
        utils.parseFeed(feed, (tweets) => {
          res.send(tweets);
        });
      });
    } else {
      utils.requestRecentFeed(userId, count, (feed) => {
        utils.parseFeed(feed, (tweets) => {
          res.send(tweets);
        });
      });
    }
  });
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}!`));

module.exports = app;
