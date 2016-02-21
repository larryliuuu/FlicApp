var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');


app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});
app.get('/one-click', function (req, res) {
  io.emit('one-click', 'hi');
  res.send('success');
});


app.get('/double-click', function (req, res) {
  io.emit('double-click', 'hi');
  res.send('success');
});


app.get('/hold', function (req, res) {
  io.emit('hold', 'hi');
  res.send('success');
});


io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

http.listen(app.get('port'), function(){
  console.log('listening on *:5000');
});


mongoose.connect('mongodb://waiterqueue:waiterqueue@ds013738.mongolab.com:13738/heroku_txdrn6vx');
