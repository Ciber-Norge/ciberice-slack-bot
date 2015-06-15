const co = require('co');
const api = require('./api');
const textTable = require('text-table');

module.exports = co.wrap(function* getStatus(user, parameter){
  const result = yield api.favorites(user);
  
  console.log(result);
  
  return "Vet du ikke det selv?";
});
