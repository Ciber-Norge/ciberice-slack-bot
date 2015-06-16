const co = require('co');
const api = require('./api');

module.exports = co.wrap(function*(user, parameter){
  const result = yield api.myBadges(user);
  const title = result.length === 0 ? 'Ingen badges? Step it up!'
                : result.length > 3 ? result.length + ' badges. isbot er stolt.'
                : 'Du har ' + result.length + (result.length === 1 ? ' badge' : ' badges');
  var badgesMessage = [title].concat(result.map(function(badge){
    return '`' + badge + '`';
  })).join('\n');
  return badgesMessage;
});
