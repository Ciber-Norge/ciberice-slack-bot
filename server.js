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

app.post('/mood', function(req, res){
  handle.mood = req.body.mood;
  console.log('set mood to', req.body.mood);
  res.redirect('/mood');
});

app.get('/mood', function(req, res){
  res.header("Content-Type", "text/html; charset=utf-8");
  res.end(`
<!doctype html>
<form method="POST" action="/mood">
  <input name="mood" value="${handle.mood}">
  <button type="submit">OK</button>
</form>
  `);
});

app.post('/boss', function(req, res){
  handle.boss = req.body.boss;
  console.log('set boss to', req.body.boss);
  res.redirect('/boss');
});

app.get('/boss', function(req, res){
  res.header("Content-Type", "text/html; charset=utf-8");
  res.end(`
<!doctype html>
<form method="POST" action="/boss">
  <input name="boss" value="${handle.boss}">
  <button type="submit">OK</button>
</form>
  `);
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
