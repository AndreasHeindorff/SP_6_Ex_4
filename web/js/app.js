var myApp = angular.module('DemoApp',['ngRoute']);

myApp.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
          when('/', {
              templateUrl: 'partials/allcars.html',
              controller: 'CarController'
          }).
          when('/addedit', {
              templateUrl: 'partials/addeditcars.html',
              controller: 'AddEditController'
          }).
          otherwise({
              redirectTo: '/'
          });
}]);


myApp.factory('CarFactory', function () {
  var cars = [
  { id: 1, year: 1997,registered: new Date(1999,3,15), make: 'Ford',model: 'E350', description: 'ac, abs, moon', price: 3000 }
  ,{ id: 2, year: 1999,registered: new Date(1996,3,12), make: 'Chevy', model: 'Venture', description: 'None', price: 4900 }
  ,{ id: 3, year: 2000,registered: new Date(199,12,22), make: 'Chevy', model: 'Venture', description: '', price: 5000 }
  ,{ id: 4, year: 1996,registered: new Date(2002,3,15), make: 'Jeep', model: 'Grand Cherokee',description: 'Moon roof',price: 4799 }]
   var nextId = 5;

   var getCars = function () {
     return cars;
   }

  var deleteCar = function (id) {
     for (var i = 0; i < cars.length; i++) {
      if (cars[i].id === id) {
        cars.splice(i, 1);
        return;
      }
    }
  }

   var addEditCar = function(newcar){
     if (newcar.id == null) {
       newcar.id = nextId++;
       cars.push(newcar);
     }
     else {
       for (var i = 0; i < cars.length; i++) {
         if (cars[i].id === newcar.id) {
           cars[i] = newcar;
           break;
         }
       }
     }
   }

   return {
   getCars: getCars,
   deleteCar: deleteCar,
   addEditCar: addEditCar
   };
});


myApp.controller('CarController', ['$scope', 'CarFactory', function($scope, CarFactory) {


  $scope.cars = CarFactory.getCars();
  $scope.predicate = "id";

  $scope.delete = function(id) {
    CarFactory.deleteCar(id);
  }

}]);

myApp.controller('AddEditController', ['$scope', 'CarFactory', function($scope, CarFactory) {



  $scope.add = function() {
    console.log($scope.formId);
    console.log($scope.formYear);
    console.log($scope.formMake);
    console.log($scope.formModel);
    console.log($scope.formDescription);
    console.log($scope.formPrice);
    CarFactory.addEditCar({
      id: $scope.formId,
      year: $scope.formYear,
      registered: new Date(1999,3,15),
      make: $scope.formMake,
      model: $scope.formModel,
      description: $scope.formDescription,
      price: $scope.formPrice
    });
  }

}]);
