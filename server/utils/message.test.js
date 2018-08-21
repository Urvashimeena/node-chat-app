
var expect = require('expect');
var {generateMessage,generateLocationMessage} = require('./message');

describe('generateMessage' , () => {

	it('should generate message object' , () => {
		var from = "urvashi";
		var text = "Some text";

		var message = generateMessage(from , text);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,text});
	});
});


describe('generateLocationMessage' , () => {

	it('should generate correct location message object' , () => {
		var from = "ayush";
		var latitude = 15;
		var longitude = 20;
		var url = 'https://www.google.com/maps/?q=15,20';

		var message = generateLocationMessage(from , latitude , longitude);

		expect(message.createdAt).toBeA('number');
		expect(message).toInclude({from,url});
	});
});