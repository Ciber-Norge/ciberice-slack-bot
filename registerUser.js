const co = require('co');
const api = require('./api');

module.exports = co.wrap(function*(slackId, employeeId, slack){
  try{
    const result = yield api.register(slackId, employeeId);
    
    if(result.success){
      return "Aha, jeg veit hvem du er "+slack.user_name+"!";
    }else{
      throw "oops";
    }
  }catch(error){
    return "Oops, det gikk ikke";
  }
});
