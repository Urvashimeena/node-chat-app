var socket = io();

	socket.on('connect' , () => {
	console.log('connected to server');
	});
	socket.on('disconnect' , () => {
	console.log('disconnected to server');
	});

	// socket.on('newEmail', function(email) {
	// 	console.log('new Email' ,email);
	// });

	// socket.emit('createdEmail', {
	// 	to:'urvashi1998@gmail.com',
	// 	text : 'my email address',
	// });

	socket.on( 'servermessage' , function(message) {
		console.log('new message from server' , message);
		var li = jQuery('<li></li>')
		li.text(`${message.from}: ${message.text}`);
		jQuery('#messages').append(li);
	});

	// socket.on( 'Adminmessage' , function(message) {
	// 	console.log('Admin' , message);
		
	// });
	

	jQuery('#message-form').on('submit',function(e) {
		e.preventDefault();

		socket.emit('clientmsg' , {
		from: 'User',
		msg : jQuery('[name = message]').val()
		}, function () {
			
		});
	});