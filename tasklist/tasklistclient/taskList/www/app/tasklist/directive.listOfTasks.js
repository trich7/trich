'use strict';
Date.prototype.getMonthWeek = function(){
    var firstDay = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
    return Math.ceil((this.getDate() + firstDay)/7);
}
angular.module('starter.tasklist').directive('listOfTasks', function($state) {
    return {
        restrict: 'E',
        scope: {
            tasklist: '='
        },
        controller: function($scope,TasksFactory){
            $scope.$watch('tasklist',function(data){
                angular.forEach($scope.tasklist.tasks,function(value){
                    if(value.alert ==1 )
                        value.alert = true;
                    else
                        value.alert =false;
                });
            },true)
            $scope.toggleAlarm = function(task){
                TasksFactory.editAction(task);
            }
            $scope.editTask = function(task){
                $state.go("main.tasksedit",{tasklist_id:task.tasklist_id,task_id:task.id});
            }
        },
        link: function(scope, elem, attrs) {
            //once Angular is started, remove class:

        },
        templateUrl: 'app/tasklist/directive.tasksInList.html'
    }
})