angular.module('regControllersTeam',['adminServices','msieurtoph.ngCheckboxes'])

.controller('regCtrlT',function($http,$location,$timeout,Team,$scope){
		var app=this;
	this.regTem=function(regTemData,valid){
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
		    }      
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
			    }    

		  }
		  if($scope.checkboxList!==undefined)
		  $scope.regt.regTemData.tevents=$scope.checkboxList;
		

	
		app.loading=true;
		app.errorMsg=false;

		if(valid){
			
			Team.create(app.regTemData).then(function(data){

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

		this.checkEmail = function(regTemData)
{
	
	app.checkinEmail=true;
	app.emailMessage =	false;
	app.emailInvalid	=	false;
	
	Team.checkEmail(app.regTemData).then(function(data)
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
