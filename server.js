var express = require('express');
var Slack = require('node-slack');
var bodyParser = require('body-parser');
var request = require('request');
var textTable = require('text-table');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var slack = new Slack(process.env['SLACK_HOST'], process.env['SLACK_TOKEN']);

var tasks = {
  'status': getStatus,
  'associate': associateUser,
  'buy': buy
}

app.post('/api', function(req, res){
  var words = req.body.text.split(' ');
  var trigger = words.shift();
  var keyword = words.shift();
  
  if(keyword in tasks){
    tasks[keyword](words, function(err, result) {
      res.json(slack.respond(req.body, function(hook) {
        return {
          username: 'isbot',
          text: result
        };
      }));
    });
  }else{
    console.log("unknown keyword");
    res.json(slack.respond(req.body, function(hook) {
        return {
          username: 'isbot',
          text: 'whut?'
        };
      }));
  }
});

function getStatus(_, callback){
  request(process.env['ICE_API']+'/api/IceCream', function(err, response, body){
    var result = JSON.parse(body);
    
    var list = result.filter(function(entry){
      return entry.Quantity > 0;
    }).sort(function(a, b){
      return a.Title.localeCompare(b.Title);
    }).map(function(entry){
      return [entry.Title, entry.Price + ' kroner', '(' + entry.Quantity + ')'];
    });
    
    var table = textTable(list, {align:['l', 'r', 'l']});
    
    callback(null, "```"+table+"```");
  });
}

function associateUser(params, callback){
  callback(null, "not implemented");
}

function buy(params, callback){
  console.log("buying", params);
  request.post({
    url: process.env['ICE_API']+'/api/buy', 
    form: {
      iceCreamId: params[0],
      buyer: params[1]
    }
  }, function(err, response, body){
    if(err) return callback(err);
    
    var result = JSON.parse(body);
    console.log("bought", result);
    if(result.success){
      callback(null, "Kos deg med isen");
    }else{
      callback(null, result.errorMessage);
    }
  });
}

app.listen(8080);
console.log("listening on port 8080");
