const co = require('co');
const api = require('./api');
const textTable = require('text-table');

module.exports = co.wrap(function* getStatus(user, parameter){
  const result = yield api.list();
  
  const list = result.filter(function(entry){
    return parameter || entry.Quantity > 0;
  }).sort(function(a, b){
    return a.Title.localeCompare(b.Title);
  }).map(function(entry){
    return [entry.Title, entry.Price + ' kroner', '(' + entry.Quantity + ')'];
  });
  
  const table = textTable(list, {align:['l', 'r', 'l']});
  
  return "```"+table+"```";
});