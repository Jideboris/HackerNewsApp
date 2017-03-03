eAssessorApp.controller('topiccontroller', function ($scope, $location, topicservice, menuservice, $routeParams, subjectservice) {
    var id = $routeParams.id;
    var desc = '';
    var level = '';
    var sub = '';
    $scope.subject = "Please select..";
    $scope.subjectlevel = "Please select..";
    function getTopics() {
        topicservice.gettopics('O', 'A').then(function (respose) {
            $scope.topics = respose.data;
        })
    }
    function getSubjects() {
        subjectservice.getSubjects('O', 'AO', 'A').then(function (response) {
            $scope.subjects = response.data;
        });
    }
    $scope.adminmenus = menuservice.admins().map(function (item) {
        if (item.id === "#topic") {
            item.style = "list-group-item active";
        }
        return item;
    });
    $scope.processtopics = function () {
        topicservice.getsubjecttopics($scope.selectedsubject).then(function (respose) {
            $scope.topics = [];
            $scope.topics = respose.data;
        })
    }
    $scope.addTopic = function () {
        desc = $scope.topicdescription;
        level = $scope.topiclevel;
        sub = $scope.selectsubject
        if (typeof (id) === 'undefined') {
            topicservice.addtopic(desc, level, sub);
        } else {
            topicservice.updatetopic(desc, level, sub, id);
        }
        $location.path('/topic');
    }
    $scope.subjects = getSubjects();
    $scope.topics = getTopics();

    if (typeof (id) != 'undefined') {
        topicservice.gettopicbyid(id).then(function (response) {
            $scope.itemtopic = response.data;
            $scope.topicdescription = response.data.description;
            $scope.topiclevel = response.data.level;
            $scope.topicid = response.data._id;
            $scope.selectsubject = response.data.subject;
        });
    }
    $scope.setItemEditRemove = function (id) {
        topicservice.deletetopic(id);
        getTopics();
    };
});