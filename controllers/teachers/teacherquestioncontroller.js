eAssessorApp.controller('teacherquestioncontroller', function ($scope, $cookieStore,
    topicservice, teacherservice, menuservice, $sce) {
    $scope.message = '';
    $scope.scale = 0;
    var identities = [];
    var teacherquestionid = '';
    var user = $cookieStore.get('globals');
    var authdata = user.currentUser.authdata;
    var todaydate = getcurrentdate();
    $scope.submittedquestiondatefrom = todaydate;
    $scope.hide = true;
    $scope.teacherlevels = getteachersubjects();
    $scope.editquestion = function (id) {
        teacherservice.getteacherquestionsbyid(id, authdata).then(function (response) {
            let output = response.data[0];
            $scope.questiontext = output.question;
            $scope.scale = output.scale;
            $scope.questionanswer = output.answer;
            $scope.selectedsubjecttopic = output.topic;
            teacherquestionid = output._id;

        });
    }
    $scope.processshowquestion = function (item) {
        if (item === 'A') {
            $scope.hide = true;
        }
        else {
            $scope.hide = false;
        }
    }

    $scope.removequestion = function (id) {
        teacherservice.deleteteacherquestions(id, authdata).then(function (response) {
            if (response.data == 'deleted') {
                getteacherquestions();
            }
        });
    }
    $scope.testsetupmenu = menuservice.assignmentsetup().map(function (item) {
        if (item.id === "#teachersquestion") {
            item.style = "list-group-item active";
        }
        return item;
    });
    $scope.loadteacherquestion = function (id) {
        teacherservice.getteacherquestimagedetails(id, authdata).then(function (resp) {
            if (resp.data.hasattachment) {
                $scope.message = "";
                teacherservice.getteacherquestionimage(id, authdata).then(function (response) {
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
                $scope.message = "Selected question has no attachment!!";
            }
        });
    }

    function getteacherquestions() {
        let level = $scope.selectedlevel;
        let subject = $scope.selectedsubject;
        let selecteddate = $scope.submittedquestiondatefrom;
        selecteddate = selecteddate.replace("/", "-").replace("/", "-");
        if (typeof (level) != 'undefined' && typeof (subject) != 'undefined') {
            teacherservice.getteacherquestions(selecteddate, level, subject, authdata).then(function (response) {
                $scope.teacherquestionsarchive = response.data.map(function (item) {
                    let output = {
                        id: item._id,
                        description: item.question,
                        answer: item.answer,
                        status: item.status,
                        dateadded: item.dateadded,
                        topic: item.topic,
                        scale: item.scale
                    };
                    return output;
                });
            });
        }
    }
    $scope.filterwithdate = function () {
        let selecteddate = $scope.submittedquestiondatefrom.trim().replace("/", "-").replace("/", "-");
        let level = $scope.selectedlevel;
        let subject = $scope.selectedsubject;
        if (selecteddate != '' && typeof (level) != 'undefined' && typeof (subject) != 'undefined') {
            teacherservice.getteacherquestionsbydates(selecteddate, subject, level, authdata).then(function (response) {
                $scope.teacherquestionsarchive = response.data.map(function (item) {
                    let output = {
                        id: item._id,
                        description: item.question,
                        answer: item.answer,
                        status: item.status,
                        dateadded: item.dateadded,
                        topic: item.topic,
                        scale: item.scale
                    };
                    return output;
                });
            });
        }
    }
    $scope.saveteachersquestion = function () {
        let level = $scope.selectedlevel;
        let subject = $scope.selectedsubject;
        let topic = $scope.selectedsubjecttopic;
        let question = $scope.questiontext;
        let answer = $scope.questionanswer;
        let questionimage = $scope.questionimage;
        let scale = $scope.scale;
        if (typeof (level) != 'undefined' && typeof (subject) != 'undefined' && typeof (topic) != 'undefined') {
            $scope.message = '';
            if (typeof (question) != 'undefined' && typeof (answer) != 'undefined') {
                teacherservice.addteacherquestion(teacherquestionid, subject, level, questionimage, question, answer, topic, scale, authdata).then(function (data) {
                    if (data.data.insertedCount > 0) {
                        $scope.message = 'Question added successfully!!'
                        getteacherquestions();
                    }
                    else {
                        $scope.message = 'Submission failed!!'
                    }
                });
            }
            else {
                $scope.message = "Question and answer cannot be empty!!!";
            }
        }
        else {
            $scope.message = "please select level,subject and topic!!!";
        }

    }
    function getprocessedtodayteachersubjecttest() {
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
        getprocessedtodayteachersubjecttest();
        getteacherquestions();
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