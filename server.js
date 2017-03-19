var express = require('express') // Indicates express library is required
var morgan = require('morgan'); // Morgan is used to log requests
var mongoose = require('mongoose')// Mongoose library to connect node to mongodb


var app = express(); // Creates an object of express


// connect mongoose to DB
mongoose.connect('mongodb://root:toor@ds137040.mlab.com:37040/ecommerce', function(err){
	if (err) {
		console.log(err);
	} else {
		console.log("Connected to the database");
	}
});

// Need middleware to invoke morgan function
app.use(morgan('dev'));


// Example of routing 
app.get('/', function(req, res){
	var name = "SmushBall";
	res.json("My name is " + name);
})


app.get('/items', function(req, res){
	var name = "Toothpaste";
	res.json("Item is  " + name);
})

/* Listen is a method of express which listens on port 3000 
and if no errors, then write a message to console. */
app.listen(3000, function(err){
	if (err) throw err;
	console.log("server is running")
});