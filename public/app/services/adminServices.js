angular.module('adminServices',[])
.factory('Admin',function($http){
	var adminFactory={};

	adminFactory.create = function(regAdmData){
		return $http.post('/api/admins',regAdmData);
	};
	adminFactory.checkEmail = function(regAdmData){
		return $http.post('/api/checkemail',regAdmData);
	};
	adminFactory.getUsers = function(regAdmData){
		return $http.get('/api/management',regAdmData);
	};
	adminFactory.editUser = function(id) {
        return $http.put('/api/edit', id);
    };

	return adminFactory;
})

.factory('User',function($http){
	var userFactory={};

	userFactory.create = function(regUsrData){
		return $http.post('/api/users',regUsrData);
	};
	userFactory.checkEmail = function(regUsrData){
		return $http.post('/api/checkemail',regUsrData);
	};
	
	return userFactory;
})

.factory('Group',function($http){
	var groupFactory={};

	groupFactory.create = function(regGrpData){
		return $http.post('/api/groups',regGrpData);
	};
	groupFactory.checkEmail = function(regGrpData){
		return $http.post('/api/checkemail',regGrpData);
	};
	groupFactory.checkName = function(regGrpData){
		return $http.post('/api/checkname',regGrpData);
	};
	return groupFactory;
})

.factory('Team',function($http){
	var teamFactory={};

	teamFactory.create = function(regTemData){
		return $http.post('/api/teams',regTemData);
	};
	teamFactory.checkEmail = function(regTemData){
		return $http.post('/api/checkemail',regTemData);
	};
	teamFactory.checkName = function(regTemData){
		return $http.post('/api/checkname',regTemData);
	};
	return teamFactory;
});