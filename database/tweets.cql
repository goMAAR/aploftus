CREATE TABLE tweets
  (text text,
    truncated boolean,
    created_at text,
    reply_count int,
    favorite_count int,
    retweet_count int,
    in_reply_to_user_id int,
    in_reply_to_screen_name text,
    in_reply_to_status_id int,
    possibly_sensitive boolean,
    source text,
    user_id int,
    id int,
    PRIMARY KEY(id, user_id)
  );

copy tweetly.tweets (text, truncated, created_at, reply_count, favorite_count, retweet_count, in_reply_to_user_id, in_reply_to_screen_name, in_reply_to_status_id, possibly_sensitive, source, user_id, id) from 'tweetSeed2.csv';
