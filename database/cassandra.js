const cassandra = require('cassandra-driver');
const client = new cassandra.Client({ contactPoints: ['host1'] });
client.connect(function (err) {
  assert.ifError(err);
});