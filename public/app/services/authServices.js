angular.module('authServices', [])

.factory('Auth', function($http, AuthToken) {
    var authFactory = {};
    authFactory.login = function(loginData) {
        return $http.post('/api/authenticate', loginData).then(function(data) {
            AuthToken.setToken(data.data.token); 
            return data;
        });
    };

    authFactory.isLoggedIn = function() {
        if (AuthToken.getToken()) {
            return true; 
        } else {
            return false; 
        }
    };

  
    authFactory.getUser = function() {
        if (AuthToken.getToken()) {
            return $http.post('/api/me'); 
        } else {
            $q.reject({ message: 'User has no token' }); 
        }
    };

    authFactory.logout = function() {
        AuthToken.setToken(); 
    };

    return authFactory; 
})

.factory('AuthToken', function($window) {
    var authTokenFactory = {};

    authTokenFactory.setToken = function(token) {
        if (token) {
            $window.localStorage.setItem('token', token); 
        } else {
            $window.localStorage.removeItem('token');
        }
    };

    // Function to retrieve token found in local storage
    authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
    };

    return authTokenFactory; // Return factory object
})

// Factory: AuthInterceptors is used to configure headers with token (passed into config, app.js file)
.factory('AuthInterceptors', function(AuthToken) {
    var authInterceptorsFactory = {}; // Create factory object

    // Function to check for token in local storage and attach to header if so
    authInterceptorsFactory.request = function(config) {
        var token = AuthToken.getToken(); // Check if a token is in local storage
        if (token) config.headers['x-access-token'] = token; //If exists, attach to headers

        return config; // Return config object for use in app.js (config file)
    };

    return authInterceptorsFactory; // Return factory object

});
