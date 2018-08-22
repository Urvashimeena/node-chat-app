var socket = io();


	function scrollToBottom() 
	{
		//selector

		var message = jQuery('#messages');

		//height

		var clientHeight = message.prop('clientHeight');
		var scrolltop = message.prop('scrollTop');
		var scrollHeight = message.prop('scrollHeight');

		var newmessage = message.children('li:last-child');

		var newmessageHeight = newmessage.innerHeight();

		var lastmessageHeight = newmessage.prev().innerHeight();

		if(clientHeight+scrolltop+newmessageHeight+lastmessageHeight >= scrollHeight)
		{
			message.scrollTop(scrollHeight);
		}
	}


	socket.on('connect' , () => {
		
		var param = jQuery.deparam(window.location.search);

		socket.emit('join',param,function(err)
		{
			if(err)
			{
				alert(err);
				window.location.href('/');
			}
			else
			{
				console.log('no err');
			}
		});
	});


	socket.on('disconnect' , () => {
	console.log('disconnected to server');
	});

	socket.on('updateuserList', function(users) {
		var ol = jQuery('<ol></o>');

		users.forEach(function(user)
		{
			ol.append(jQuery('<li></li>').text(user));
		});
		jQuery('#users').html(ol);
	});

	socket.on( 'servermessage' , function(message) {
		var formattedtime = moment(message.createdAt).format('h:mm a');
		var template = jQuery('#message-template').html();
		var html = Mustache.render(template , {
			text : message.text,
			from : message.from,
			createdAt:formattedtime
		})
		
		// console.log('new message from server' , message);
		// var li = jQuery('<li></li>')
		// li.text(`${message.from} ${formattedtime} : ${message.text}`);
		jQuery('#messages').append(html);
		scrollToBottom();
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


	// 	socket.on( 'newlocationmessage' , function(message) {
	// 	var formattedtime = moment(message.createdAt).format('h:mm a');
	// 	var li = jQuery('<li></li>')
	// 	var a = jQuery('<a target="_blank">My current location</a>');
	// 	li.text(`${message.from} ${formattedtime} : `);
	// 	a.attr('href' , message.url);
	// 	li.append(a);
	// 	jQuery('#messages').append(li);
		
	// });
	
		socket.on( 'newlocationmessage' , function(message) {
		var formattedtime = moment(message.createdAt).format('h:mm a');
		var template = jQuery('#location-message-template').html();
		var html = Mustache.render(template , {
			url : message.url,
			from : message.from,
			createdAt:formattedtime
		})
		
		jQuery('#messages').append(html);
		scrollToBottom();
		
	});