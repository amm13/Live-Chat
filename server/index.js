var express = require("express");
var app = express();
var server = require("http").Server(app);
var io = require("socket.io")(server);

app.use(express.static("client"));

var messages = [{
	text:"welcome to this chat",
	nickname:"Alberto Marquez"
}];


io.on("connection" , function(socket){
	console.log("The node with IP: " + socket.handshake.address + " has been connected...");
	// emit default message at connected
	socket.emit("messages" , messages);

	socket.on("add-message" , function(data){
		messages.push(data);
		io.sockets.emit("messages" , messages);
	});

});

server.listen("8080" , function(){
	console.log("server running in http://192.168.1.39:8080");
});