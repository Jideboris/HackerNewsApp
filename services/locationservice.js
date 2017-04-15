
eAssessorApp.service('locationservice', ['$http', function ($http) {
    var urladd = path + '/addlocation';
    var urldelete = path + '/deletelocation';
    var urlget = path + '/locations';
    var urlgetbyid = path + '/locationbyid';
    var urlupdate = path + '/updatelocation';

    this.addLocation = function (data) {
        $http.post(urladd, {
            description: data
        }).success(function (response) { }).error(function (response) { });
    };
    this.deletelocation = function (id) {
        return $http.delete(urldelete + '/' + id).success(function (data) { }).error(function (data) { });
    };

    this.getLocations = function () {
        return $http.get(urlget).success(function (data) {
            return data;
        });
    };
    this.updateLocation = function (desc, id) {
        return $http.put(urlupdate + '/' + id, { description: desc }).success(function (data) {
        }).error(function (data) {
        });
    }
    this.getLocationsById = function (id) {
        return $http.get(urlgetbyid + '/' + id).success(function (data) {
        }).error(function (data) {

        });
    };
}]);
