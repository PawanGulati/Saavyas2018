var express		=	require('express');
var app			=	express();
var path		=	require('path');
var morgan		=	require('morgan');
var mongoose	=	require('mongoose');
var port		=	process.env.PORT || 8000;
var bodyParser  =	require('body-parser');
var router 		= 	express.Router();
var appRoutes 	= 	require('./app/routes/api.js')(router); 
var path		=	require('path');



/*Middlewares*/
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

/*Data Base*/
mongoose.connect('mongodb://localhost:27017/saavyas');
var db =mongoose.connection;
db.on('error',function callback (){
	console.log("Database not Connected");
});
db.once('open',function callback (){
	console.log("Connected to Database");
})


app.get('*',function(req,res){
	res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});
/*Port Configuration*/
app.listen(port,(err) =>{
	if(err)
	{
		console.log(`Port Error`);
	}
	else{
	console.log(`Server started on port ${port}`);
	}
});
