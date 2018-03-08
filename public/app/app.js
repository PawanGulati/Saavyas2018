angular.module('userApp',['appRoutes','regControllersAdm','adminServices','mainController','authServices','managementController','regControllersUser','regControllersTeam','angularCheckboxes'])

.config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});


