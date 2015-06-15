const co = require('co');
const api = require('./api');

module.exports = co.wrap(function* getStatus(user, parameter){
  console.log("hello?")
  try{
    const result = yield api.badges();
    var badgesMessage = ['Tilgjengelige badges'].concat(result.map(function(badge){
      return '`' + badge + '`';
    })).join('\n');
    return badgesMessage;
  } catch (e){
    console.log(e)
  }
});
