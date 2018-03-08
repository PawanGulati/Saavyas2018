angular.module('regControllersAdm',['adminServices'])

.controller('regCtrlA',function($http,$location,$timeout,Admin){
	
	var app=this;
	this.regAdm=function(regAdmData,valid){
		app.loading=true;
		app.errorMsg=false;

		if(valid){
			
			Admin.create(app.regAdmData).then(function(data){
			
			if(data.data.success){
				app.loading=false;
				app.successMsg = data.data.message +'.......Redirecting';
				$timeout(function() {
					$location.path('/');
					anim();
				}, 2000);
				
			}
			else{
				app.loading=false;

				app.errorMsg	=	data.data.message;
			}
		});
		}else{
				app.loading=false;

				app.errorMsg	=	'Please ensure form is filled out properly';
			}

		};

		this.checkEmail = function(regAdmData)
{
	
	app.checkinEmail=true;
	app.emailMessage =	false;
	app.emailInvalid	=	false;
	
	Admin.checkEmail(app.regAdmData).then(function(data)
	{
		if (data.data.success) {	
			app.checkinEmail=false;
			app.emailMsg=data.data.message;
		}
		else{
			app.checkinEmail=false;
			app.emailMsg=data.data.message;
			app.emailInvalid	=	true;

		}

	});
};
})

.directive('match', function() {
    return {
        restrict: 'A', // Restrict to HTML Attribute
        controller: function($scope) {
            $scope.confirmed = false; // Set matching password to false by default

            // Custom function that checks both inputs against each other               
            $scope.doConfirm = function(values) {
                // Run as a loop to continue check for each value each time key is pressed
                values.forEach(function(ele) {
                    // Check if inputs match and set variable in $scope
                    if ($scope.confirm == ele) {
                        $scope.confirmed = true; // If inputs match
                    } else {
                        $scope.confirmed = false; // If inputs do not match
                    }
                });
            };
        },

        link: function(scope, element, attrs) {

            // Grab the attribute and observe it            
            attrs.$observe('match', function() {
                scope.matches = JSON.parse(attrs.match); // Parse to JSON
                scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other   
            });

            // Grab confirm ng-model and watch it           
            scope.$watch('confirm', function() {
                scope.matches = JSON.parse(attrs.match); // Parse to JSON
                scope.doConfirm(scope.matches); // Run custom function that checks both inputs against each other   
            });
        }
    };
});
