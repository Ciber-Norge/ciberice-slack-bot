const request = require('request-promise');
const co = require('co');

module.exports = {
  list: co.wrap(function*(){
    return JSON.parse(yield request(process.env['ICE_API']+'/api/IceCream?includeAll=true'));
  }),
  buy: co.wrap(function*(id, slackId){
    return JSON.parse(yield request.post({
      url: process.env['ICE_API']+'/api/buy',
      form: {
        iceCreamId: id,
        slackId: slackId
      }
    }));
  }),
  register: co.wrap(function*(slackId, id){
    return JSON.parse(yield request.post({
      url: process.env['ICE_API']+'/api/registerSlackUser?slackId='+slackId+'&employeeId='+id
    }));
  }),
  favorites: co.wrap(function*(slackId){
    return JSON.parse(yield request(process.env['ICE_API']+'/api/favourites?slackId='+slackId));
  }),
  badges: co.wrap(function*(){
    return JSON.parse(yield request(process.env['ICE_API']+'/api/badges'));
  }),
  myBadges: co.wrap(function*(slackId){
    return JSON.parse(yield request(process.env['ICE_API']+'/api/badge?slackId='+slackId))
  })
};
