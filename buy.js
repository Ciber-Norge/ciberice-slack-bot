const api = require('./api');
const co = require('co');

module.exports = co.wrap(function *(id, user){
  try{
    const result = yield api.buy(id, user);
    if(result.success){
      return result;
    }else{
      console.error(result.errorMessage);
      throw "oops, noe gikk veldig galt";
    }
  }catch(error){
    throw "Hmm, har du husket å registrere deg?\nprøv `isbot jeg er <ansattnummer>`";
  }
});