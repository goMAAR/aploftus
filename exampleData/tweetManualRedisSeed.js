const redis = require('redis');

const client = redis.createClient();

client.select(3, () => { 

  client.on('error', (err) => {
    console.log('Error ' + err);
  });

  let tweetInAnneFeed = 'anne:feed:240556426106372096';
  let tweetEntities = 'anne:feed:240556426106372096:entities';
  let tweetUser = 'anne:feed:240556426106372096:user';

  client.lpush('anne:feed', tweetId);
  client.hset(tweetInAnneFeed, 'id', '240556426106372096');
  client.hset(tweetInAnneFeed, 'text', 'lecturing at the \"analyzing big data with twitter\" class at @cal with @othman  http://t.co/bfj7zkDJ');
  client.hset(tweetInAnneFeed, 'truncated', 'false');
  client.hset(tweetInAnneFeed, 'created_at', 'Tue Aug 28 21:08:15 +0000 2012');
  client.hset(tweetInAnneFeed, 'reply_count', '0');
  client.hset(tweetInAnneFeed, 'favorite_count', '0');
  client.hset(tweetInAnneFeed, 'favorited', 'false');
  client.hset(tweetInAnneFeed, 'retweet_count', '0');
  client.hset(tweetInAnneFeed, 'retweeted', 'false');
  client.hset(tweetInAnneFeed, 'in_reply_to_user_id', 'null');
  client.hset(tweetInAnneFeed, 'in_reply_to_screen_name', 'null');
  client.hset(tweetInAnneFeed, 'in_reply_to_status_id', 'null');
  client.hset(tweetInAnneFeed, 'possibly_sensitive', 'false');
  client.hset(tweetInAnneFeed, 'source', 'Safari on iOS');

  client.hset(tweetUser, 'id', '8285392');
  client.hset(tweetUser, 'screen_name', 'raffi');
  client.hset(tweetUser, 'name', 'Raffi Krikorian');
  client.hset(tweetUser, 'description', 'Director of @twittereng\'s Platform Services. I break things.');
  client.hset(tweetUser, 'profile_sidebar_fill_color', 'DDEEF6');
  client.hset(tweetUser, 'profile_sidebar_border_color', 'C0DEED');
  client.hset(tweetUser, 'profile_background_color', 'C0DEED');
  client.hset(tweetUser, 'profile_background_tile', 'false');
  client.hset(tweetUser, 'profile_background_image_url', 'http://a0.twimg.com/images/themes/theme1/bg.png');
  client.hset(tweetUser, 'profile_background_image_url_https', 'https://si0.twimg.com/images/themes/theme1/bg.png');
  client.hset(tweetUser, 'profile_use_background_image', 'true');
  client.hset(tweetUser, 'profile_image_url', 'http://a0.twimg.com/profile_images/1270234259/raffi-headshot-casual_normal.png');
  client.hset(tweetUser, 'profile_image_url_https', 'https://si0.twimg.com/profile_images/1270234259/raffi-headshot-casual_normal.png');
  client.hset(tweetUser, 'default_profile_image', 'false');
  client.hset(tweetUser, 'profile_link_color', '0084B4');
  client.hset(tweetUser, 'profile_text_color', '333333');
  client.hset(tweetUser, 'created_at', 'Sun Aug 19 14:24:06 +0000 2007');
  client.hset(tweetUser, 'location', 'San Francisco, California');
  client.hset(tweetUser, 'default_profile', 'true');
  client.hset(tweetUser, 'url', 'http://t.co/eNmnM6q');
  client.hset(tweetUser, 'contributors_enabled', 'false');
  client.hset(tweetUser, 'favorites_count', '724');
  client.hset(tweetUser, 'statuses_count', '5007');
  client.hset(tweetUser, 'friends_count', '701');
  client.hset(tweetUser, 'followers_count', '18752');
  client.hset(tweetUser, 'listed_count', '619');
  client.hset(tweetUser, 'time_zone', 'Pacific Time (US & Canada)');
  client.hset(tweetUser, 'utc_offset', '-28800');
  client.hset(tweetUser, 'lang', 'en');
  client.hset(tweetUser, 'protected', 'false');
  client.hset(tweetUser, 'verified', 'false');
  client.hset(tweetUser, 'following', 'true');

  client.quit();

});
