'use strict';

angular.module('starter.store', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('main.store', {
                url: "/store",
                templateUrl: "app/store/store.html",
                controller: 'storeController'
            })
    }).controller('storeController', ['$scope',function($scope) {

        $scope.init = function(){
        }
        $scope.init();
    }]);