'use strict';

angular.module('starter').
    factory('TaskListFactory', ['Restangular','ngProgress', function(Restangular,ngProgress ) {
        var TaskListFactory = {};


        TaskListFactory.getDefaultData = function(){

        }
        TaskListFactory.editAction = function($tasklist){
            var $promise = Restangular.one("tasklists").customPUT($tasklist,$tasklist.id);
            $promise.then(function(data){

            });
            return $promise;
        }
        TaskListFactory.getAction = function($id){
            var $promise = Restangular.one('tasklists',$id).get();
            $promise.then(function(data){

            });
            return {
                object:$promise.$object,
                promise:$promise
            };
        }
        TaskListFactory.ListAction = function(){

            var $promise = Restangular.all('tasklists').getList();
            $promise.then(function(data){

            });
            return $promise.$object;
        }
        TaskListFactory.AddAction = function(tasklist){
            var $promise = Restangular.all('tasklists').post({
                "rrule":tasklist.rrule,
                "name":tasklist.name
            })
            $promise.then(function(data){

            });
            return $promise;
        }

        TaskListFactory.assignUser = function(params){
            var $promise = Restangular.one('tasklists',params.tasklist_id).all('assignation').post({
                "tasklist_id":params.tasklist_id,
                "user_id":params.user_id,
                "start":params.start,
                "end":params.end
            })
            return $promise;
        }

        TaskListFactory.deassignuser = function(params){
            var promise = Restangular.one('tasklists',params.tasklist_id).one('assignation',params.user_id).remove();
            promise.then(function(data){

            });
           return promise;
        }
        return TaskListFactory;
    }]);