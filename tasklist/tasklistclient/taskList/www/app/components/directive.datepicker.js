'use strict';
angular.module('starter').directive('datePickerDropdown', function($state) {
    return {
        restrict: 'E',
        scope: {
            dateModel: '='
        },
        controller: function($scope){
            $scope.datepicker = {};
            $scope.datepicker.isopen = false;
            $scope.open = function($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.datepicker.isopen = true;
            };
        },
        link: function(scope, elem, attrs) {
            //once Angular is started, remove class:

        },
        templateUrl: 'app/components/directive.datepicker.html'
    }
})