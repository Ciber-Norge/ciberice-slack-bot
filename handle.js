'use strict';

const co = require('co');

const tasks = {
  'status': require('./getStatus'),
  'jeg er': require('./registerUser'),
  'kjøp': require('./buyIceByName'),
  'hjelp': require('./help'),
  'vi trenger mer sandwich is': ()  => 'http://big.assets.huffingtonpost.com/IceCreamSandwichesMade.gif',
  'hva liker jeg': require('./whatDoILike'),
  'badges': require('./badges'),
  'mine badges': require('./myBadges'),
  'hvordan har du det?': () => module.exports.mood, 
  'hvem er sjefen?': () => `${module.exports.boss} har ansvar for meg!`,
  'det er tomt for': (_, product, complainer) => `${module.exports.boss}: ${complainer} sier det er tomt for ${product}!\nDu må kjøpe mer ${product}!`
};

module.exports = co.wrap(function*(body){
  const words = body.text.split(' ');
  const trigger = words.shift();
  const sentence = words.join(' ');
  const keyword = findTask(sentence.toLowerCase());
  const param = sentence.substr((keyword || '').length).trim();

  console.log('task', sentence, ':', keyword, '-', param);

  if(keyword){
    return tasks[keyword](body.user_id, param, body.user_name);
  }else{
    return 'whut?\nprøv `isbot hjelp`, n00b';
  }
});

module.exports.mood = 'jeg er glad i is!';
module.exports.boss = 'ingen';

function findTask(sentence){
  const keywords = Object.keys(tasks);

  return keywords.filter(function(keyword){
    return sentence.indexOf(keyword) === 0;
  })[0];
}
