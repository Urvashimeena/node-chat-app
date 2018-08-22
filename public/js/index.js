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
		var formattedtime = moment(message.createdAt).format('h:mm a');
		console.log('new message from server' , message);
		var li = jQuery('<li></li>')
		li.text(`${message.from} ${formattedtime} : ${message.text}`);
		jQuery('#messages').append(li);
	});



	jQuery('#message-form').on('submit',function(e) {
		e.preventDefault();
		var messagetextbox =  jQuery('[name = message]');
		socket.emit('clientmsg' , {
		from: 'User',
		msg : messagetextbox.val()
		}, function () {
			messagetextbox.val(''); 
		});
	});


	var locationButton = jQuery('#send-location');
	locationButton.on('click' , function() 
	{
		if(!navigator.geolocation)
		{
			return alert('Geolocation is not supported by your browser');
		}
		locationButton.attr('disabled', 'disabled').text('Sending location...');
		navigator.geolocation.getCurrentPosition(function(position)
		{	
			socket.emit('createlocationmessage' , {
				latitude:position.coords.latitude,
				longitude:position.coords.longitude
			});
		} , function() {
			locationButton.removeAttr('disabled').text('send location');
			alert('Unable to fetch the location');
		})
	});


		socket.on( 'newlocationmessage' , function(message) {
		var formattedtime = moment(message.createdAt).format('h:mm a');
		var li = jQuery('<li></li>')
		var a = jQuery('<a target="_blank">My current location</a>');
		li.text(`${message.from} ${formattedtime} : `);
		a.attr('href' , message.url);
		li.append(a);
		jQuery('#messages').append(li);
		
	});
	