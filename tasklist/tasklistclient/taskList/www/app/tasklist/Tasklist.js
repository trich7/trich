'use strict';
Date.prototype.getMonthWeek = function(){
    var firstDay = new Date(this.getFullYear(), this.getMonth(), 1).getDay();
    return Math.ceil((this.getDate() + firstDay)/7);
}
angular.module('starter.tasklist', ['ui.router','ui.date'])
    .config(function($stateProvider){
        $stateProvider
            .state('main.tasklist', {
                url: "/tasklist",
                templateUrl: "app/tasklist/tasklist.html",
                controller: 'TaskListController'
            }).state('main.newtasklist', {
                url: "/tasklist/create",
                templateUrl: "app/tasklist/tasklist_new.html",
                controller: 'NewTaskListController'
            }).state('main.edittasklist', {
                url: "/tasklist/edit/:id",
                templateUrl: "app/tasklist/tasklist_new.html",
                controller: 'NewTaskListController'
            });
    }).controller('TaskListController', ['$scope','$http','TaskListFactory',function($scope,$http,TaskListFactory) {
        $scope.tasklists = TaskListFactory.ListAction();


    }]).controller('NewTaskListController', ['$scope','$http','TaskListFactory','$stateParams','$state','TasksFactory',function($scope,$http,TaskListFactory,$stateParams,$state,TasksFactory) {
        $scope.currentstate = $state.current.name;


        $scope.loadTasklist = function(){
            var tasklistGet = TaskListFactory.getAction($stateParams.id);
            $scope.tasklist = tasklistGet.object;
            tasklistGet.promise.then(function (data) {
                var rrule = RRule.fromString(data.rrule);
                console.log(rrule.options);
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

                var byweekday = rrule.options.byweekday;
                angular.forEach(byweekday,function(value,key){
                    $scope.rrule.byweekday[value].selected = true;
                });

                if(rrule.options.bymonthday[0] == null){
                    $scope.rrule.monthrepeat = "day_of_week";
                }

            });
        }



        $scope.createrrule = function(rrule){
            var freq, interval;
            var byweekday = [];

            //Set frequency
            if($scope.rrule.freq == "daily"){

                freq = RRule.DAILY;
            }else if($scope.rrule.freq == "weekly"){
                //Set weekday
                angular.forEach($scope.rrule.byweekday,function(value,key){
                    if(value.selected)
                        byweekday.push(value.rrule);
                })
                freq = RRule.WEEKLY;
            }else if($scope.rrule.freq == "monthly"){
                var today = new Date();
                var day =  $scope.rrule.byweekday[today.getDay()].rrule;
                if($scope.rrule.monthrepeat == "day_of_week")
                    byweekday = [day.nth(today.getMonthWeek())];
                freq = RRule.MONTHLY;
            }else if($scope.rrule.freq == "yearly"){
                freq = RRule.YEARLY;
            }

            //Set Interval
            interval = $scope.rrule.interval;



            console.log(new Date($scope.rrule.start.getFullYear(), $scope.rrule.start.getMonth(), $scope.rrule.start.getDate()));
            var rule = new RRule({
                freq: freq,
                interval: interval,
                byweekday: byweekday,
                dtstart: new Date($scope.rrule.start.getFullYear(), $scope.rrule.start.getMonth(), $scope.rrule.start.getDate()),
                until: new Date($scope.rrule.end.getFullYear(), $scope.rrule.end.getMonth(), $scope.rrule.end.getDate()),
            });
            $scope.rrule.text = rule.toText();
            return rule.toString();
        }
        $scope.$watch("rrule",function(){
            $scope.createrrule();
        },true)
        $scope.saveTaskList = function(){
            TaskListFactory.editAction(
                {
                    "name":$scope.tasklist.name,
                    "rrule":$scope.createrrule(),
                    "id":$stateParams.id
                }
            ).then(function(data){
                    $state.go("main.dashboard",{"id":$stateParams.id})
            });
        }
        $scope.createTaskList = function(){
                TaskListFactory.AddAction({
                    "name":$scope.tasklist.name,
                    "rrule":$scope.createrrule()
                }).then(function(data){

                    $state.go("main.dashboard",{"id":data.id})
                });
        }
        $scope.init = function(){
            $scope.tasklist = {};
            $scope.trigger = "date";
            $scope.rrule = {};
            $scope.rrule.freq = "weekly";
            $scope.rrule.start = new Date();
            $scope.rrule.end = new Date();
            $scope.rrule.interval = 1;
            $scope.rrule.monthrepeat = "day_of_month";
            $scope.rrule.byweekday = [

                {
                    "day":"Mon",
                    "selected":false,
                    "rrule":RRule.MO
                },
                {
                    "day":"Tue",
                    "selected":false,
                    "rrule":RRule.TU
                },
                {
                    "day":"Wed",
                    "selected":false,
                    "rrule":RRule.WE
                },
                {
                    "day":"Thu",
                    "selected":false,
                    "rrule":RRule.TU
                },
                {
                    "day":"Fri",
                    "selected":false,
                    "rrule":RRule.FR
                },
                {
                    "day":"Sat",
                    "selected":false,
                    "rrule":RRule.SA
                },
                {
                    "day":"Sun",
                    "selected":false,
                    "rrule":RRule.SU
                }
            ];
            $scope.defaultData = {};
            $scope.defaultData.days_repeat = [];
            for(var i = 1;i<31;i++){
                $scope.defaultData.days_repeat.push(i);
            }

            if($state.current.name == "main.edittasklist"){
                $scope.loadTasklist();
            }
        }
        $scope.init();

        $scope.configureDate = function(){
            $scope.today = function() {
                $scope.dt = new Date();
            };
            $scope.today();

            $scope.clear = function () {
                $scope.dt = null;
            };


            $scope.toggleMin = function() {
                $scope.minDate = $scope.minDate ? null : new Date();
            };
            $scope.toggleMin();

            $scope.datepicker = {};
            $scope.datepicker2 = {};
            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.datepicker.isopen = true;
            };
            $scope.open2 = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.datepicker2.isopen = true;
            };
            $scope.dateOptions = {
                formatYear: 'yy',
                startingDay: 1
            };

            $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            $scope.format = $scope.formats[0];
        }
        $scope.configureDate();

    }]);
