// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', [
    'ionic',
    'ui.router',
    'http-auth-interceptor',
    'starter.tasklist',
    'starter.tasks',
    'angular-auth',
    'starter.users',
    'ngCookies',
    'restangular',
    'ui.bootstrap',
    'ngProgress',
    'starter.locations',
    'starter.store',
    'starter.group'
    ]
)

.run(function($ionicPlatform,$cookieStore,$http,$rootScope,Restangular,ngProgress) {
  $ionicPlatform.ready(function($httpProvider) {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
      var runningXHR = 0;
      Restangular.addRequestInterceptor(function(data){
          runningXHR++;
          if(runningXHR == 1)
            ngProgress.start();
          return data;
      });
      Restangular.addResponseInterceptor(function(data){
          runningXHR--;
          if(runningXHR == 0)
            ngProgress.complete();
          return data;
      });
      var token = $cookieStore.get("token");
      $http.defaults.headers.common['Authorization'] = "Bearer "+ token;
  });

})

.config(function($stateProvider,RestangularProvider,$urlRouterProvider){
        RestangularProvider.setBaseUrl('http://tasks.app:8000/');
        //delete $httpProvider.defaults.headers.common['X-Requested-With'];
        // Now set up the states
        $stateProvider
            .state('main', {
                abstract:true,
                templateUrl: "app/main.html"
            });
        $urlRouterProvider.otherwise('/tasklist');

    });
