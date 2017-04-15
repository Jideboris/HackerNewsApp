
eAssessorApp.service('questionservice', ['$http', function ($http) {
    var urlquestionavatarbyid = path + '/questionavatarbyid';
    var urladdlackedskillsets = path + '/addlackedskillset';
    var urlquestioncount = path + '/questioncount';
    var urllackedskillset = path + '/lackedskillset';
    var urldeletelackedskillset = path + '/deletelackedskillset';
    var urladd = path + '/addquestion';
    var urlupdate = path + '/updatequestion';
    var uploadUrl = path + '/fileUpload';
    var updateuploaded = path + '/updatefileuploaded';
    var urlallquestions = path + '/questions';
    var urldeletequestions = path + '/deletequestion';
    var urlgetbyid = path + '/questionbyid';

    this.uploadfile = function (file, questno) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('questionno', questno);
        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function (response) {
        })
        .error(function (response) {
        });
    }
    this.updateuploadedfile = function (file, questno, imageid) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('questionno', questno);
        fd.append('imageid', imageid);
        $http.post(updateuploaded, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
        .success(function (response) {

        })
        .error(function (response) {
        });
    }
    this.getquestionavator = function (questionno) {
        return $http.get(urlquestionavatarbyid + '/' + questionno).success(function (response) {
            return response.data;
        });
    };
    this.questioncount = function () {
        return $http.get(urlquestioncount).success(function (response) {
            return response.data;
        });
    };
    this.deletequestion = function (id) {
        return $http.delete(urldeletequestions + '/' + id).success(function (data) { }).error(function (data) { });
    };

    this.deletelackedskillset = function (id) {
        return $http.delete(urldeletelackedskillset + '/' + id).success(function (data) { }).error(function (data) { });
    };
    this.addquestion = function (questionno, questionformat, questionnature, questionlevel, questiontypepractice, selectedsubject,
                selectedtopic, questiondifficultyweight, timetospendanswerquestion, questionanswerhints, questiontext, optiona, optionb
                , optionc, optiond, optione, correctoption, mathematicalskills) {
        $http.post(urladd, {
            questionno: questionno,
            questionformat: questionformat,
            questionnature: questionnature,
            questionlevel: questionlevel,
            questiontypepractice: questiontypepractice,
            selectedsubject: selectedsubject,
            selectedtopic: selectedtopic,
            questiondifficultyweight: questiondifficultyweight,
            timetospendanswerquestion: timetospendanswerquestion,
            questionanswerhints: questionanswerhints,
            questiontext: questiontext,
            optiona: optiona,
            optionb: optionb,
            optionc: optionc,
            optiond: optiond,
            optione: optione,
            correctoption: correctoption,
            mathematicalskills: mathematicalskills

        }).success(function (response) {

        }).error(function (response) {

        });
    };
    this.updatequestion = function (questionformat, questionnature, questionlevel, questiontypepractice, selectedsubject, selectedtopic,
        questiondifficultyweight, timetospendanswerquestion, questionanswerhints, questiontext, optiona, optionb, optionc, optiond,
        optione, correctoption, mathematicalskills, id) {
        return $http.put(urlupdate + '/' + id, {
            questionformat: questionformat,
            questionnature: questionnature,
            questionlevel: questionlevel,
            questiontypepractice: questiontypepractice,
            selectedsubject: selectedsubject,
            selectedtopic: selectedtopic,
            questiondifficultyweight: questiondifficultyweight,
            timetospendanswerquestion: timetospendanswerquestion,
            questionanswerhints: questionanswerhints,
            questiontext: questiontext,
            optiona: optiona,
            optionb: optionb,
            optionc: optionc,
            optiond: optiond,
            optione: optione,
            correctoption: correctoption,
            mathematicalskills: mathematicalskills
        }).success(function (data) {
        }).error(function (data) {
        });
    }
    this.getquestionbyid = function (id) {
        return $http.get(urlgetbyid + '/' + id).success(function (data) {
        }).error(function (data) {

        });
    }
    this.getdailyquestions = function () {
        return $http.get(urlallquestions).success(function (response) {
            return response.data;
        });
    };
    this.addlackedskillsets = function (desc, question) {
        return $http.post(urladdlackedskillsets, { description: desc, questionno: question }).success(function (response) {
            return response.data;
        });
    };

    this.getlackedskillsets = function () {
        return $http.get(urllackedskillset).success(function (response) {
            return response.data;
        });
    };

}]);
