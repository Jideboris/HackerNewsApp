eAssessorApp.controller('teachersuggestioncontroller', function ($scope, $cookieStore,
    topicservice, teacherservice, menuservice, $sce) {
    $scope.message = '';
    $scope.scale = 0;
    var identities = [];
    var teachersuggestionid = '';
    var user = $cookieStore.get('globals');
    var authdata = user.currentUser.authdata;
    var todaydate = getcurrentdate();
    $scope.submittedsuggestiondatefrom = todaydate;
    $scope.hide = true;
    $scope.teacherarchievedsuggestions = getTeacherSuggestions();
    $scope.recordfound = false;
    $scope.EditSuggestion = function (id) {
        teacherservice.getteachersuggestionbyid(id, authdata).then(function (response) {
            let output = response.data[0];
            $scope.suggestiontext = output.suggestion;
            teachersuggestionid = output._id;

        });
    }
    $scope.ProcessShowSuggestion = function (item) {
        if (item === 'A') {
            $scope.hide = true;
        }
        else {
            $scope.hide = false;
        }
    }
    $scope.RemoveSuggestion = function (id) {
        teacherservice.deleteteachersuggestion(id, authdata).then(function (response) {
            if (response.data == 'deleted') {
                getTeacherSuggestions();
            }
        });
    }
    $scope.testsetupmenu = menuservice.assignmentsetup().map(function (item) {
        if (item.id === "#teachersuggestion") {
            item.style = "list-group-item active";
        }
        return item;
    });
    function getTeacherSuggestions() {
        teacherservice.getteachersuggestions(authdata).then(function (response) {
            $scope.recordfound = !response.data.length > 0;
            $scope.teacherarchievedsuggestions = response.data.map(function (item) {
                let output = {
                    id: item._id,
                    description: item.suggestion,
                    dateadded: item.dateadded
                };
                return output;
            });
        });
    }
    $scope.saveteachersuggestions = function () {
        let suggestion = $scope.suggestiontext;
        $scope.message = '';
        if (typeof (suggestion) != 'undefined') {
            teacherservice.addteachersuggestion(teachersuggestionid, suggestion, authdata).then(function (data) {
                if (data.data.insertedCount > 0) {
                    $scope.message = 'Suggestion added successfully!!'
                    getTeacherSuggestions();
                }
                else {
                    $scope.message = 'Submission failed!!'
                }
            });
        }
        else {
            $scope.message = "Suggestion cannot be empty!!!";
        }
    }
});