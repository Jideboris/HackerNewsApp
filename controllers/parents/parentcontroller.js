eAssessorApp.controller('parentcontroller', function ($scope, $location, menuservice, commonservice) {
    $scope.parentmenus = menuservice.parentmenus().map(function (item) {
        let url = $location.url();
        let add = url.replace('/', '');
        let dataitem = item.id.replace('#', '');
        if (dataitem === add) {
            item.style = "list-group-item active";
        }
        return item;
    });
    $scope.passschoolsessions = commonservice.getpassschoolsessions();
});