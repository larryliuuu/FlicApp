var express = require('express');
var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/one-click', function (req, res) {
  io.emit('one-click', tableID);
});


app.get('/double-click', function (req, res) {
  io.emit('double-click', tableID);
});


app.get('/hold', function (req, res) {
  io.emit('hold', tableID);
});

app.get('/', function(request, response) {
  response.render('pages/index');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
