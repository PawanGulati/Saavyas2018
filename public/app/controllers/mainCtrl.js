angular.module('mainController',['authServices'])

.controller('mainCtrl',function(Auth,$http,$location,$timeout,$rootScope){
	
	var app=this;
	
	app.loadme=false;
	$rootScope.$on('$routeChangeStart', function() {
        if(Auth.isLoggedIn()){
			app.isLoggedIn=true;
			Auth.getUser().then(function(data){
				app.name=data.data.name;
				app.loadme=true;
			});
		}
		else{app.isLoggedIn=false;
			app.name='';
			app.loadme=true;
			}
    });
	
	this.doLogin=function(loginData){
		app.loading=true;
		app.errorMsg=false;

		Auth.login(app.loginData).then(function(data){
			
			if(data.data.success){
				app.loading=false;
				app.successMsg = data.data.message +'.......Redirecting';
				$timeout(function() {
					$location.path('/management');
					
				}, 2000);
				
			}
			else{
				app.loading=false;

				app.errorMsg	=	data.data.message;
			}
		});

		};

	this.logout = function(){
		Auth.logout();
		$location.path('/logout');
		$timeout(function() {
			$location.path('/');
			anim();
		}, 2000);
	};
});




