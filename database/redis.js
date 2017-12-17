const redis = require('redis');

const client = redis.createClient();

client.select(2, () => { 

  client.on('error', (err) => {
    console.log('Error ' + err);
  });

  client.quit();

}); 