angular.module('angularCheckboxes', ['msieurtoph.ngCheckboxes'])

.controller('basicUsageCtrl', ['$scope', function($scope){
  $scope.myValue='Checkbox 2';

  $scope.add = function(value){
    if (!angular.isArray($scope.checkboxList)){
      $scope.checkboxList = [];
    }
    if (-1 === $scope.checkboxList.indexOf(value)){
      $scope.checkboxList.push(value);
    }
  }
  $scope.remove = function(value){
    if (!angular.isArray($scope.checkboxList)) {
      return;
    }
    var index = $scope.checkboxList.indexOf(value);
    if (-1 !== index) {
      $scope.checkboxList.splice(index, 1);
    }
  }
  console.log('$scope.checkboxList');
}]);