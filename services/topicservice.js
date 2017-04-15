eAssessorApp.service('topicservice', ['$http', function ($http) {
    this.getlevelsubjecttopics = function (selectedsubject, selectedlevel) {
        return $http.get(path + '/topicsbysubject' + '/' + selectedsubject + '/' + selectedlevel).success(function (response) {
            return response.data;
        });
    };
    this.getsubjecttopics = function (selectedsubject) {
        return $http.get(path + '/subjecttopics' + '/' + selectedsubject).success(function (response) {
            return response.data;
        });
    }
    this.addtopic = function (desc, level, sub) {
        return $http.post(path + '/addtopic', { description: desc, level: level, subject: sub }).success(function (data) {
            return data;
        });
    };
    this.updatetopic = function (desc, level, sub, id) {
        return $http.put(path + '/updatetopic' + '/' + id, { description: desc, level: level, subject: sub }).success(function (data) {
        }).error(function (data) {
        });
    }
    this.gettopicbyid = function (id) {
        return $http.get(path + '/topicbyid' + '/' + id).success(function (data) {
        }).error(function (data) { });
    };

    this.gettopics = function (level1, level2) {
        return $http.get(path + '/topics' + '/' + level1 + '/' + level2).success(function (data) {
            return data;
        });
    };
    this.deletetopic = function (id) {
        return $http.delete(path + '/deletetopic' + '/' + id).success(function (data) {
        }).error(function (data) {
        });
    };
}]);
