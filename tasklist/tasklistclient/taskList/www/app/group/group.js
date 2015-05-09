'use strict';

angular.module('starter.group', ['ui.router','ui.bootstrap'])
    .config(function($stateProvider){
        $stateProvider
            .state('main.group', {
                url: "/group",
                templateUrl: "app/group/group.html",
                controller: 'groupController'
            })
    }).controller('groupController', ['$scope',function($scope) {

        $scope.init = function(){
        }
        $scope.init();
    }]);

    