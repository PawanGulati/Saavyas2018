var app 	=	angular.module('appRoutes',['ngRoute'])

.config(function($routeProvider,$locationProvider){
	$routeProvider

	.when('/',{
		templateUrl:'app/views/pages/home.html',
		authenticated:false
	})
	.when('/coming',{
		templateUrl:'app/views/pages/comingsoon.html',
		authenticated:false
	})
	.when('/cominge',{
		templateUrl:'app/views/pages/comingsooneve.html',
		authenticated:false
	})
	.when('/events',{
		templateUrl:'app/views/pages/events.html',
		authenticated:false
	})
	.when('/sponsors',{
		templateUrl:'app/views/pages/sponsors.html',
		authenticated:false
	})
	.when('/meetteam',{
		templateUrl:'app/views/pages/users/meetteam.html',
		authenticated:false
	})
	

	.when('/bob',{
		templateUrl:'app/views/pages/events/bob.html',
		authenticated:false
	})
	.when('/clashroyale',{
		templateUrl:'app/views/pages/events/clashroyale.html',
		authenticated:false
	})
	.when('/cs',{
		templateUrl:'app/views/pages/events/cs.html',
		authenticated:false
	})
	.when('/extravaganza',{
		templateUrl:'app/views/pages/events/extravaganza.html',
		authenticated:false
	})
	.when('/facepaint',{
		templateUrl:'app/views/pages/events/facepaint.html',
		authenticated:false
	})
	.when('/feeltheheat',{
		templateUrl:'app/views/pages/events/feeltheheat.html',
		authenticated:false
	})
	.when('/fifa',{
		templateUrl:'app/views/pages/events/fifa.html',
		authenticated:false
	})
	.when('/footloose',{
		templateUrl:'app/views/pages/events/footloose.html',
		authenticated:false
	})
	.when('/futsal',{
		templateUrl:'app/views/pages/events/futsal.html',
		authenticated:false
	})
	.when('/justaminute',{
		templateUrl:'app/views/pages/events/justaminute.html',
		authenticated:false
	})
	.when('/linefollower',{
		templateUrl:'app/views/pages/events/linefollower.html',
		authenticated:false
	})
	.when('/nfs',{
		templateUrl:'app/views/pages/events/nfs.html',
		authenticated:false
	})
	.when('/picasso',{
		templateUrl:'app/views/pages/events/picasso.html',
		authenticated:false
	})
	.when('/programmatics',{
		templateUrl:'app/views/pages/events/programmatics.html',
		authenticated:false
	})
	.when('/roborace',{
		templateUrl:'app/views/pages/events/roborace.html',
		authenticated:false
	})
	.when('/robosoccer',{
		templateUrl:'app/views/pages/events/robosoccer.html',
		authenticated:false
	})
	.when('/robowar',{
		templateUrl:'app/views/pages/events/robowar.html',
		authenticated:false
	})
	.when('/stepup',{
		templateUrl:'app/views/pages/events/stepup.html',
		authenticated:false
	})
	.when('/thirddegree',{
		templateUrl:'app/views/pages/events/thirddegree.html',
		authenticated:false
	})
	.when('/treasurehunt',{
		templateUrl:'app/views/pages/events/treasurehunt.html',
		authenticated:false
	})
	.when('/trivium',{
		templateUrl:'app/views/pages/events/trivium.html',
		authenticated:false
	})
	.when('/tugofwar',{
		templateUrl:'app/views/pages/events/tugofwar.html',
		authenticated:false
	})
	.when('/voice',{
		templateUrl:'app/views/pages/events/voice.html',
		authenticated:false
	})
	.when('/zest',{
		templateUrl:'app/views/pages/events/zest.html',
		authenticated:false
	})
	
	
	
	.when('/pronites',{
		templateUrl:'app/views/pages/pronites.html',
		authenticated:false
	})
	.when('/rnc',{
		templateUrl:'app/views/pages/rnc.html',
		authenticated:false
	})
	.when('/nvn',{
		templateUrl:'app/views/pages/nvn.html',
		authenticated:false
	})
	.when('/scdl',{
		templateUrl:'app/views/pages/schedule.html',
		authenticated:false
	})
	

	// .when('/regadmins',{
	// 	templateUrl:'app/views/pages/users/regadmins.html',
	// 	controller:'regCtrlA',
	// 	controllerAs:'rega'
	// })

	// .when('/login',{
	// 	templateUrl:'app/views/pages/users/login.html',
	// 	authenticated:false
	// })

	// .when('/logout',{
	// 	templateUrl:'app/views/pages/users/logout.html',
	// 	authenticated:true
	// })
	
	// .when('/profile',{
	// 	templateUrl:'app/views/pages/users/profile.html',
	// 	authenticated:true
	// })

	// .when('/management',{
	// 	templateUrl:'app/views/pages/management/management.html',
	// 	controller:'managementCtrl',
	// 	controllerAs:'management',
	// 	authenticated:true,
	// 	permission:['admin']
	// })
	.when('/register',{
		templateUrl:'app/views/pages/register.html',
		authenticated:false
	})
	.when('/regusers',{
		templateUrl:'app/views/pages/users/regusers.html',
		controller:'regCtrlU',
		controllerAs:'regu'
	})

	
	.when('/regteams',{
		templateUrl:'app/views/pages/users/regteams.html',
		controller:'regCtrlT',
		controllerAs:'regt'
	})
	.when('/aboutus',{
		templateUrl:'app/views/pages/about.html'
	})
	.when('/reachus',{
		templateUrl:'app/views/pages/reachus.html'
	})
	.when('/initiatives',{
		templateUrl:'app/views/pages/initiatives.html'
	})
	.when('/hospitality',{
		templateUrl:'app/views/pages/hospitality.html'
	})
	.when('/workshop',{
		templateUrl:'/assets/pdf/'
	})
	 
	.otherwise({redirectTo:'/'});

	$locationProvider.html5Mode({
		enabled:true,
		requireBase:false
	});
});


app.run(['$rootScope', 'Auth', '$location', function($rootScope, Auth, $location) {

    // Check each time route changes    
    $rootScope.$on('$routeChangeStart', function(event, next, current) {

        if (next.$$route.authenticated == true) {
                // Check if authentication is required, then if permission is required
                if (!Auth.isLoggedIn()) {
                    event.preventDefault(); // If not logged in, prevent accessing route
                    $location.path('/'); // Redirect to home instead
                } 
            } else if (next.$$route.authenticated == false) {
                // If authentication is not required, make sure is not logged in
                if (Auth.isLoggedIn()) {
                    event.preventDefault(); // If user is logged in, prevent accessing route
                    $location.path('/profile'); // Redirect to profile instead
                }
            }
    });
}]);
