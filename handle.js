var co = require('co');

var tasks = {
  'status': require('./getStatus'),
  'jeg er': require('./registerUser'),
  'kjøp': require('./buyIceByName'),
  'hjelp': require('./help')
};

module.exports = co.wrap(function*(body){
  var words = body.text.split(' ');
  var trigger = words.shift();
  var param = words.pop();
  var keyword = words.length ? words.join(' ') : param;
  if(keyword in tasks){
    return tasks[keyword](body.user_id, param, body.user_name);
  }else{
    return 'whut?\nprøv `isbot hjelp`, n00b';
  }
});