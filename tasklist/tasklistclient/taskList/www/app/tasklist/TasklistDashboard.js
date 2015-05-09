'use strict';
Date.prototype.getMonthWeek = function(){
    var firstDay = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
    return Math.ceil((this.getDate() + firstDay)/7);
}
angular.module('starter.tasklist')
    .config(function($stateProvider){
        $stateProvider
            .state('main.dashboard', {
                url: "/tasklist/:id/dashboard",
                templateUrl: "app/tasklist/tasklistDashboard.html",
                controller: 'TaskListDashboardController'
            });
    }).controller('TaskListDashboardController', ['$scope','$http','TaskListFactory','$stateParams','UserFactory',function($scope,$http,TaskListFactory,$stateParams,UserFactory) {
        $scope.assign = {};

        $scope.showassigner = false
        $scope.toggleassigner = function(){
            $scope.showassigner = !$scope.showassigner
        }


        $scope.loadTasklist = function(){
            var tasklistGet = TaskListFactory.getAction($stateParams.id);
            $scope.tasklist = tasklistGet.object;
            tasklistGet.promise.then(function (data) {
                var rrule = RRule.fromString(data.rrule);
                $scope.rrule = {};
                $scope.rrule.start = rrule.options.dtstart;
                $scope.rrule.end = rrule.options.until;
                $scope.rrule.interval = rrule.options.interval;


                var freq = rrule.options.freq;
                if (freq == RRule.DAILY) {
                    $scope.rrule.freq = "daily";
                } else if (freq == RRule.WEEKLY) {
                    $scope.rrule.freq = "weekly";
                } else if (freq == RRule.MONTHLY) {
                    $scope.rrule.freq = "monthly";
                } else if (freq == RRule.YEARLY) {
                    $scope.rrule.freq = "yearly";
                };
                $scope.rrule.text = rrule.toText();
            });
        }
        $scope.loadTasklist();

        $scope.assignUser = function(user,start,end    ){
            var userPromise = TaskListFactory.assignUser({
                "tasklist_id":$stateParams.id,
                "user_id":user,
                "start":start,
                "end":end
            })
            $scope.showassigner = false;
            $scope.tasklist.assigned_users.push(userPromise.$object);
        }
        $scope.removeAssignation = function(user_id,index) {
            var promise = TaskListFactory.deassignuser({
                "tasklist_id": $stateParams.id,
                "user_id": user_id
            });
            $scope.tasklist.assigned_users.splice(index,1)
        }

        var promise = UserFactory.ListAction();
        $scope.users = promise.$object;
        $scope.init = function(){

        }

    }]);