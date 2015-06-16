const co = require('co');
const api = require('./api');

module.exports = co.wrap(function* getStatus(user, parameter){
  const result = yield api.badges();
  return ['Tilgjengelige badges']
  .concat(result.map(badge => '`' + badge + '`'))
  .join('\n');
});
