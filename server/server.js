const socketIO = require('socket.io');
const path = require('path');
const express = require('express');
const http = require('http');
const time = require('../playground/time.js');
var app = express();
const publicpath = path.join(__dirname , '..' , '/public');
const {generateMessage, generateLocationMessage} = require('./utils/message.js');
const {isRealString} = require('./utils/validation.js');
const {Users} = require('./utils/users.js')
var server = http.createServer(app);
var io = socketIO(server);


var users = new Users();

io.on('connection',(socket) => {
	console.log('new user is connected');


	socket.on('disconnect',() => {
		var user = users.removeUser(socket.id);

		if(user)
		{
			io.to(user.room).emit('updateuserList' , users.getUserList(user.room));
			io.to(user.room).emit('servermessage' , generateMessage('Admin' ,`${user.name} has left`));
		}
	});
	// socket.emit('newEmail', {
	// 	from:'urvashi@gmail.com',
	// 	text : 'my email address',
	// 	createdAt:123
	// });

	socket.on('createdEmail', function(emaildata) {
		console.log('emaildata' , emaildata);
	});

	socket.on('join',(param,callback) => {

		if(!isRealString(param.name) || !isRealString(param.room))
		{
			return callback('Name and room name is required');
		}

		socket.join(param.room);
		users.removeUser(socket.id);
		users.addUsers(socket.id , param.name , param.room);
		io.to(param.room).emit('updateuserList' , users.getUserList(param.room));
		socket.emit('servermessage' , generateMessage("Admin" , "Welcome to chat App"));
		socket.broadcast.to(param.room).emit('servermessage',generateMessage('Admin' , `${param.name} has joined`));
		callback();
	});




	socket.on('createlocationmessage' , (coords) => {

	var user = users.getUser(socket.id);

		if(user)
		{
			io.to(user.room).emit('newlocationmessage' , generateLocationMessage(user.name , `${coords.latitude}, ${coords.longitude}`));
		}
	
});


	

	socket.on('clientmsg', function(msg, callback) {
		var user = users.getUser(socket.id);

		if(user && isRealString(msg.msg))
		{
			io.to(user.room).emit('servermessage' , generateMessage(user.name,msg.msg));
		}
		
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