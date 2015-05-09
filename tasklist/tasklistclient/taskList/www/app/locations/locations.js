'use strict';

angular.module('starter.locations', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('main.locations', {
                url: "/locations",
                templateUrl: "app/locations/locations.html",
                controller: 'locationsController'
            })
    }).controller('locationsController', ['$scope',function($scope) {

        $scope.init = function(){
        }
        $scope.init();
    }]);