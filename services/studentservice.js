eAssessorApp.service('studentservice', ['$http', function ($http) {
    this.getstudentregisteredsubjects = function (authdata) {
        let url = path + '/studentregsubjects' + '/' + authdata;
        return $http.get(url).success(function (response) {
            return response;
        });
    } 
}]);
