eAssessorApp.controller('questioncontroller', function ($scope, $location, $routeParams, menuservice, questionservice, topicservice, subjectservice) {
    var id = $routeParams.id;
    var questionid = '';
    $scope.questionno = 0;
    $scope.questionformat = 'Please select..';
    $scope.questionnature = 'Please select..';
    $scope.questionlevel = 'Please select..';
    $scope.questiontypepractice = 'Please select..';
    $scope.questiondifficultyweight = 'Please select..';
    $scope.timetospendanswerquestion = 'Please select..';
    $scope.correctoption = 'Please select..';

    $scope.ischecked = false;
    var removeitems = [];
    $scope.uploadFile = function (imageid) {
        var questionno = $scope.questionno;
        var file = $scope.myFile;
        if (typeof (imageid) == 'undefined' || imageid == '') {
            if (questionno > 0) {
                questionservice.uploadfile(file, questionno);
            }
            else {
                alert("Question number is not found!")
            }
        }
        else {

            if (questionno > 0) {
                questionservice.updateuploadedfile(file, questionno, imageid);
            }
            else {
                alert("Question number is not found!")
            }
            $location.path('/question');
        }

    };
    $scope.adminmenus = menuservice.admins().map(function (item) {
        if (item.id === "#question") {
            item.style = "list-group-item active";
        }
        return item;
    });
    $scope.mathematicalskillsdescriptions = {
        mathematicalskills: []
    };
    $scope.processmathematicalskill = function () {
        if ($scope.questionnature === 'Mathematical') {
            $scope.mathematicalSkillSets = gettopicsbysubject();
        }
    }

    $scope.processtopics = function (selectedsubject) {
        topicservice.getsubjecttopics(selectedsubject).then(function (respose) {
            $scope.subjecttopics = [];
            $scope.subjecttopics = respose.data;
        })
    }
    var tosendmathematicalskills = [];
    $scope.checkFirst = function (itemchecked, ischecked) {
        var i = tosendmathematicalskills.indexOf(itemchecked);
        if (i == -1) {
            tosendmathematicalskills.push(itemchecked)
        }
        else {
            tosendmathematicalskills.splice(i, 1);
            removeitems.push(itemchecked)

        }
    };
    function isInArray(value, array) {
        return array.indexOf(value) > -1;
    }
    function gettopicsbysubject() {
        topicservice.getsubjecttopics('Mathematics').then(function (respose) {
            $scope.mathematicalSkillSets = respose.data;
        })
    }
    function getTopics() {
        topicservice.gettopics('O', 'A').then(function (respose) {
            $scope.mathematicalSkillSets = respose.data;
        })
    }
    function getSubjects() {
        subjectservice.getSubjects('O', 'AO', 'A').then(function (response) {
            $scope.subjects = response.data;
        });
    }
    function getQuestions() {
        return questionservice.getdailyquestions().then(function (response) {
            $scope.questions = response.data;
        });
    }
    $scope.deletequestion = function (id) {
        questionservice.deletequestion(id);
        getQuestions();
    };

    function getQuestionno() {
        questionservice.questioncount().then(function (response) {
            $scope.questionno = parseInt(response.data) + 1;
        })

    }
    function getLackedSkillSetIfFailed() {
        questionservice.getlackedskillsets().then(function (response) {
            $scope.lackedSkillSets = response.data;
        })
    }
    $scope.deletelackedskillset = function (id) {
        questionservice.deletelackedskillset(id);
        getLackedSkillSetIfFailed();
    };
    if (typeof (id) != 'undefined') {

        tosendmathematicalskills = [];
        questionservice.getquestionbyid(id).then(function (response) {

            $scope.questionno = response.data.questionno;
            $scope.questionformat = response.data.questionformat;
            $scope.questionnature = response.data.questionnature;
            $scope.questionlevel = response.data.questionlevel;
            $scope.questiontypepractice = response.data.questiontypepractice;
            $scope.selectedsubject = response.data.selectedsubject;

            $scope.processtopics($scope.selectedsubject);

            $scope.selectedtopic = response.data.selectedtopic;

            $scope.questiondifficultyweight = response.data.questiondifficultyweight;
            $scope.timetospendanswerquestion = response.data.timetospendanswerquestion;
            $scope.questionanswerhints = response.data.questionanswerhints;
            $scope.questiontext = response.data.questiontext;
            $scope.optiona = response.data.optiona;
            $scope.optionb = response.data.optionb;
            $scope.optionc = response.data.optionc;
            $scope.optiond = response.data.optiond;
            $scope.optione = response.data.optione;
            $scope.correctoption = response.data.correctoption;

            var items = angular.fromJson(response.data.mathematicalskills);

            if ($scope.questionnature === 'Mathematical') {
                topicservice.getsubjecttopics('Mathematics').then(function (respose) {
                    angular.forEach(items, function (value, key) {
                        var mainitems = respose.data;
                        var a = mainitems.indexOf(value);
                        if (a > 0 || a !== 'undefined') {
                            var da = { description: value, ischecked: true }
                            $scope.mathematicalSkillSets.push(da);
                        }
                        else {
                            var da = { description: value, ischecked: false }
                            $scope.mathematicalSkillSets.push(da);
                        }
                        tosendmathematicalskills.push(value);
                    });
                })
            }
        });
        getavatar();
    }

    function getavatar() {
        questionservice.getquestionavator($scope.questionno).then(function (respose) {
            $scope.avatarImage = respose.data[0];
        });

    }
    $scope.addQuestion = function () {
        var questionno = $scope.questionno;
        var questionformat = $scope.questionformat;
        var questionnature = $scope.questionnature;
        var questionlevel = $scope.questionlevel;
        var questiontypepractice = $scope.questiontypepractice;
        var selectedsubject = $scope.selectedsubject;
        var selectedtopic = $scope.selectedtopic;

        var questiondifficultyweight = $scope.questiondifficultyweight;
        var timetospendanswerquestion = $scope.timetospendanswerquestion;
        var questionanswerhints = $scope.questionanswerhints;
        var questiontext = $scope.questiontext;
        var optiona = $scope.optiona;
        var optionb = $scope.optionb;
        var optionc = $scope.optionc;
        var optiond = $scope.optiond;
        var optione = $scope.optione;
        var correctoption = $scope.correctoption;
        var mathematicalskills = angular.toJson(tosendmathematicalskills, true);
        if (typeof (questionid) === 'undefined' || questionid == '') {
            questionservice.addquestion(questionno, questionformat, questionnature, questionlevel, questiontypepractice, selectedsubject,
                selectedtopic, questiondifficultyweight, timetospendanswerquestion, questionanswerhints, questiontext, optiona, optionb
                , optionc, optiond, optione, correctoption, mathematicalskills);

        }
        else {
            questionservice.updatequestion(questionformat, questionnature, questionlevel, questiontypepractice, selectedsubject,
               selectedtopic, questiondifficultyweight, timetospendanswerquestion, questionanswerhints, questiontext, optiona, optionb
               , optionc, optiond, optione, correctoption, mathematicalskills, questionid);
        }
        $location.path('/question');

    }
    if (typeof (id) != 'undefined') {
        questionservice.getquestionbyid(id).then(function (response) {
            var questionitem = response.data;
            questionid = response.data._id;
        });
    }

    $scope.addLackedSkillSet = function (newskillset) {
        if (typeof (newskillset) != 'undefined') {
            questionservice.addlackedskillsets(newskillset, $scope.questionno).then(function (response) {
                $scope.lackedSkillSets = getLackedSkillSetIfFailed();
            })
            $scope.additionalskillset = '';
            $scope.message = '';
        }
        else {
            $scope.message = "Skill field cannot be empty";
        }
    }
    $scope.subjects = getSubjects();
    $scope.questions = getQuestions();
    if (typeof (id) == 'undefined') {
        $scope.questionno = getQuestionno();
    }
    $scope.lackedSkillSets = getLackedSkillSetIfFailed();
});