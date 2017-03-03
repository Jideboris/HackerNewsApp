
eAssessorApp.service('questionservice', ['$http', function ($http) {
    var urlquestionavatarbyid = 'http://localhost:3000/questionavatarbyid';
    var urladdlackedskillsets = 'http://localhost:3000/addlackedskillset';
    var urlquestioncount = 'http://localhost:3000/questioncount';
    var urllackedskillset = 'http://localhost:3000/lackedskillset';
    var urldeletelackedskillset = 'http://localhost:3000/deletelackedskillset';
    var urladd = 'http://localhost:3000/addquestion';
    var urlupdate = 'http://localhost:3000/updatequestion';
    var uploadUrl = "http://localhost:3000/fileUpload";
    var updateuploaded = "http://localhost:3000/updatefileuploaded";
    var urlallquestions = "http://localhost:3000/questions";
    var urldeletequestions = "http://localhost:3000/deletequestion";
    var urlgetbyid = 'http://localhost:3000/questionbyid';

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
