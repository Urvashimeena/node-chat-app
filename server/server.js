const socketIO = require('socket.io');
const path = require('path');
const express = require('express');
const http = require('http');
var app = express();
const publicpath = path.join(__dirname , '..' , '/public');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection',(socket) => {
	console.log('new user is connected');

	socket.on('disconnect',() => {
	console.log('user is disconnected');
});
	// socket.emit('newEmail', {
	// 	from:'urvashi@gmail.com',
	// 	text : 'my email address',
	// 	createdAt:123
	// });

	socket.on('createdEmail', function(emaildata) {
		console.log('emaildata' , emaildata);
	});

	// socket.emit('Adminmessage' , {
	// 	from:'Admin',
	// 	text:'Welcome to chat App',
	// 	createdAt : new Date().getTime()
	// });


	socket.emit('servermessage' , generateMessage("Admin" , "Welcome to chat App"));

	socket.on('createlocationmessage' , (coords) => {
	io.emit('newlocationmessage' , generateLocationMessage('Admin' , `${coords.latitude}, ${coords.longitude}`));
});


	socket.broadcast.emit('servermessage',generateMessage('Admin' , 'New User is connected'));

	socket.on('clientmsg', function(msg, callback) {
		console.log('Client messgae' , msg);

		io.emit('servermessage' , generateMessage(msg.from,msg.msg));
		callback();
		// socket.broadcast.emit('servermessage', {
		// 	from:msg.from,
		// 	text:msg.msg
		// });
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