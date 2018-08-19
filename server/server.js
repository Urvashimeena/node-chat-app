const socketIO = require('socket.io');
const path = require('path');
const express = require('express');
const http = require('http');
var app = express();
const publicpath = path.join(__dirname , '..' , '/public');


var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
	console.log('new user is connected');

	socket.on('disconnect',() => {
	console.log('user is disconnected');
});
	socket.emit('newEmail', {
		from:'urvashi@gmail.com',
		text : 'my email address',
		createdAt:123
	});

	socket.on('createdEmail', function(emaildata) {
		console.log('emaildata' , emaildata);
	});

	socket.on('clientmsg', function(msg) {
		console.log('Client messgae' , msg);

		io.emit('servermessage' , {
			from : msg.from,
			text : msg.msg
			});
	});

	// socket.emit('servermessage' , {
	// 	from: 'server',
	// 	messgae: 'hello'
	// });
});



const port = process.env.PORT || 3000;

app.use(express.static(publicpath));
server.listen(port ,()=>{
	console.log("Server started");
});