CREATE TABLE tweetly.feeds
  (user_id int,
    feed list<text>,
    PRIMARY KEY(user_id)
  );

copy tweetly.feeds (user_id, feed) from 'feedSeed.csv';