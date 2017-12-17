const redis = require('redis-stream');
const client = new redis(6379, '127.0.0.1');

const fakeUser = require('./tweetGeneratorHelper.js').fakeUser;

let user, prop, command;

let stream = client.stream();
for (let x = 0; x < 2000000; x++) {
  user = fakeUser();
  user.id = x;

  command = ['hmset', `users:${x}`];
  for (prop in user) {
    command.push(prop, user[prop]);
  }
  stream.redis.write(redis.parse(command));
  if (x % 10000 === 0) {
    console.log(x);
  }
}
stream.on('close', () => {
  console.log('loading users');
});
stream.end();