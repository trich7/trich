'use strict';

angular.module('starter').
    factory('TasksFactory', ['Restangular', function(Restangular ) {
        var TasksFactory = {};
        TasksFactory.editAction = function(task){
            var $promise = Restangular.one("tasks").customPUT(task,task.id);
            $promise.then(function(data){

            });
            return $promise;
        }
        TasksFactory.getAction = function(id){
            var $promise = Restangular.one('tasks',id).get();
            return $promise;
        }
        TasksFactory.ListAction = function(params){

            var $promise = Restangular.all('tasks').getList(params);
            $promise.then(function(data){

            });
            return $promise;
        }
        TasksFactory.AddAction = function(task,tasklist_id){
            var $promise = Restangular.all('tasks').post({
                "instructions":task.instructions,
                "name":task.name,
                "alert":task.alert*1,
                "due_by":task.due_by,
                "tasklist_id":tasklist_id
            })
            $promise.then(function(data){

            });
            return $promise;
        }



        return TasksFactory;
    }])