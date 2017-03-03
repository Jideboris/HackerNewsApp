eAssessorApp.controller('admincontroller', function ($scope, menuservice, locationservice, adminservice, $location, $routeParams) {
    var id = $routeParams.id;
    $scope.setItemEditRemove = function (id) {
        locationservice.deletelocation(id);
        getLocal();
    };
    function getLocal() {
        locationservice.getLocations().then(function (response) {
            $scope.locations = response.data;
        });
    }
    $scope.locations = getLocal();
    $scope.adminmenus = menuservice.admins().map(function (item) {
        let url = $location.url();
        let add = url.replace('/', '');
        let dataitem = item.id.replace('#', '');
        if (dataitem === add) {
            item.style = "list-group-item active";
        }
        return item;
    });
    $scope.editdeleteadmin = function (id) {
        adminservice.deleteadmin(id);
        getadmin();
    };
    function getadmin() {
        adminservice.getadmins().then(function (response) {
            $scope.admins = response.data;
        });
    }
    $scope.admins = getadmin();

    $scope.addadmin = function () {
        if (typeof (id) === 'undefined') {
            adminservice.addadmin($scope.firstname, $scope.lastname, $scope.email, $scope.username, $scope.password);
        } else {
            adminservice.updateadmin($scope.firstname, $scope.lastname, $scope.email, $scope.username, $scope.password, $scope.locked, id);
        }
        $location.path('/adminsetup');

    }
    if (typeof (id) != 'undefined') {
        adminservice.getadminbyid(id).then(function (response) {
            $scope.firstname = response.data.firstname;
            $scope.lastname = response.data.lastname;
            $scope.email = response.data.email;
            $scope.username = response.data.username;
            $scope.password = response.data.password;
            $scope.locked = response.data.locked;
        });
    }
});
