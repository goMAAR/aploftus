const moment = require('moment');
const dbHelp = require('../database/helpers.js');

module.exports = {
  sendEvent: (service, route, body) => {
    if (service === 'engagement') {
      body.created_at = moment().format('ddd MMM D hh:mm:ss ZZ YYYY');
      // console.log('sent information to User Engagement Analysis route', route);
    }
  },
  serveFeed: (tweetIds) => {
    dbHelp.getTweets(tweetIds);
  }
};
