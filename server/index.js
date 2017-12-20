const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const utils = require('./utils.js');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', (req, res) => res.send('Hello World!'));

const engagementPaths = [
  '/favorite/create',
  '/favorite/destroy',
  '/follow/create',
  '/follow/destroy'
];

app.post(engagementPaths, (req, res) => {
  utils.sendEvent('engagement', req.path, req.body);
  res.status(201).send();
});

app.post('/tweets', (req, res) => {
  utils.sendEvent('tweets', '/tweets', req.body);
  res.status(201).send();
});

app.get('/feed', (req, res) => {
  let userId = req.query.user_id;
  let count = req.query.count;

  utils.userAccessedInLast10Min(userId, (bool) => {
    if (bool === true) {
      utils.getFeedList(userId, count, (feed) => {
        console.log('inside get feed callback');
        utils.parseFeed(feed, (tweets) => {
          console.log('ready to send tweets ', tweets);
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