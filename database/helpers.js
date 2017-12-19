const client = require('./cassandra.js');

module.exports = {
  getTweets: (tweetIds) => {
    const params = '(' + tweetIds.join(', ') + ')';
    const query = `SELECT text FROM tweets WHERE id in ${params}`;

    client.execute(query)
      .then(result => console.log(result.rows))
      .catch(err => console.log(err));
  }
};
