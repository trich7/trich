'use strict';

angular.module('starter.tasks', ['ui.router'])
    .config(function($stateProvider){
        $stateProvider
            .state('main.tasks', {
                url: "/tasks",
                templateUrl: "app/tasks/tasks.html",
                controller: 'tasksController'
            }).state('main.tasksadd', {
                url: "/tasklist/:tasklist_id/task",
                templateUrl: "app/tasks/tasks.html",
                controller: 'tasksController'
            }).state('main.tasksedit', {
                url: "/tasklist/:tasklist_id/task/:task_id",
                templateUrl: "app/tasks/tasks.html",
                controller: 'tasksController'
            });
    }).controller('tasksController', ['$scope','TasksFactory','$state','$stateParams',function($scope,TasksFactory,$state,$stateParams) {

        $scope.loadTask = function(){
            var promise = TasksFactory.getAction($stateParams.task_id);
            $scope.task = promise.$object;
            promise.then(function(data){

            })
        }


        $scope.editTask = function(){
            TasksFactory.editAction($scope.task);
        }
        $scope.createTask = function(){
            TasksFactory.AddAction($scope.task,$stateParams.tasklist_id);
            $state.go("main.edittasklist",{id:$stateParams.tasklist_id});
        }

        $scope.init = function(){
            $scope.task = {};
            if($state.current.name == "main.tasksedit"){
                $scope.loadTask();
            }
        }
        $scope.init();
    }]);