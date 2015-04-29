const request = require('request-promise');
const co = require('co');

module.exports = {
  list: co.wrap(function*(name){
    return JSON.parse(yield request(process.env['ICE_API']+'/api/IceCream?includeAll=true'));
  }),
  buy: co.wrap(function*(id, user){
    return JSON.parse(yield request.post({
      url: process.env['ICE_API']+'/api/buy', 
      form: {
        iceCreamId: id,
        slackId: user
      }
    }));
  }),
  register: co.wrap(function*(slackId, id){
    return JSON.parse(yield request.post({
      url: process.env['ICE_API']+'/api/registerSlackUser?slackId='+slackId+'&employeeId='+id
    }));
  })
};