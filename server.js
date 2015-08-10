var express = require('express');
var Slack = require('node-slack');
var bodyParser = require('body-parser');
var handle = require('./handle');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));

var slack = new Slack(process.env['SLACK_HOST'], process.env['SLACK_TOKEN']);

app.get('/', function(req, res){
  res.end("ciberice-slack-bot success");
});


app.get('/mood', function(req, res){
  handle.mood(req.params.mood);
  res.end("OK!");
});

app.post('/api', function(req, res){  
  handle(req.body).then(function(result) {
    res.json(respond(req.body, result));
  }).catch(function(error){
    console.error(error.stack || error);
    res.json(respond(req.body, 'Noe har gått veldig galt!\nhttp://i.imgur.com/5Gj2YdJ.gif'))
  });
});

function respond(body, text){
  return slack.respond(body, function(hook) {
    return {
      username: 'isbot',
      text: text
    };
  })
}

app.listen(8080);
console.log("listening on port 8080");
