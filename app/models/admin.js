var mongoose	=	require('mongoose');
var Schema		=	mongoose.Schema;
var bcryt		=	require('bcrypt-nodejs');
var titlize = require('mongoose-title-case'); // Import Mongoose Title Case Plugin
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
        arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
        message: 'Email Invalid'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

var passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
        message: 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'
    }),
    validate({
        validator: 'isLength',
        arguments: [8, 35],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
  
  })
];


var AdminSchema	=	new Schema({

	name	 : 	{type:String,required:true,validate:nameValidator},
	email	 : 	{type:String,required:true,lowercase:true,unique:true,validate:emailValidator},
	password : 	{type:String,required:true,validate:passwordValidator},
    permission:{type:String,required:true,default:'admin'}
});

AdminSchema.pre('save',function(next){
	var admin=this;
	bcryt.hash(admin.password,null,null,function(err,hash){
	if(err){
		return next(err);
		}
		else{
			admin.password=hash;
			next();
		}
	});
});

AdminSchema.plugin(titlize, {
    paths: ['name']
});

AdminSchema.methods.comparePassword=function(password){
	return bcryt.compareSync(password,this.password);
};
module.exports	=	mongoose.model('Admin',AdminSchema);



