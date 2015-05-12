const co = require('co');

const tasks = {
  'status': require('./getStatus'),
  'jeg er': require('./registerUser'),
  'kjøp': require('./buyIceByName'),
  'hjelp': require('./help')
};

module.exports = co.wrap(function*(body){
  const words = body.text.split(' ');
  const trigger = words.shift();
  const sentence = words.join(' ');
  const keyword = findTask(sentence);
  const param = sentence.substr((keyword || '').length).trim();

  console.log('task', sentence, ':', keyword, '-', param);

  if(keyword){
    return tasks[keyword](body.user_id, param, body.user_name);
  }else{
    return 'whut?\nprøv `isbot hjelp`, n00b';
  }
});

function findTask(sentence){
  const keywords = Object.keys(tasks);
  
  return keywords.filter(function(keyword){
    return sentence.indexOf(keyword) === 0;
  })[0];
}
