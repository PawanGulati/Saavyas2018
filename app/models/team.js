var mongoose	=	require('mongoose');
var Schema	=	mongoose.Schema;
var validate = require('mongoose-validator');


var nameValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
        message: 'Name must be at least 3 characters, max 30, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 20],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
var emailValidator = [
    validate({
        validator: 'matches',
        arguments: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: 'Email Invalid'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];
var contactValidator=[
	validate({
        validator: 'matches',
        arguments: /(7|8|9)\d{9}/,
        message: 'Contact Invalid'
    }),
	validate({
        validator: 'isLength',
        arguments: [10],
        message: 'Contact should be of 10 characters'
    })
];
var instituteValidator=[
	validate({
        validator: 'isLength',
        arguments: [4,80],
        message: 'length should be in between 4 to 80'
    })
];
var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 25],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Username must contain letters and numbers only'
    })
];

var TeamSchema	=	new Schema({
	id        : {type:String,required:true,unique:true},

	teamname  : {type:String,lowercase:true,unique:true,validate: usernameValidator},
	memberno  : {type:String,required:true},
	email	  : {type:String,lowercase:true,required:true,unique:true,validate:emailValidator},
	contact	  : {type:String,required:true,validate:contactValidator},
	institute : {type:String,required:true,validate:instituteValidator},
	tlname    : {type:String,required:true},
	tevents   : {type:Array,required:true}
});

module.exports	=	mongoose.model('Team',TeamSchema);