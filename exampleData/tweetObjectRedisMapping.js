// user:feed = sorted set of tweet objs
// user:feed:tweet1 = nested object
// user:feed:tweet1:id = a long num
// user:feed:tweet1:id_str = str of ints matching id
// user:feed:tweet1:text = phrase no longer than 140 chars
// user:feed:tweet1:truncated = bool
// user:feed:tweet1:created_at = datetime (spec formatting)
// user:feed:tweet1:reply_count
// user:feed:tweet1:favorite_count
// user:feed:tweet1:favorited = bool
// user:feed:tweet1:retweet_count
// user:feed:tweet1:retweeted
// user:feed:tweet1:in_reply_to_user_id = ints matching a users id (or null)
// user:feed:tweet1:in_reply_to_user_id_str = str of ints matching id from above (or null)
// user:feed:tweet1:in_reply_to_screen_name = word (or null)
// user:feed:tweet1:in_reply_to_status_id  (or null)
// user:feed:tweet1:in_reply_to_status_id_str  (or null)
// user:feed:tweet1:possibly_sensitive = bool
// user:feed:tweet1:source = phrase from select few (twitter for mac, ios, etc)

// user:feed:tweet1:user = nested obj
// user:feed:tweet1:user:id = int
// user:feed:tweet1:user:id_str
// user:feed:tweet1:user:screen_name = word
// user:feed:tweet1:user:name = string, their "real name", not their handle. capped at 20 chars
// user:feed:tweet1:user:description = phrase
// user:feed:tweet1:user:profile_sidebar_fill_color = hexadecimal
// user:feed:tweet1:user:profile_sidebar_border_color = hexadecimal
// user:feed:tweet1:user:profile_background_color = hexadecimal
// user:feed:tweet1:user:profile_background_tile = bool
// user:feed:tweet1:user:profile_background_image_url = url of image with http
// user:feed:tweet1:user:profile_background_image_url_https = url of image with https
// user:feed:tweet1:user:profile_use_background_image = bool
// user:feed:tweet1:user:profile_image_url = url of image with http
// user:feed:tweet1:user:profile_image_url_https = url of image with https
// user:feed:tweet1:user:default_profile_image = bool, false if above is not null
// user:feed:tweet1:user:profile_text_color
// user:feed:tweet1:user:profile_link_color
// user:feed:tweet1:user:created_at = timestamp, see special formatting
// user:feed:tweet1:user:location = city, state
// user:feed:tweet1:user:is_translater = bool
// user:feed:tweet1:user:default_profile = bool, usually true
// user:feed:tweet1:user:url = profile url, shortened
// user:feed:tweet1:user:contributors_enabled = bool, usually false
// user:feed:tweet1:user:favorites_count = int
// user:feed:tweet1:user:statuses_count = int
// user:feed:tweet1:user:friends_count = int
// user:feed:tweet1:user:followers_count = int
// user:feed:tweet1:user:listed_count = int
// user:feed:tweet1:user:time_zone = string (example: 'Pacific Time (US & Canada)')
// user:feed:tweet1:user:utc_offset = offset in SECONDS from gmt. corresponds to timezone
// user:feed:tweet1:user:lang = BCP-47 code, default "en"
// user:feed:tweet1:user:protected = bool, default false
// user:feed:tweet1:user:verified = bool, usually false unless a celeb
// user:feed:tweet1:user:following = bool, used to build the network


// ENTITIES HAS BEEN DEPRECATED FROM TWITTER API, NO LONGER IN USE

// user:feed:tweet1:entities = nested obj
// user:feed:tweet1:entities:urls = list of objs
// user:feed:tweet1:entities:urls:1:expanded_url = a full url
// user:feed:tweet1:entities:urls:1:url = a shortened url
// user:feed:tweet1:entities:urls:1:indices = two nums, second larger than 1st, both < 140
// user:feed:tweet1:entities:urls:1:display_url = expanded url minus the http
// user:feed:tweet1:entities:hashtags = list of words
// user:feed:tweet1:entities:user_mentions = list of objs
// user:feed:tweet1:entities:user_mentions:1:name = a screename
// user:feed:tweet1:entities:user_mentions:1:id_str = user's id as string
// user:feed:tweet1:entities:user_mentions:1:id = user's id num
// user:feed:tweet1:entities:user_mentions:1:indices = two nums, second larger than 1st, both < 140
// user:feed:tweet1:entities:user_mentions:1:screen_name = a word

// user:feed:tweet1:user:entities = nested obj
// user:feed:tweet1:user:entities:url = nested obj
// user:feed:tweet1:user:entities:url:urls = list
// user:feed:tweet1:user:entities:url:urls:1:expanded_url = a full url
// user:feed:tweet1:user:entities:url:urls:1:url = a shortened url
// user:feed:tweet1:user:entities:url:urls:1:indices = two nums, second larger than 1st, both < 140
// user:feed:tweet1:user:entities:url:urls:1:display_url = expanded url minus the http
// user:feed:tweet1:user:entities:description = nested obj
// user:feed:tweet1:user:entities:description:urls = list of url objs in the description field of the profile. often not filled



