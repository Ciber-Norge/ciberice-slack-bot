const co = require('co');
const find = require('./findIce');
const buy = require('./buy');

module.exports = co.wrap(function*(user, name){
  try{
    const found = yield find(name);
    
    if(found.Quantity == 0){
      throw "Å nei, det er ikke flere "+found.Title+" igjen!";
    }
    
    const result = yield buy(found.Id, user);
    
    const comment = result.quantity ? "nå er det bare "+result.quantity+" igjen!" : "du tok den siste isen!";
    return "Kos deg med "+found.Title+" ("+comment+")";
  }catch(error){
    return error;
  }
});