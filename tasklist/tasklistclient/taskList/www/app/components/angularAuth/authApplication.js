(function() {
    'use strict';
    angular.module('angular-auth', [
        'http-auth-interceptor'
    ])
    /**
     * This directive will find itself inside HTML as a class,
     * and will remove that class, so CSS will remove loading image and show app content.
     * It is also responsible for showing/hiding login form.
     */
        .directive('authApplication', function($state) {
            return {
                restrict: 'C',
                link: function(scope, elem, attrs) {
                    //once Angular is started, remove class:
                    elem.removeClass('waiting-for-angular');

                    var login = elem.find('#login-holder');
                    var main = elem.find('#content');
                    //login.hide();

                    scope.$on('event:auth-loginRequired', function() {main.hide();
                        $state.go("main.login");
                    });
                    scope.$on('event:auth-loginConfirmed', function() {
                        main.show();
                        login.slideUp();
                    });
                }
            }
        }).controller('LoginController', function ($scope, $http, authService,$state,$cookieStore) {
            $scope.submit = function() {
                $http.post('http://tasks.app:8000/oauth/access_token? grant_type=password&client_id=testclient& client_secret=testpass&username='+$scope.username+'&password='+$scope.password).success(function(data) {
                    $http.defaults.headers.common['Authorization'] = "Bearer "+ data.access_token;
                    $cookieStore.remove("token");
                    $cookieStore.put("token",data.access_token);
                    authService.loginConfirmed();
                    $state.go("main.tasklist");
                });
            }
        }).config(function($stateProvider){
            $stateProvider
                .state('main.login', {
                    url: "/login",
                    templateUrl: "app/components/angularAuth/login.html"
                });
        });;
})();