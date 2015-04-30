const api = require('./api');
const co = require('co');

module.exports = co.wrap(function *(name){
  const result = yield api.list();
  
  const found = result.filter(function(entry){
    return entry.Title.toLowerCase().indexOf(name.toLowerCase()) >= 0;
  });
  
  if(found.length == 1){
    return found[0];
  }else if(found.length == 0){
    throw "Hæ? Den isen har jeg aldri hørt om!";
  }else{
    const exactMatch = find(found, name);
    if(exactMatch){
      return exactMatch;
    }else{
      throw "Fant "+found.length+" is, hvilken mente du?\n"+found.map(function(e){ return e.Title; }).join('\n');
    }
  }
});

function find(list, name){
  return list.filter(function(entry){
    return entry.Title === name;
  })[0];
}