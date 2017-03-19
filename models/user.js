var mongoose = require('mongoose'); // library to connect node with mongodb. It's an object relational mapper
var bcrypt = require('bcrypt-nodejs'); // library to hash passwords before saving to DB

var Schema = mongoose.Schema;

/* The user schema attributes /  characteristics / fields */
var UserSchema = new Schema({
	email: { type:String, unique:true, lowercase:true},
	password: String,

	profile: {
		name: { type: String, default: ''},
		picture: { tyep: String, default: ''}
	},
    address: String,
	history: [{
		date: Date,
		paid: {type: Number, default: 0}
		//item : {type: Schema.Types.ObjectId}
	}];	
});


/* Hash the password before even saving to the DB */
UserSchema.pre('save', function(next) {
	var user = this;
	if (!user.isModified('password')) return next();
// salt is a random data created by genSalt method of bcrypt
	bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
    if (err) return next(err);
    user.password = hash;
    next();	
    });
	});
});


/* Compare password in the DB and he one user typed in */
// Create a custom method to compare password
UserSchema.methods.comparePassword = function(password){
	return bcrypt.compareSync(password, this.password);
}

