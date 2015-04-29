const co = require('co');
const api = require('./api');

module.exports = co.wrap(function*(slackId, employeeId, slackName){
  try{
    const result = yield api.register(slackId, employeeId);
    
    if(result.success){
      return "Aha, jeg veit hvem du er "+slackName+"!";
    }else{
      throw "oops";
    }
  }catch(error){
    return "Oops, det gikk ikke";
  }
});