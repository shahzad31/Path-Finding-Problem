
var express = require('express');
 
var app= express();
app.use(express.static(__dirname + '/'));
 
var port = 8080;
var server=app.listen(port, function() {
	 var host = server.address().address;
   var port = server.address().port;
    console.log('server listening on port ' + port+host);
});
app.get('/process', function (req, res) {
  res.send('Hello World!');
  console.log("Got Request");
});

// accept POST request on the homepage
app.post('/', function (req, res) {
  res.send('Got a POST request');
  console.log("Got Request");
});

// accept PUT request at /user
app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

// accept DELETE request at /user
app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});