const co = require('co');

module.exports = co.wrap(function*(name, user){
  return [
    'Hei på deg, har du lyst på is?',
    '`isbot status` se liste over is',
    '`isbot jeg er <ansattnummer>` registrer deg så du kan kjøpe is',
    '`isbot kjøp <navn på is>` kjøp en is',
    '`isbot badges` list tilgjengelige badges',
    '`isbot mine badges` se hvilke badges du har'
  ].join('\n');
});
