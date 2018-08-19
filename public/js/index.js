var socket = io();

	socket.on('connect' , () => {
	console.log('connected to server');
	});
	socket.on('disconnect' , () => {
	console.log('disconnected to server');
	});

	socket.on('newEmail', function(email) {
		console.log('new Email' ,email);
	});

	socket.emit('createdEmail', {
		to:'urvashi1998@gmail.com',
		text : 'my email address',
		createdAt:223
	});

	socket.on( 'servermessage' , function(message) {
		console.log('new message from server' , message);
	});

	socket.emit('clientmsg' , {
		from: 'client',
		msg : "hii"
	});