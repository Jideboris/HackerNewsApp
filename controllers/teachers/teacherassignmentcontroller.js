eAssessorApp.controller('teacherassignmentcontroller', function ($scope, $location, $rootScope,
    $cookieStore,
    topicservice,
    teacherservice, menuservice, $sce) {
    $scope.message = '';
    $scope.recordfound = true;

    $scope.hide = true;

    const user = $cookieStore.get('globals');
    const authdata = user.currentUser.authdata;

    $scope.teacherlevels = getteachersubjects();
    $scope.todaydate = $sce.trustAsHtml(getcurrentdate());
    $scope.assignmentuploaded = "Upload assignment"
    $scope.assignmentsetupmenu = menuservice.assignmentsetup().map(function (item) {
        if (item.id === "#teacherstudentassignment") {
            item.style = "list-group-item active";
        }
        return item;
    });
    $scope.processshow = function (item) {
        if (item === 'A') {
            $scope.hide = true;
        }
        else {
            $scope.hide = false;
        }
    }
    function getprocessedtodayteachersubjectassignment(selectedsubject, selectedlevel) {
        let registeredattendance = [];
        teacherservice.getteacherstudentsubjectattendance(selectedsubject, selectedlevel, authdata)
            .then(function (registered) {
                if (registered.data != 'zero attendance') {
                    registeredattendance = registered.data;
                }
                else {
                    $scope.message = "No registered attendance!";
                }
                teacherservice.gettodayteachersubjectassignment(selectedsubject, selectedlevel, authdata)
                    .then(function (assignments) {
                        if (assignments.data !== 'No record found' && assignments.data.assignments !== undefined) {
                            $scope.todayteachersubjecttest = assignments.data.assignments.map(function (item) {
                                if (item.selected) {
                                    item.selected = true;
                                }
                                return item;
                            });
                        }
                    })
                $scope.todaystudentteachersubjectassignment = registeredattendance;
            })
        $scope.message = '';
    }

    $scope.loadassignment = function (id) {
        let selectedlevel = $scope.selectedlevel.replace('/', '-');
        let selectedsubject = $scope.selectedsubject;
        teacherservice.getanassignmentdetails(id, selectedlevel, selectedsubject, authdata).then(function (resp) {
            teacherservice.getanassignment(id, selectedlevel, selectedsubject, authdata).then(function (response) {
                let blob = new Blob(([response.data]), { type: resp.data.filetype });
                if (navigator.appVersion.toString().indexOf('.NET') > 0)
                    window.navigator.msSaveBlob(blob, resp.data.filename);
                else {
                    var link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                    link.href = URL.createObjectURL(blob);
                    link.download = resp.data.filename;
                    link.click();
                }
            });
        });
    }

    $scope.removeassignment = function (id) {
        let selectedlevel = $scope.selectedlevel.replace('/', '-');
        let selectedsubject = $scope.selectedsubject;
        teacherservice.getleftoverassignments(id, selectedlevel, selectedsubject, authdata).then(function (data) {
            if (data.data == 'done') {
                getteacherstudentarchivedassignment(selectedsubject, selectedlevel);
            }
        });
    }

    $scope.selectAll = function (it) {
        $scope.todaystudentteachersubjectassignment = selectcheckboxes(it, $scope.todaystudentteachersubjectassignment);
    };

    $scope.processsubjecttopics = function () {
        let selectedlevel = $scope.selectedlevel.replace('/', '-');
        let selectedsubject = $scope.selectedsubject;
        if (typeof (selectedlevel) != 'undefined' && typeof (selectedsubject) != 'undefined') {
            getprocessedtodayteachersubjectassignment(selectedsubject, selectedlevel);
            getteacherstudentarchivedassignment(selectedsubject, selectedlevel);
        } else {
            $scope.message = "Please ensure that both level and subject are selected!";
        }
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
    $scope.Reassigned = function (model) {
        var live = $scope.teacherassignmentarchive.filter(function (val) {
            return val.status === "live";
        });
        if (model.status === "done") {
            $scope.message = "";
            let donemodel = model.id;
            let livemodel = live[0].id;
            let selectedlevel = $scope.selectedlevel.replace('/', '-');
            let selectedsubject = $scope.selectedsubject;
            teacherservice.processreassignment(donemodel, livemodel, authdata).then(function (data) {
                if (data.data == 'done') {
                    getteacherstudentarchivedassignment(selectedsubject, selectedlevel);
                }
            });
        }
        else {
            $scope.message = 'Live assignment cannot be reassigned!!'
        }
    }
    $scope.processTeacherAssignmentForStudents = function () {
        let attendance = [];
        let detailattendance = $scope.todaystudentteachersubjectassignment;
        let subject = $scope.selectedsubject;
        let level = $scope.selectedlevel;
        let file = $scope.assignmentFile;
        let assignmentdescription = $scope.assignmentdescription;
        teacherservice.checkAssignmentDescription(level, subject, assignmentdescription, authdata).then(function (resp) {
            let isvalid = false;
            if (typeof (resp.data) != 'undefined' && resp.data != '') {
                isvalid = JSON.parse(resp.data);
            }
            if (!isvalid && assignmentdescription != '' && typeof (assignmentdescription) != 'undefined') {
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
                
                if (typeof (subject) != 'undefined' && typeof (level) != 'undefined' && typeof (file) != 'undefined' && attendance.length > 0) {
                    let attended = JSON.stringify(attendance)
                    teacherservice.addtodayteachersubjectassignment(attended, subject, level, file, assignmentdescription, authdata).then(function (data) {
                        if (data.data.insertedCount > 0) {
                            $scope.message = 'Set up completed!!'
                            teacherservice.gettodayteachersubjectassignment(subject, level, authdata).then(function (response) {
                                getassignmentsfromarchieve(response);
                            });
                        }
                        else {
                            $scope.message = 'Submission failed!!'
                        }
                    });
                }
                else {
                    $scope.message = 'Assignment not uploaded!!';
                }
            }
            else {
                $scope.message = 'Your assignment description must be unique';
            }
        })
    }
    function getteachersubjects() {
        teacherservice.getschoolteachersubjects(authdata).then(function (response) {
            let output = prepareteachers(response);
            $scope.teachersubjects = output.teachsubjects;
            $scope.teacherlevels = output.teachlevels;
        })
    };
    function getassignmentsfromarchieve(response) {
        let teacherassignments = [];
        let isrecordfound = false;
        if (response.data !== 'No record found') {
            isrecordfound = true;
            angular.forEach(response.data, function (archivedassignmnet) {
                teacherassignments.push({ description: archivedassignmnet.assignments, dateadded: archivedassignmnet.dateadded, id: archivedassignmnet.id, status: archivedassignmnet.status });
            });
        }
        $scope.recordfound = !isrecordfound;
        teacherassignments = sortByKey(teacherassignments, 'status');
        $scope.teacherassignmentarchive = teacherassignments.reverse();
    }
    function getteacherstudentarchivedassignment(subject, level) {
        teacherservice.gettodayteachersubjectassignment(subject, level, authdata).then(function (response) {
            getassignmentsfromarchieve(response);
        });
    };
});