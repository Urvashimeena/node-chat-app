
var expect = require('expect');
var {Users} = require('./users');

describe('Users' , () => {

	beforeEach(() => {
		users = new Users();
		users.users = [{
			id:'1',
			name:'ushu',
			room:'Node course'
		},
		{
			id:'2',
			name:'ayush',
			room:'Node course'
		},
		{
			id:'3',
			name:'rajat',
			room:'React course'
		}
		];
	});
	it('It should add new users' , () => {
		var a = new Users();

		var user = {
			id:'123',
			name:'ushu',
			room:'Node class'
		};

		var reuser = a.addUsers(user.id,user.name,user.room);

		expect(a.users).toEqual([user]);

	});

	it('should return names for node course' , () => {
		var userList = users.getUserList('Node course');

		expect(userList).toEqual(['ushu','ayush']);
	});

	it('should return names for node course' , () => {
		var userList = users.getUserList('React course');

		expect(userList).toEqual(['rajat']);
	});

	it('should remove user' , () => {
		var userId = '2';
		var user = users.removeUser(userId);

		expect(user.id).toBe(userId);
		expect(users.users.length).toBe(2);
	});

	it('should not remove user' , () => {
		var userId = '22';
		var user = users.removeUser(userId);

		expect(user).toNotExist();
		expect(users.users.length).toBe(3);
	});

	it('should find user' , () => {
		var userId = '2';
		var user = users.getUser(userId);

		expect(user.id).toBe(userId);
	});

	it('should not find user' , () => {
		var userId = '32';
		var user = users.getUser(userId);

		expect(user).toNotExist();
	});


});

