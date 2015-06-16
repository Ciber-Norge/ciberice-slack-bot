const co = require('co');
const api = require('./api');
const textTable = require('text-table');

module.exports = co.wrap(function* getStatus(user, parameter){
  const result = yield api.favorites(user);

  console.log(result);
  if(result.length){
    return result.map(x => `${x.Name} (${x.Quantity})`).join('\n');
  }else{
    return "Du liker ikke is!"
  }
});
