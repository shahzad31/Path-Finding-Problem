
var express = require('express');
var utilities = require('./serverUtility');
var app= express();
app.use(express.static(__dirname + '/'));
var bodyParser = require('body-parser');
var multer = require('multer'); 

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(multer()); 
var port = 8080;
var server=app.listen(port, function() {
	var host = server.address().address;
	var port = server.address().port;
	console.log('server listening on port ' + port+host);
});
app.post('/getPath', function (req, res) {
	console.log("Got request on node to calculate path");
	var path=req.body.path;
	var robotPos=req.body.robotPos;
    path=utilities.sortDistanceWise(robotPos,path);
	var tPath=utilities.calculateThePath(path);
	console.log("Sending Response Back");
	res.json(tPath);
});