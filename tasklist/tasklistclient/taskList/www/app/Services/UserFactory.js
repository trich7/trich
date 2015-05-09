'use strict';

angular.module('starter').
    factory('UserFactory', ['Restangular', function(Restangular ) {
        var UserFactory = {};


        UserFactory.getDefaultData = function(){

        }
        UserFactory.editAction = function(user){
            var $promise = Restangular.one("users").customPUT(user,user.id);
            $promise.then(function(data){

            });
            return $promise;
        }
        UserFactory.getAction = function($id){
            var $promise = Restangular.one('users',$id).get();
            $promise.then(function(data){

            });
            return {
                object:$promise.$object,
                promise:$promise
            };
        }
        UserFactory.ListAction = function(){
            var $promise = Restangular.all('users').getList();
            return $promise;
        }
        UserFactory.AddAction = function(user){
            var $promise = Restangular.all('users').post({
                "username":user.username,
                "email":user.email
            })
            $promise.then(function(data){

            });
            return $promise;
        }



        return UserFactory;
    }]);