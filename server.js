var express = require('express');
var Slack = require('node-slack');
var bodyParser = require('body-parser');
var request = require('request');
var textTable = require('text-table');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var slack = new Slack(process.env['SLACK_HOST'], process.env['SLACK_TOKEN']);

app.post('/api', function(req, res){
  getStatus(function(err, result) {
    res.json(slack.respond(req.body, function(hook) {
      return {
        username: 'isbot',
        text: result
      };
    }));
  });
});

function getStatus(callback){
  request(process.env['ICE_API'], function(err, response, body){
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
};

app.listen(8080);
