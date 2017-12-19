const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3000;

const helpers = require('./helpers.js');

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
  helpers.sendEvent('engagement', req.path, req.body);
  res.status(201).send();
});

app.post('/tweets', (req, res) => {
  helpers.sendEvent('tweets', '/tweets', req.body);
  res.status(201).send();
});

app.listen(port, () => console.log(`App listening at http://localhost:${port}!`));

module.exports = app;