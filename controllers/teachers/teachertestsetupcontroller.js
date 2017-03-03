eAssessorApp.controller('teachertestsetupcontroller', function ($scope, $cookieStore,
    topicservice, teacherservice,menuservice, $sce) {
    $scope.message = '';

    var identities = [];

    var user = $cookieStore.get('globals');
    var authdata = user.currentUser.authdata;

    $scope.teacherlevels = getteachersubjects();
    $scope.todaydate = $sce.trustAsHtml(getcurrentdate());

    $scope.testsetupmenu = menuservice.assignmentsetup().map(function (item) {
        if (item.id === "#teacher") {
            item.style = "list-group-item active";
        }
        return item;
    });

    function getprocessedtodayteachersubjecttest() {
        let selectedtopics = [];
        let availabletopics = [];
        let registeredattendance = [];
        let selectedlevel = $scope.selectedlevel.replace('/', '-');
        let selectedsubject = $scope.selectedsubject;
        if (typeof (selectedlevel) != 'undefined' && typeof (selectedsubject) != 'undefined') {
            teacherservice.getteacherstudentsubjectattendance(selectedsubject, selectedlevel, authdata)
                .then(function (registered) {
                    if (registered.data != 'zero attendance') {
                        registeredattendance = registered.data.map(function (item) {
                            item.selected = false;
                            return item;
                        });
                    }
                    else {
                        $scope.message = "No registered attendance!";
                    }
                    teacherservice.gettodayteachersubjecttest(selectedsubject, selectedlevel, authdata)
                        .then(function (res) {
                            let tops = angular.fromJson(res.data.processedtopics);
                            if (res.data !== 'No record found') {
                                let attendance = angular.fromJson(res.data.attendance);
                                $scope.todayteachersubjecttest = attendance;
                                sortcolumns(tops);
                            }
                            else {
                                topicservice.getlevelsubjecttopics(selectedsubject, selectedlevel).then(function (respose) {
                                    availabletopics = respose.data.map(function (item) {
                                        item.selected = false;
                                        return item;
                                    });
                                    sortcolumns(availabletopics);
                                    $scope.todayteachersubjecttest = registeredattendance;
                                })
                            }
                        })
                })
            $scope.message = '';
        }
        else {
            $scope.message = "Please ensure that both level and subject are selected!";
        }
    }
    $scope.selectAll = function (it) {
        $scope.todayteachersubjecttest = selectcheckboxes(it, $scope.todayteachersubjecttest);
    };

    $scope.processsubjecttopics = function () {
        getprocessedtodayteachersubjecttest();
    }
    function sortcolumns(finaltopics) {
        let teachersubjecttopics = [];
        angular.forEach(finaltopics, function (item) {
            if (typeof (item.topicid) !== 'undefined' && item.topicid !== null) {
                item._id = item.topicid;
            }
            teachersubjecttopics.push({ selected: item.selected, id: item._id, description: item.description });
        });
        $scope.teachersubjecttopics = teachersubjecttopics;
    }

    $scope.teachertodaysetuptest = function () {
        let processedtopics = [];
        let attendance = [];
        let detailattendance = $scope.todayteachersubjecttest;
        angular.forEach($scope.teachersubjecttopics, function (item) {
            let topicId = item.id;
            let description = item.description;
            let selected = item.selected;
            let topic = { topicid: topicId, description: description, selected: selected }
            processedtopics.push(topic);
        });
        let subject = $scope.selectedsubject;
        let level = $scope.selectedlevel;
        angular.forEach(detailattendance, function (item) {
            if (typeof (item.studentId) !== 'undefined' && item.studentId !== null) {
                item.studentid = item.studentId;
            }
            let studentid = item.studentid;
            let selected = item.selected;
            let fullname = item.fullname;
            let dob = item.dob;
            let attend = { studentid: studentid, selected: selected, fullname: fullname, dob: dob }
            attendance.push(attend);
        });
        if (typeof (subject) != 'undefined' && typeof (level) != 'undefined') {
            let attend = JSON.stringify(attendance);
            let protopics = JSON.stringify(processedtopics);
            teacherservice.addtodayteachersubjecttest(attend, subject, level, protopics, authdata).then(function (response) {
                if (response.data.status == 'passed') {
                    getprocessedtodayteachersubjecttest();
                    $scope.message = 'Set up completed!!'
                }
                else {
                    $scope.message = 'Submission failed!!'
                }
            })
        }

    }
    
    function getteachersubjects() {
        teacherservice.getschoolteachersubjects(authdata).then(function (response) {
            let output = prepareteachers(response);
            $scope.teachersubjects = output.teachsubjects;
            $scope.teacherlevels = output.teachlevels;
        })
    };

});