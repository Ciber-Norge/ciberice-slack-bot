const co = require('co');
const find = require('./findIce');
const buy = require('./buy');

module.exports = co.wrap(function*(user, name, slack){
  if(slack.channel_name != 'isbot'){
    return ":rage: Du kan bare kjøpe is i #isbot "+slack.user_name;
  }
  
  try{
    const found = yield find(name);
    
    if(found.Quantity == 0){
      throw "Å nei, det er ikke flere "+found.Title+" igjen!";
    }
    
    const result = yield buy(found.Id, user);
    
    const comment = result.quantity ? "nå er det bare "+result.quantity+" igjen!" : "du tok den siste isen!";
    const badgesComment = result.newBadges && result.newBadges.length ? 
                            "\nGratulerer med badge!\n" + result.newBadges.join("\n") :
                            "";
    return "Kos deg med "+found.Title+" ("+comment+")" + badgesComment;
  }catch(error){
    return error;
  }
});
