const path = require('path');
const express = require('express');
var app = express();
const publicpath = path.join(__dirname , '..' , '/public');

const port = process.env.PORT || 3000;
app.use(express.static(publicpath));
app.listen(port ,()=>{
	console.log("Server started");
});