eAssessorApp.controller('teacherattendancecontroller', function ($scope, $cookieStore, teacherservice,
    topicservice, menuservice, $sce) {
    $scope.message = '';
    buffer = [];
    reservouir = [];
    var identities = [];

    var user = $cookieStore.get('globals');
    var authdata = user.currentUser.authdata;

    $scope.teacherlevels = getteachersubjects();
    $scope.todaydate = $sce.trustAsHtml(getcurrentdate());

    $scope.attendancemenu = menuservice.assignmentsetup().map(function (item) {
        if (item.id === "#teacherstudentattendanceregister") {
            item.style = "list-group-item active";
        }
        return item;
    });

    function getprocessteacherstudentsubjectattendance() {
        teachersubjecttodaystudentattendance = [];
        $scope.teacherstudentsubjectlevelattaendance = [];
        var selectedlevel = $scope.selectedlevel.replace('/', '-');
        var selectedsubject = $scope.selectedsubject;
        if (typeof (selectedlevel) != 'undefined' && typeof (selectedsubject) != 'undefined') {
            teacherservice.getschoolteacherstudentsubjectregistration(selectedsubject, selectedlevel, authdata).then(function (registered) {
                if (registered.data.length > 0) {
                    teacherservice.getschoolstudentsbysubjectandlevel(selectedlevel, selectedsubject, authdata).then(function (resall) {
                        let currentteacherregisteredstudents = [];
                        let finalcurrentteacherregisteredstudents = [];
                        if (registered.data.length === 0) {
                            currentteacherregisteredstudents = prepareschoolstudent(resall.data.schoolstudent);
                        }
                        else {

                            currentteacherregisteredstudents = prepareschoolstudentsbysubjectandlevel(registered.data[0].registeredstudents);
                        }
                        finalcurrentteacherregisteredstudents = currentteacherregisteredstudents.map(function (item) {
                            item.selected = false;
                            item.dob = item.dateofbirth;
                            return item;
                        });
                        $scope.teacherstudentsubjectlevelattaendance = finalcurrentteacherregisteredstudents;

                    })
                }
                else {
                    $scope.message = "Please ensure you have registered students!";
                }
            })
        }
    }
    $scope.processteacherstudentsubjectattendees = function () {
        $scope.selectedAll = false;
        let selectedsubject = $scope.selectedsubject;
        let selectedlevel = $scope.selectedlevel;
        if (typeof (selectedsubject) != 'undefined' && typeof (selectedlevel) != 'undefined') {
            teacherservice.getteacherstudentsubjectattendance(selectedsubject, selectedlevel, authdata).then(function (response) {
                if (response.data == "zero attendance") {
                    getprocessteacherstudentsubjectattendance();
                    $scope.message = 'No attendance registered!!';
                }
                else {
                    $scope.teacherstudentsubjectlevelattaendance = response.data;
                    $scope.message = '';
                }
            })
        }
        else {
            $scope.message = "Please ensure that both level and subject are selected!";
        }
    }
    $scope.processteacherstudentsubjectattendance = function () {
        let selsubject = $scope.selectedsubject;
        let selectedlevel = $scope.selectedlevel;
        let selectedstudentattendance = $scope.teacherstudentsubjectlevelattaendance;
        let studentsattandanceregister = [];
        angular.forEach(selectedstudentattendance, function (item) {
            let desc = {
                selected: item.selected,
                dob: item.dateofbirth,
                fullname: item.fullname,
                studentId: item.studentid,
                teacherId: item.teacherid
            }
            studentsattandanceregister.push(desc);

        });
        if (typeof (selsubject) != 'undefined' && typeof (selectedlevel) != 'undefined') {
            teacherservice.addteacherstudentsubjectattendance(JSON.stringify(studentsattandanceregister),
                selsubject,
                selectedlevel,
                authdata).then(function (response) {
                    if (response.data.length > 0) {
                        $scope.teacherstudentsubjectlevelattaendance = JSON.parse(response.data[0].todayattendance);
                        $scope.message = 'saved successful!!';
                    }
                })
        }
        else {
            $scope.message = 'Please select both subject and level!';
        }
    }

    $scope.selectAll = function (it) {
        var isselected = '';
        if (typeof (it) == 'undefined') {
            isselected = true;
        }
        else {
            isselected = !it;
        }
        if (isselected) {
            angular.forEach($scope.teacherstudentsubjectlevelattaendance, function (item) {
                item.selected = isselected;
                reservouir.push(item.studentid);
                buffer.push(item);
            });
        }
        else {
            reservouir = [];
            buffer = [];
        }
    };
 
    function getteachersubjects() {
        teacherservice.getschoolteachersubjects(authdata).then(function (response) {
            var output = prepareteachers(response);
            $scope.teachersubjects = output.teachsubjects;
            $scope.teacherlevels = output.teachlevels;
        })
    };

});