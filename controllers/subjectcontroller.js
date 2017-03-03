eAssessorApp.controller('subjectcontroller', function ($scope, $location, menuservice, subjectservice, $routeParams) {
    var id = $routeParams.id;
    var desc = '';
    var level = '';
    function getSubjects() {
        subjectservice.getSubjects('O', 'AO', 'A').then(function (response) {
            $scope.subjects = response.data;
        });
    }
    $scope.adminmenus = menuservice.admins().map(function (item) {
        if (item.id === "#subject") {
            item.style = "list-group-item active";
        }
        return item;
    });
    $scope.addsubject = function () {
        desc = $("#discription").val();
        level = $("#level").val();
        if (typeof ($scope.subjectid) === 'undefined') {
            subjectservice.addsubject(desc, level);
        } else {
            subjectservice.updatesubject(desc, level, id);
        }
        $location.path('/subject');

    }
    $scope.subjects = getSubjects();

    if (typeof (id) != 'undefined') {
        subjectservice.getsubjectbyid(id).then(function (response) {
            $scope.itemsubject = response.data;
            $scope.subjectdescription = response.data.description;
            $scope.subjectlevel = response.data.level;
            $scope.subjectid = response.data._id;
        });
    }
    $scope.setItemEditRemove = function (id) {
        subjectservice.deletesubject(id);
        getSubjects();
    };
});