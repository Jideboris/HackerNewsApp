eAssessorApp.controller('teachingmethodcontroller', function ($scope, $cookieStore,
    topicservice, teacherservice, menuservice, $sce) {
    $scope.message = '';
    $scope.scale = 0;
    var identities = [];
    var teachingmethodid = '';
    var user = $cookieStore.get('globals');
    var authdata = user.currentUser.authdata;
    var todaydate = getcurrentdate();
    $scope.submittedquestiondatefrom = todaydate;
    $scope.hide = true;
    $scope.teacherlevels = getteachersubjects();
    $scope.EditTeachingMethod = function (id) {
        teacherservice.getteachingmethodbyid(id, authdata).then(function (response) {
            let output = response.data[0];
            $scope.teachingmethodtext = output.teachingmethod;   
            $scope.selectedsubjecttopic = output.topic;
            $scope.selectedlevel = output.level;
            $scope.selectedsubject = output.subject;
            teachingmethodid = output._id;

        });
    }
    $scope.ProcessShowTeachingMethod = function (item) {
        if (item === 'A') {
            $scope.hide = true;
        }
        else {
            $scope.hide = false;
        }
    }
    $scope.RemoveTeachingMethod = function (id) {
        teacherservice.deleteteachingmethod(id, authdata).then(function (response) {
            if (response.data == 'deleted') {
                GetTeachingMethod();
            }
        });
    }
    $scope.testsetupmenu = menuservice.assignmentsetup().map(function (item) {
        if (item.id === "#teachingmethod") {
            item.style = "list-group-item active";
        }
        return item;
    });
    $scope.LoadTeachingMethod = function (id) {
        teacherservice.getteachingmethoddetails(id, authdata).then(function (resp) {
            if (resp.data.hasattachment) {
                $scope.message = "";
                teacherservice.getteachingmethodimage(id, authdata).then(function (response) {
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
            }
            else {
                $scope.message = "Selected teaching method has no attachment!!";
            }
        });
    }
    function GetTeachingMethod() {
        let level = $scope.selectedlevel;
        let subject = $scope.selectedsubject;
        if (typeof (level) != 'undefined' && typeof (subject) != 'undefined') {
            teacherservice.getteachingmethods(level, subject, authdata).then(function (response) {
                $scope.teachingmethodarchive = response.data.map(function (item) {
                    let output = {
                        id: item._id,
                        description: item.teachingmethod,
                        dateadded:item.dateadded
                    };
                    return output;
                });
            });
        }
    }
    $scope.SaveTeachingMethod = function () {
        let level = $scope.selectedlevel;
        let subject = $scope.selectedsubject;
        let topic = $scope.selectedsubjecttopic;
        let teachingmethodtext = $scope.teachingmethodtext;
        let teachingmethodattachment = $scope.teachingmethodattachment;
        if (typeof (level) != 'undefined' && typeof (subject) != 'undefined' && typeof (topic) != 'undefined') {
            $scope.message = '';
            if (typeof (teachingmethodtext) != 'undefined') {
                teacherservice.addteachingmethod(teachingmethodid, subject, level, topic, teachingmethodattachment, teachingmethodtext, authdata).then(function (data) {
                    if (data.data.insertedCount > 0) {
                        $scope.message = 'Teaching method added successfully!!'
                        GetTeachingMethod();
                    }
                    else {
                        $scope.message = 'Submission failed!!'
                    }
                });
            }
            else {
                $scope.message = "Teaching method cannot be empty!!!";
            }
        }
        else {
            $scope.message = "Please select level,subject and topic!!!";
        }

    }
    function GetProcessedTodayTeacherSubjectTest() {
        let selectedtopics = [];
        let availabletopics = [];
        let registeredattendance = [];
        let selectedlevel = $scope.selectedlevel.replace('/', '-');
        let selectedsubject = $scope.selectedsubject;
        if (typeof (selectedlevel) != 'undefined' && typeof (selectedsubject) != 'undefined') {
            teacherservice.gettodayteachersubjecttest(selectedsubject, selectedlevel, authdata)
                .then(function (res) {
                    let tops = angular.fromJson(res.data.processedtopics);
                    if (res.data !== 'No record found') {
                        sortcolumns(tops);
                    }
                    else {
                        topicservice.getlevelsubjecttopics(selectedsubject, selectedlevel).then(function (respose) {
                            availabletopics = respose.data.map(function (item) {
                                item.selected = false;
                                return item;
                            });
                            sortcolumns(availabletopics);
                        })
                    }
                })
            $scope.message = "";
        }
        else {
            $scope.message = "Please ensure that both level and subject are selected!";
        }
    }
    $scope.processsubjecttopics = function () {
        GetProcessedTodayTeacherSubjectTest();
        GetTeachingMethod();
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
    function getteachersubjects() {
        teacherservice.getschoolteachersubjects(authdata).then(function (response) {
            let output = prepareteachers(response);
            $scope.teachersubjects = output.teachsubjects;
            $scope.teacherlevels = output.teachlevels;
        })
    };

});