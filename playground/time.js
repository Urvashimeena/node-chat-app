var moment = require('moment');

// var date = new Date();
// console.log(date.getMonth());   //0-11


var date = moment();
console.log(date.format('MMM Do, YYYY h:mm:ss a'));
