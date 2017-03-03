eAssessorApp.controller('teachercontroller', function ($scope, $cookieStore,
    teacherservice, menuservice, $sce) {
    $scope.message = '';
    buffer = [];
    reservouir = [];

    var user = $cookieStore.get('globals');
    var authdata = user.currentUser.authdata;

    $scope.teacherlevels = getteachersubjects();
    $scope.selectAll = function (it) {
        $scope.schoolsubjectlevelstudents = selectcheckboxes(it, $scope.schoolsubjectlevelstudents);
    };
    $scope.processteacherstudent = function () {
        getprocessteacherstudent();
    };
    $scope.studentregistrationmenu = menuservice.assignmentsetup().map(function (item) {
        if (item.id === "#teacherstudentregistration") {
            item.style = "list-group-item active";
        }
        return item;
    });
    function getprocessteacherstudent() {
        var selectedlevel = $scope.selectedlevel.replace('/', '-');
        if (typeof (selectedlevel) != 'undefined' && typeof ($scope.selectedsubject) != 'undefined') {
            teacherservice.getschoolteacherstudentsubjectregistration($scope.selectedsubject, selectedlevel, authdata).then(function (response) {
                teacherservice.getschoolstudentsbysubjectandlevel(selectedlevel, $scope.selectedsubject, authdata).then(function (resall) {
                    if (response.data.length == 0) {
                        $scope.schoolsubjectlevelstudents = preparedefaultschoolstudentsbysubjectandlevel(resall.data);
                    }
                    else {                
                        $scope.schoolsubjectlevelstudents = prepareschoolstudentsbysubjectandlevel(response.data[0].registeredstudents);
                    }
                })

            });
            $scope.message = '';
        }
        else {
            $scope.message = "Please ensure that both level and subject are selected!";
        }
    }

    $scope.registersubjectlevelstudents = function () {
        let selsubject = $scope.selectedsubject;
        let selectedlevel = $scope.selectedlevel;
        let selectedstudent = $scope.schoolsubjectlevelstudents;
        let registeredstudents = [];
        angular.forEach($scope.schoolsubjectlevelstudents, function (item) {
            let desc = {
                selected: item.selected,
                dob: item.dateofbirth,
                fullname: item.fullname,
                studentId: item.studentid,
                teacherId: item.teacherid
            }
            registeredstudents.push(desc);
        });
        if (typeof (selsubject) != 'undefined' && typeof (selectedlevel) != 'undefined') {
            let regstudents = angular.toJson(registeredstudents);
            teacherservice.addschoolstudentsbysubjectandlevel(regstudents,
                selectedlevel,
                selsubject,
                registeredstudents[0].teacherId,
                authdata).then(function (response) {
                    if (response.data == 'passed') {
                        getprocessteacherstudent();
                        $scope.message = 'saved successful!!';
                    }
                })
        }
        else {
            $scope.message = 'Registration failed,please subject and level!!!';
        }

    }
    function preparedefaultschoolstudentsbysubjectandlevel(data) {
        var schoolstudents = data.schoolstudent;
        prepareschoolstuduent = [];
        for (var i = 0; i < schoolstudents.length; i++) {
            var identity = '';
            var fullname = schoolstudents[i].schoolstudent.fullname;
            var level = schoolstudents[i].schoolstudent.selectedlevel;
            var subject = $scope.selectedsubject;
            var dateofbirth = schoolstudents[i].schoolstudent.dateofbirth;
            var studentid = schoolstudents[i].id;
            var teacherid = data.teacherid;
            var selected = false;

            prepareschoolstuduent.push({
                identity: identity,
                studentid: studentid,
                fullname: fullname,
                level: level,
                subject: subject,
                dateofbirth: dateofbirth,
                teacherid: teacherid,
                selected: selected
            });
        }

        return prepareschoolstuduent;
    }

    function getteachersubjects() { 
        teacherservice.getschoolteachersubjects(authdata).then(function (response) {
            var output = prepareteachers(response);
            $scope.teachersubjects = output.teachsubjects;
            $scope.teacherlevels = output.teachlevels;

        })
    };

});