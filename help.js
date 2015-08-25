const co = require('co');

module.exports = co.wrap(function*(name, user){
  return [
    'Hei på deg, har du lyst på is?',
    '`isbot status` se liste over is',
    '`isbot jeg er <ansattnummer>` registrer deg så du kan kjøpe is',
    '`isbot kjøp <navn på is>` kjøp en is',
    '`isbot badges` list tilgjengelige badges',
    '`isbot mine badges` se hvilke badges du har',
    '`isbot hva liker jeg?` se hvilken is du liker best',
    '`isbot hvordan har du det?` så hyggelig at du spør!',
    '`isbot det er tomt for <is>` si ifra til sjefen at det er tomt for en is'
  ].join('\n');
});
