eAssessorApp.controller('locationcontroller', function ($scope, locationservice, $location, $routeParams) {
    var id = $routeParams.id;
    var desc = '';
    $scope.addLocation = function () {
       if (typeof ($scope.locationid) === 'undefined') {
            desc = $('#discription').val();
            locationservice.addLocation(desc);
        } else {
            desc = $('#discription').val();
            locationservice.updateLocation(desc, id);
        }
        $location.path('/admin');
    }

    if (typeof (id) != 'undefined') {
        locationservice.getLocationsById(id).then(function (response) {
            $scope.itemlocationdescription = response.data;
            $scope.locationdescription = response.data.description;
            $scope.locationid = response.data._id;
        });
    }
});