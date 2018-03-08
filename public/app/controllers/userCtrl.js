angular.module('regControllersUser',['adminServices','msieurtoph.ngCheckboxes'])

.controller('regCtrlU',function($http,$location,$timeout,User,$scope){
		var app=this;
	this.regUsr=function(regUsrData,valid){
		$scope.myValue='Checkbox 2';
  		$scope.add = function(value)
  		{
		    if (!angular.isArray($scope.checkboxList))
		    {
		      $scope.checkboxList = [];
    		}
		    if (-1 === $scope.checkboxList.indexOf(value))
		    {
		      $scope.checkboxList.push(value);
		    }      console.log($scope.checkboxList);

  		}
		  $scope.remove = function(value)
		  {
			    if (!angular.isArray($scope.checkboxList)) 
			    {
			      return;
			    }
			    var index = $scope.checkboxList.indexOf(value);
			    if (-1 !== index) 
			    {
			      $scope.checkboxList.splice(index, 1);
			    }      console.log($scope.checkboxList);

		  }
		  if($scope.checkboxList!==undefined)
		  $scope.regu.regUsrData.uevents=$scope.checkboxList;
		

	
		app.loading=true;
		app.errorMsg=false;

		if(valid){
			
			User.create(app.regUsrData).then(function(data){
			      console.log(data.data);

			if(data.data.success){
				app.loading=false;
				app.successMsg = data.data.message +'  Thanks for registering.......Redirecting';
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

		this.checkEmail = function(regUsrData)
{
	
	app.checkinEmail=true;
	app.emailMessage =	false;
	app.emailInvalid	=	false;
	
	User.checkEmail(app.regUsrData).then(function(data)
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
	
  		
});











