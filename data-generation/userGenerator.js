const jsonfile = require('jsonfile');
const fs = require('fs');

const fakeUser = require('./userGeneratorHelper.js').fakeUser;

const file = __dirname + '/userSeedFinal.txt';

let user, prop, command;

// this runs a loop to generate 2000000 users
for (let x = 0; x < 2000000; x++) {
  user = fakeUser();
  user.id = x;

  command = `HMSET users:${x} `;
  for (prop in user) {
    command += `${prop} \"${user[prop]}\" `;
  }
  command += '\n';
  fs.appendFileSync(file, command, (err) => {
    err && console.error(err);
  });
  if (x % 10000 === 0) {
    console.log(x);
  }
}

// this creates a set to inventory all users
command = 'SADD users ';
for (x = 0; x < 2000000; x++) {
  command += `${x} `;
  if (x % 10000 === 0) {
    console.log(x);
  }
}
command += '\n';

fs.appendFileSync(file, command, (err) => {
  err && console.error(err);
});

console.log('Done!');



