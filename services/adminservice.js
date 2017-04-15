eAssessorApp.service('adminservice', ['$http', function ($http) {
    var urladd = path + '/addadmin';
    var urldelete = path + '/deleteadmin';
    var urlget = path + '/admins';
    var urlgetbyid = path + '/adminbyid';
    var urlupdate = path + '/updateadmin';

    this.addadmin = function (firstname, lastname, email, username, password) {

        $http.post(urladd, {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password,
            locked: false

        }).success(function (response) { }).error(function (response) { });
    };
    this.deleteadmin = function (id) {
        return $http.delete(urldelete + '/' + id).success(function (data) { }).error(function (data) { });
    };

    this.getadmins = function () {
        return $http.get(urlget).success(function (data) {
            return data;
        });
    };
    this.updateadmin = function (firstname, lastname, email, username, password, locked, id) {
        return $http.put(urlupdate + '/' + id, {
            firstname: firstname,
            lastname: lastname,
            email: email,
            username: username,
            password: password,
            locked: locked
        }).success(function (data) {

        }).error(function (data) {
        });
    }
    this.getadminbyid = function (id) {
        return $http.get(urlgetbyid + '/' + id).success(function (data) {
        }).error(function (data) {

        });
    };
}]);
