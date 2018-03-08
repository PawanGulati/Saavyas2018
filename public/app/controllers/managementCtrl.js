angular.module('managementController',['adminServices'])


// .controller('regCtrlG',function($http){
//         this.regGrp=function(regGrpData){
//             console.log(this.regGrpData);
//             $http.post('/api/groups',this.regGrpData);

//         }})
//         .controller('regCtrlU',function($http){
//         this.regUsr=function(regUsrData){
//             console.log(this.regUsrData);
//             $http.post('/api/users',this.regUsrData);

//         }})
.controller('managementCtrl',function($http,Admin,$scope){

			var app = this;
			app.loading=true;
			app.accessDenied=true;
			app.errorMsg	=true;
             // Set a default limit to ng-repeat
    app.searchLimit = 0;

function getUsers() {
			Admin.getUsers().then(function(data){

					if(data.data.success){
						app.users=data.data.users;
						app.teams=data.data.teams; 
						app.loading=false;
						app.accessDenied=false;
                    }else{
                        app.loading=false;
                        res.json({message:'could not get data'});
                    }
						
				
			});
                    
		}
		 getUsers(); // Invoke function to get users from databases
    // Function: Show more results on page
    app.showMore = function(number) {
        app.showMoreError = false; // Clear error message
        // Run functio only if a valid number above zero
        if (number > 0) {
            app.limit = number; // Change ng-repeat filter to number requested by user
        } else {
            app.showMoreError = 'Please enter a valid number'; // Return error if number not valid
        }
    };

    app.showAll = function() {
        app.limit = undefined; // Clear ng-repeat limit
        app.showMoreError = false; // Clear error message
    };

    app.search = function(searchKeyword, number) {        console.log($scope);

        // Check if a search keyword was provided
                            console.log(searchKeyword);


        if (searchKeyword) {
            // Check if the search keyword actually exists
            if (searchKeyword.length > 0) {
                app.limit = 0; // Reset the limit number while processing
                $scope.searchFilter = searchKeyword; // Set the search filter to the word provided by the user
                app.limit = number; // Set the number displayed to the number entered by the user
            } else {        $scope.searchKeyword=undefined;

                $scope.searchFilter = undefined; // Remove any keywords from filter
            }
        } else {        $scope.searchKeyword=undefined;

            $scope.searchFilter = undefined; // Reset search limit
        }
    };

    // Function: Clear all fields
    app.clear = function($scope) {
                app.search();

        app.showMoreError = false; // Clear any errors
    };

    // Function: Perform an advanced, criteria-based search
    app.advancedSearch = function(searchByUsername, searchByEmail, searchByName,$scope) {
        // Ensure only to perform advanced search if one of the fields was submitted
        if (searchByUsername || searchByEmail || searchByName) {
            $scope.advancedSearchFilter = {}; // Create the filter object
            if (searchByUsername) {
                $scope.advancedSearchFilter.username = searchByUsername; // If username keyword was provided, search by username
            }
            if (searchByEmail) {
                $scope.advancedSearchFilter.email = searchByEmail; // If email keyword was provided, search by email
            }
            if (searchByName) {
                $scope.advancedSearchFilter.name = searchByName; // If name keyword was provided, search by name
            }
            app.searchLimit = undefined; // Clear limit on search results
        }
    };

    // Function: Set sort order of results
    app.sortOrder = function(order) {
        app.sort = order; // Assign sort order variable requested by user
    };
	
});

