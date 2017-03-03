
eAssessorApp.service('subjectservice', ['$http', function ($http) {
    var urlsubject = 'http://localhost:3000/subjects';
    var urlgetbyid = 'http://localhost:3000/subjectbyid';
    var urladdsubject = 'http://localhost:3000/addsubject';
    var urlupdate = 'http://localhost:3000/updatesubject';
    var urldelete = 'http://localhost:3000/deletesubject';

    this.addsubject = function (desc, level) {
        return $http.post(urladdsubject, { description: desc, level: level }).success(function (data) {
            return data;
        });
    };
    this.updatesubject = function (desc, level, id) {
        return $http.put(urlupdate + '/' + id, { description: desc, level: level }).success(function (data) {
        }).error(function (data) {
        });
    }
    this.getsubjectbyid = function (id) {
        return $http.get(urlgetbyid + '/' + id).success(function (data) {
        }).error(function (data) {

        });
    };
    this.getSubjects = function (level1, level2, level3) {
        return $http.get(urlsubject + '/' + level1 + '/' + level2 + '/' + level3).success(function (data) {
            return data;
        });
    };
    this.deletesubject = function (id) {
        return $http.delete(urldelete + '/' + id).success(function (data) { }).error(function (data) { });
    };

}]);
