'use strict';

angular.module('starter.users', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('main.users', {
                url: "/users",
                templateUrl: "app/users/users.html",
                controller: 'usersController'
            }).state('main.userprofile', {
                url: "/user/:id",
                templateUrl: "app/users/userprofile.html",
                controller: 'userprofileController'
            });
    }).controller('usersController', ['$scope','UserFactory','$state','$stateParams',function($scope,UserFactory             ,$state,$stateParams) {

        $scope.users = [];
        $scope.init = function(){
            var promise = UserFactory.ListAction();
            $scope.users = promise.$object;

        }
        $scope.init();
    }]).controller('userprofileController', ['$scope','UserFactory','TasksFactory','$state','$stateParams',function($scope,UserFactory,TasksFactory,$state,$stateParams) {
        $scope.loadTasks = function(date){
            var promise = TasksFactory.ListAction({
                "user_id":$stateParams.id,
                "date":date
            });
            $scope.tasksToDo = promise.$object;
            promise.then(function(data){
                console.log($scope.tasksToDo);
            })
        }
        $scope.profile = {};

        $scope.users = [];
        $scope.init = function(){

            $scope.profile.date = new Date();
        }

        $scope.$watch('profile.date',function(newVal, oldVal){
            if(newVal != oldVal){
                //2014-10-20
                var date = newVal.getFullYear()+"-"+(newVal.getMonth()+1)+"-"+newVal.getDate();
                $scope.loadTasks(date);
            }
        })
        $scope.init();
    }]);