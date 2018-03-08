var	User		=	require('../models/user');
var	Team		=	require('../models/team');
var Admin 		=	require('../models/admin');
var jwt			= 	require('jsonwebtoken');
var secret		=	'saavyasrocks';
var uniqid = require('uniqid');

module.exports	=	function(router)
	{
		
		// localhost:port/api/users
		router.post('/users',function(req,res)
		{
			var entry	=	new User();
			entry.id=uniqid.time();
			entry.name		=	req.body.name;
			entry.email		=	req.body.email;
			entry.contact	=	req.body.contact;
			entry.institute	=	req.body.institute;
			entry.uevents	=	req.body.uevents;
					
			if( req.body.email == null || req.body.email == '' || req.body.name == null || req.body.name == '' || req.body.contact == null || req.body.contact == '' 
				|| req.body.institute== null || req.body.institute == '' || req.body.uevents== null || req.body.uevents == '')
			{
				res.json({success:false,message:'Ensure details were provided'});
				
			}
			else
			{
				entry.save((err)=>
				{
					if(err)
					{
						if (err.errors=!null) 
						{
									if(err.errors.name)
								{
									res.json({success:false,message:err.errors.name.message});
								}
								else 
								if(err.errors.email)
								{
									res.json({success:false,message:err.errors.email.message});
								}
								else 
								if(err.errors.contact)
								{
									res.json({success:false,message:err.errors.contact.message});
								}
								else 
								if(err.errors.institute)
								{
									res.json({success:false,message:err.errors.institute.message});
								}
								else 
								if(err.errors.uevents)
								{
									res.json({success:false,message:err.errors.uevents.message});
								}
								else
								{
								 	if (err.code== 11000) 
								 	{	
									res.json({success:false,message:'that email is already Registered'});
									}else
									{
										res.json({success:false,message:err.message});
									}	
								 }
						}
						else 
						if(err)
						{
							res.json({success:false,message:err});
						}
					}					
					else
					{
						res.json({success:true,message:'User Registered'});
					}
				});
			}
		});
		router.post('/checkemail', function(req, res) {
        User.findOne({ email: req.body.email }).select('email').exec(function(err, user) {
            if (err) {
                
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                if (user) {
                    res.json({ success: false, message: 'That e-mail is already taken' }); // If user is returned, then e-mail is taken
                } else {
                    res.json({ success: true, message: 'Valid e-mail' }); // If user is not returned, then e-mail is not taken
                }
            }
        });
    });

		router.post('/teams',function(req,res)
		{
			var entry	=	new Team();
			entry.id=uniqid.time();
			entry.teamname		=	req.body.teamname;
			entry.tlname		=	req.body.tlname;
			entry.memberno		=	req.body.memberno;

			entry.email		=	req.body.email;
			entry.contact	=	req.body.contact;
			entry.institute	=	req.body.institute;
			entry.tevents	=	req.body.tevents;
					
			if( req.body.email == null || req.body.email == '' || req.body.teamname == null || req.body.teamname == '' || req.body.contact == null || req.body.contact == '' 
				|| req.body.institute== null || req.body.institute == '' || req.body.tevents== null || req.body.tevents == '' || req.body.tlname== null || req.body.tlname == '' 
				|| req.body.memberno== null || req.body.memberno == ''){
				res.json({success:false,message:'Ensure details were provided'});
				
			}
			else{
				entry.save((err)=>
				{
					if(err)
					{
						if (err.errors=!null) 
						{
									if(err.errors.name){
									res.json({success:false,message:err.errors.name.message});
								}else if(err.errors.email){
									res.json({success:false,message:err.errors.email.message});
								}else if(err.errors.contact){
									res.json({success:false,message:err.errors.contact.message});
								}else if(err.errors.institute){
									res.json({success:false,message:err.errors.institute.message});
								}else if(err.errors.tlname){
									res.json({success:false,message:err.errors.tlname.message});
								}else if(err.errors.memberno){
									res.json({success:false,message:err.errors.memberno.message});
								}
								else if(err.errors.tevents){
									res.json({success:false,message:err.errors.tevents.message});}
									else{
								 	if (err.code== 11000) {	
								 		if(err.errmsg[86] == 'e')
									res.json({success:false,message:'that email is already Registered'});
										else
											if(err.errmsg[86] == 't')
											{
												res.json({success:false,message:'That Team name is already Registered'});
											}
								}else{
										res.json({success:false,message:err.message});
									}	
								 }
						}else if(err){
							res.json({success:false,message:err});
						}
					}					
					else
					{
						res.json({success:true,message:'User Registered'});
					}
				});
			}
		});

		router.post('/checkemail', function(req, res) {
        Team.findOne({ email: req.body.email }).select('email').exec(function(err, team) {
            if (err) {
                
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                if (team) {
                    res.json({ success: false, message: 'That e-mail is already taken' }); // If user is returned, then e-mail is taken
                } else {
                    res.json({ success: true, message: 'Valid e-mail' }); // If user is not returned, then e-mail is not taken
                }
            }
        });

    });
        router.post('/checkname', function(req, res) {
        Team.findOne({ name: req.body.teamname }).select(teamname).exec(function(err, team) {
            if (err) {
                
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                if (team) {
                    res.json({ success: false, message: 'That Team name is already taken' }); // If user is returned, then e-mail is taken
                } else {
                    res.json({ success: true, message: 'Valid group name' }); // If user is not returned, then e-mail is not taken
                }
            }
        });
   		 });
		//localhost:port/api/admins
		router.post('/admins',function(req,res){
			
			var entry	=	new Admin();

			entry.name 	= 	req.body.name;
			entry.email =	req.body.email;
			entry.password	= 	req.body.password;

			if( req.body.email == null || req.body.email == '' || req.body.password == null || req.body.password == ''){
				res.json({success:false,message:'Ensure name ,email and password were provided'});
			}	
			else{
				entry.save((err)=>
				{
					if(err)
					{
						if (err.errors=!null) 
						{
									if(err.errors.name){
									res.json({success:false,message:err.errors.name.message});
								}else if(err.errors.email){
									res.json({success:false,message:err.errors.email.message});
								}else if(err.errors.password){
									res.json({success:false,message:err.errors.email.message});
								}else{
								 	if (err.code== 11000) {	
									res.json({success:false,message:'that email is alread taken'});
								}else{
										res.json({success:false,message:err.message});
									}	
								 }
						}else if(err){
							res.json({success:false,message:err});
						}
					}					
					else
					{
						res.json({success:true,message:'Admin Registered'});
					}
				});
			}
		
		});


		router.post('/checkemail', function(req, res) {
        Admin.findOne({ email: req.body.email }).select('email').exec(function(err, admin) {
            if (err) {
                
                res.json({ success: false, message: 'Something went wrong. This error has been logged and will be addressed by our staff. We apologize for this inconvenience!' });
            } else {
                if (admin) {
                    res.json({ success: false, message: 'That e-mail is already taken' }); // If user is returned, then e-mail is taken
                } else {
                    res.json({ success: true, message: 'Valid e-mail' }); // If user is not returned, then e-mail is not taken
                }
            }
        });
    });


		router.post('/authenticate',function(req,res){

			Admin.findOne({email:req.body.email}).select('email name password').exec(function(err,admin){
				if (err) throw err;

				if(!admin){
					res.json({success:false,message:'Could net authenticate admin'});
				}
				else
					if(admin){

						if(req.body.password){
							var validPassword = admin.comparePassword(req.body.password);
						}
						else
						{
							res.json({success:false,message:'No password provided'});
						}

						if(!validPassword){
							res.json({success:false,message:'Could not authenticate password'});
						}
						else{
							var token	=	jwt.sign({name:admin.name ,email:admin.email},secret,{expiresIn:'72h'});
							res.json({success:true,message:'Admin authenticated',token:token});
						}
					}
			});
		});

		
		router.use(function(req, res, next) {
		        var token = req.body.token || req.body.query || req.headers['x-access-token']; 
		         
		        if (token) {
		            jwt.verify(token, secret, function(err, decoded) {
		                if (err) {
		                    res.json({ success: false, message: 'Token invalid' }); 
		                } else {
		                    req.decoded = decoded; 
		                    next(); 
		                }
		            });
		        } else {
		            res.json({ success: true }); 
		        }
		    });
				
		router.post('/me',function(req,res){
			res.send(req.decoded);

		});

		router.get('/management',function(req,res){
			
		Admin.findOne({email:req.decoded.email},function(err,admin)
		{
					
					var json={};
					json.success=true;
				
					if(!admin)
					{
						res.json({success:false,message:'No admin found'});
					}
					

					else
					{
						if(admin.permission === 'admin')
						{
							User.find({},function(err,users)
							{	
									if(err) throw err;
									else
									json.users=users;
								
								
							
							
								Team.find({},function(err,teams)
							{
									if(err) throw err;
									else
										json.teams=teams;
									

							
								res.json(json);
							});});
									
						}
						
					 else{
						res.json({success:false,message:'Insufficient permission'});
					}
				}
				

			 });
		});

		

		return router;


	}