eAssessorApp.controller('teacherstudentscorecontroller', function ($scope, $cookieStore,
    topicservice, teacherservice, menuservice, $sce) {
    $scope.message = '';

    $scope.hide = true;
    var identities = [];

    var user = $cookieStore.get('globals');
    var authdata = user.currentUser.authdata;

    var datetoday = $sce.trustAsHtml(getcurrentdate());

    $scope.teacherlevels = getteachersubjects();
    $scope.todaydate = datetoday;
    $scope.ispercentage = false;

    $scope.studentscoremenu = menuservice.assignmentsetup().map(function (item) {
        if (item.id === "#studenttestscores") {
            item.style = "list-group-item active";
        }
        return item;
    });
    $scope.showtest = function (tag) {
        if (tag === 'O') {
            $scope.hide = true;
        }
        else if (tag === 'T') {
            $scope.hide = false;
        }
    }
   // $scope.selecteddate = datetoday;
    function computepercentages(total, score) {
        return Math.round(score / total * 100);
    }
    $scope.processassignments = function () {
        let selectedlevel = $scope.selectedlevel;
        let selectedsubject = $scope.selectedsubject;
        let selectedassignment = $scope.selectedassignment;
        if (typeof (selectedlevel) != 'undefined' && typeof (selectedassignment) != 'undefined' && typeof (selectedsubject) != 'undefined') {
            $scope.message = '';
            teacherservice.getassignmentsscores(selectedlevel, selectedsubject, selectedassignment, authdata).then(function (resp) {
                if (typeof (resp.data) != undefined && resp.data != '') {
                    $scope.ispercentage = true;
                    $scope.assignmenttotal = resp.data.totalscores;
                    $scope.studenttestassignments = angular.fromJson(resp.data.assignmentdetails);
                }
            });
        }
        else {
            $scope.message = "Please ensure you select assignment,level and subject";
        }
    }
    $scope.saveassignmentscores = function () {
        let selectedlevel = $scope.selectedlevel;
        let selectedsubject = $scope.selectedsubject;
        let assignmentscores = $scope.studenttestassignments;
        let selectedassignment = $scope.selectedassignment;
        let totalscores = $scope.assignmenttotal;
        if (typeof (selectedlevel) != 'undefined' && typeof (selectedassignment) != 'undefined' && typeof (selectedsubject) != 'undefined') {
            $scope.message = '';
            let withpercentages = assignmentscores.map(function (item) {
                item.assignmentpercentage = computepercentages(totalscores, item.assignmentscore);
                return item;
            });
            let assignmentdetails = angular.toJson(withpercentages);
            teacherservice.addassignmentsscores(selectedlevel, selectedsubject, selectedassignment, assignmentdetails, totalscores, authdata).then(function (resp) {
                if (typeof (resp.data) != undefined && resp.data != '') {
                    $scope.ispercentage = true;
                    $scope.assignmenttotal = resp.data.totalscores;
                    $scope.studenttestassignments = angular.fromJson(resp.data.assignmentdetails);
                }
            });
        }
        else {
            $scope.message = "Please ensure you select assignment,level and subject";
        }
    }
    function getonlinetests() {
        if (typeof ($scope.selectedlevel) != 'undefined' && typeof ($scope.selectedsubject) != 'undefined') {
            let selectedlevel = $scope.selectedlevel.replace('/', '-');
            let selectedsubject = $scope.selectedsubject;
            teacherservice.getteacherstudentsubjecttest(selectedlevel, selectedsubject, authdata).then(function (resp) {
                let onlinetest = [];
                if (resp.data != 'No record found') {
                    angular.forEach(resp.data, function (item) {
                        onlinetest.push(item);
                    })
                }
                else {
                    onlinetest.push({ description: 'No record found!' });
                }
                $scope.studentonlinetests = onlinetest;
            });
        }
    }
    function getstudentassignments() {
        if (typeof ($scope.selectedlevel) != 'undefined' && typeof ($scope.selectedsubject) != 'undefined') {
            let selectedlevel = $scope.selectedlevel.replace('/', '-');
            let selectedsubject = $scope.selectedsubject;
            teacherservice.getallassignmentsdetails(selectedlevel, selectedsubject, authdata).then(function (resp) {
                $scope.studentassignments = resp.data;
            });
        }
    }
    function getprocessedtodayteachersubjecttest() {
        let selectedtopics = [];
        let availabletopics = [];
        let registeredattendance = [];

        if (typeof ($scope.selectedlevel) != 'undefined' && typeof ($scope.selectedsubject) != 'undefined') {
            let selectedlevel = $scope.selectedlevel.replace('/', '-');
            let selectedsubject = $scope.selectedsubject;
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
                                $scope.studenttestassignments = attendance;

                            }
                            else {
                                topicservice.getlevelsubjecttopics(selectedsubject, selectedlevel).then(function (respose) {
                                    availabletopics = respose.data.map(function (item) {
                                        item.selected = false;
                                        return item;
                                    });

                                    $scope.studenttestassignments = registeredattendance;
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
    $scope.processsubjecttopics = function () {
        getprocessedtodayteachersubjecttest();
        getstudentassignments();
        getonlinetests();
    }

    $scope.teachertodaysetuptest = function () {
        let processedtopics = [];
        let attendance = [];
        let detailattendance = $scope.studenttestassignments;
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