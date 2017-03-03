eAssessorApp.directive('countryDirective', function (locationFactory) {

    return {
        restrict: 'E',
        scope: {
            datasource: '=',
            add: '&',
        },
        controller: function ($scope) {
            ;
            //locationFactory.getLocations(function (locations) {
            //    ;
            //    $scope.locations = locations;

            //});

        },
        

        templateUrl: '/views/location.html'

    };
});