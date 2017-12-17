const fs = require('fs');

const fakeUser = require('./userGeneratorHelper.js').fakeUser;

const file = __dirname + './seed/userSeed.csv';

let user, prop, command;

// var stream = fs.createWriteStream(file, {'flags': 'a', 'encoding': null, 'mode': 0666});
console.log('\x1b[0m' + 'start');
stream.once('open', (fd) => {

  // this runs a loop to generate 500000 users
  for (let x = 0; x < 500000; x++) {
    user = fakeUser();
    user.id = x;

    command = [];
    for (prop in user) {
      command.push(user[prop].toString());
    }
    stream.write(command.join(', ') + '\n');

    if (x % 100000 === 0) {
      console.log(x);
    }
  }
  stream.end();
  console.log('Done!');
});
