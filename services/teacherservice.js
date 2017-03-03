eAssessorApp.service('teacherservice', ['$http', function ($http) {
    var urlupadateregistersubjectlevelstudents = 'http://localhost:3000/upadateregistersubjectlevelstudents';


    this.getallassignmentsdetails = function (selectedlevel, selectedsubject, authdata) {
        return $http.post(path + '/retrieveallassignmentsdetails' + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata).success(function (response) {
            return response;
        });
    };
    this.getanassignmentdetails = function (id, selectedlevel, selectedsubject, authdata) {
        return $http.post(path + '/retrieveanassignmentdetails' + '/' + id + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata).success(function (response) {
            return response;
        });
    };
    this.getanassignment = function (id, selectedlevel, selectedsubject, authdata) {
        return $http.post(path + '/retrieveanassignment' + '/' + id + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata, '', { responseType: 'arraybuffer' }).success(function (response) {
            return response.data;
        });
    };
    this.processreassignment = function (donemodel, livemodel, selectedlevel, selectedsubject, authdata) {
        return $http.post(path + '/reassignment' + '/' + donemodel + '/' + livemodel + '/' + authdata).success(function (response) {
            return response.data;
        });
    }
    this.getleftoverassignments = function (id, selectedlevel, selectedsubject, authdata) {
        return $http.get(path + '/removeassignment' + '/' + id + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata).success(function (response) {
            return response.data;
        });
    };
    this.getteachersuggestions = function (authdata) {
        return $http.get(path + '/retrieveteachersuggestion' + '/' + authdata).success(function (response) {
            return response.data;
        });
    }
    this.addteachingmethod = function (teachingmethodid, subject, level, topic, teachingmethodattachment, teachingmethodtext, authdata) {
        let quest = new FormData();
        quest.append('teachingmethodid', teachingmethodid);
        quest.append('file', teachingmethodattachment);
        quest.append('teachingmethodtext', teachingmethodtext);
        quest.append('subject', subject);
        quest.append('level', level);
        quest.append('topic', topic);
        quest.append('authdata', authdata);

        return $http.post(path + '/teachingmethod', quest, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .success(function (response) {
             return response;
         })
         .error(function (response) {
             return response;
         });
    }
    this.addteachersuggestion = function (teachersuggestionid, suggestion, authdata) {
        let assign = new FormData();
        assign.append('teachersuggestionid', teachersuggestionid);
        assign.append('suggestion', suggestion);
        assign.append('authdata', authdata);
        return $http.post(path + '/teachersuggestion', assign, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .success(function (response) {
             return response;
         })
         .error(function (response) {
             return response;
         });
    }
    this.addtodayteachersubjectassignment = function (attendance, subject, level, file, assignmentdescription, authdata) {
        let assignment = new FormData();
        assignment.append('file', file);
        assignment.append('attendance', attendance);
        assignment.append('subject', subject);
        assignment.append('level', level);
        assignment.append('authdata', authdata);
        assignment.append('assignmentdescription', assignmentdescription);

        return $http.post(path + '/uploadassignment', assignment, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .success(function (response) {
             return response;
         })
         .error(function (response) {
             return response;
         });
    }
    this.addteacherquestion = function (teacherquestionid, subject, level, questionimage, question, answer, topic, scale, authdata) {
        let quest = new FormData();
        quest.append('teacherquestionid', teacherquestionid);
        quest.append('file', questionimage);
        quest.append('question', question);
        quest.append('subject', subject);
        quest.append('level', level);
        quest.append('answer', answer);
        quest.append('topic', topic);
        quest.append('scale', scale);
        quest.append('authdata', authdata);

        return $http.post(path + '/addquestionfromteacher', quest, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .success(function (response) {
             return response;
         })
         .error(function (response) {
             return response;
         });
    }

    this.getteacherquestionimage = function (id, authdata) {
        return $http.post(path + '/retrieveteacherquestionimage' + '/' + id + '/' + authdata, '', { responseType: 'arraybuffer' }).success(function (response) {
            return response;
        });
    }
    this.getteachingmethodimage = function (id, authdata) {
        return $http.post(path + '/retrieveteachingmethodimage' + '/' + id + '/' + authdata, '', { responseType: 'arraybuffer' }).success(function (response) {
            return response;
        });
    }
    this.getteachingmethoddetails = function (id, authdata) {
        return $http.get(path + '/retrieveteachingmethoddetails' + '/' + id + '/' + authdata).success(function (response) {
            return response;
        });
    }
    this.getteacherquestimagedetails = function (id, authdata) {
        return $http.get(path + '/retrieveteacherquestiondetails' + '/' + id + '/' + authdata).success(function (response) {
            return response;
        });
    }
    this.deleteteachersuggestion = function (id, authdata) {
        return $http.get(path + '/removeteachersuggestion' + '/' + id + '/' + authdata).success(function (response) {
            return response;
        });
    }
    this.deleteteachingmethod = function (id, authdata) {
        return $http.get(path + '/removeteachingmethod' + '/' + id + '/' + authdata).success(function (response) {
            return response;
        });
    }
    this.deleteteacherquestions = function (id, authdata) {
        return $http.get(path + '/removeteacherquestions' + '/' + id + '/' + authdata).success(function (response) {
            return response;
        });
    }
    this.getteachersuggestionbyid = function (id, authdata) {
        return $http.get(path + '/retrieveteachersuggestionsbyid' + '/' + id + '/' + authdata).success(function (response) {
            return response;
        });
    }
    this.getteachingmethodbyid = function (id, authdata) {
        return $http.get(path + '/retrieveteachingmethodbyid' + '/' + id + '/' + authdata).success(function (response) {
            return response;
        });
    }
    this.getteacherquestionsbyid = function (id, authdata) {
        return $http.get(path + '/retrieveteacherquestionsbyid' + '/' + id + '/' + authdata).success(function (response) {
            return response;
        });
    }
    this.getteacherquestionsbydates = function (selecteddate, selectedsubject, selectedlevel, authdata) {
        return $http.get(path + '/retrieveteacherquestionsbydates' + '/' + selecteddate + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata).success(function (response) {
            return response;
        });
    }
    this.getteachingmethods = function (selectedlevel, selectedsubject, authdata) {
        return $http.get(path + '/retrieveteachingmethod' + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata).success(function (response) {
            return response;
        });
    };
    this.getteacherquestions = function (selecteddate, selectedlevel, selectedsubject, authdata) {
        return $http.get(path + '/retrieveteacherquestions' + '/' + selecteddate + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata).success(function (response) {
            return response;
        });
    };
    this.gettodayteachersubjectassignment = function (selectedsubject, selectedlevel, authdata) {
        return $http.get(path + '/retrievetodayteachersubjectassignment' + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata).success(function (response) {
            return response.data;
        });
    };
    this.getteacherstudentsubjecttest = function (selectedlevel, selectedsubject, authdata) {
        return $http.get(path + '/retrieveteacherstudentsubjecttest' + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata).success(function (response) {
            return response.data;
        });
    };

    this.gettodayteachersubjecttest = function (selectedsubject, selectedlevel, authdata) {
        let assignment = new FormData();
        assignment.append('selectedsubject', selectedsubject);
        assignment.append('selectedlevel', selectedlevel);
        assignment.append('authdata', authdata);

        return $http.post(path + '/retrievetodayteachersubjecttest', assignment, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .success(function (response) {
             return response;
         })
         .error(function (response) {
             return response;
         });
    };
    this.gettodaytesttopics = function (subject, level, authdata) {
        return $http.get(path + '/retrievetodaytesttopics' + '/' + subject + '/' + level + '/' + authdata).success(function (response) {
            return response.data;
        });
    }
    this.gettodaytesttopicsafter = function (topid, authdata) {
        return $http.get(path + '/retrievetodaytesttopicsafter' + '/' + topid + '/' + authdata).success(function (response) {
            return response.data;
        });
    }
    this.addtodayteachersubjecttest = function (attendance, subject, level, processedtopics, authdata) {
        var frm = new FormData();
        frm.append('attendance', attendance);
        frm.append('subject', subject);
        frm.append('level', level);
        frm.append('authdata', authdata);
        frm.append('processedtopics', processedtopics);

        return $http.post(path + '/todayteachersubjecttest', frm, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .success(function (response) {
             return response;
         })
         .error(function (response) {
             return response;
         });
    };
    this.getteacherstudentsubjectattendance = function (selectedsubject, selectedlevel, authdata) {
        return $http.get(path + '/teacherstudentsubjectattendance' + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata).success(function (response) {
            return response.data;
        });
    };
    this.getteacherstudentlivesubjectattendance = function (selectedsubject, selectedlevel, authdata) {
        return $http.get(path + '/teacherstudentlivesubjectattendance' + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata).success(function (response) {
            return response.data;
        });
    };
    this.checkAssignmentDescription = function (selectedlevel, selectedsubject, description, authdata) {
        return $http.get(path + '/assignmentdetails' + '/' + selectedlevel + '/' + selectedsubject + '/' + description + '/' + authdata).success(function (response) {
            return response;
        });
    }
    this.addteacherstudentsubjectattendance = function (todayattendance, selsubject, selectedlevel, authdata) {
        var assignment = new FormData();
        assignment.append('todayattendance', todayattendance);
        assignment.append('selsubject', selsubject);
        assignment.append('selectedlevel', selectedlevel);
        assignment.append('authdata', authdata);

        return $http.post(path + '/addteacherstudentsubjectattendance', assignment, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .success(function (response) {
             return response;
         })
         .error(function (response) {
             return response;
         });
    };
    this.getassignmentsscores = function (selectedlevel, selectedsubject, selectedassignment, authdata) {
        let reg = new FormData();
        reg.append('selectedassignment', selectedassignment);
        reg.append('selectedlevel', selectedlevel);
        reg.append('selectedsubject', selectedsubject);
        reg.append('authdata', authdata);

        return $http.post(path + '/retrieveassignmentsscores', reg, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .success(function (response) {
             return response;
         })
         .error(function (response) {
             return response;
         });
    };
    this.addassignmentsscores = function (selectedlevel, selectedsubject, selectedassignment, assignmentdetails, totalscores, authdata) {
        let reg = new FormData();
        reg.append('selectedassignment', selectedassignment);
        reg.append('selectedlevel', selectedlevel);
        reg.append('selectedsubject', selectedsubject);
        reg.append('assignmentdetails', assignmentdetails);
        reg.append('totalscores', totalscores);
        reg.append('authdata', authdata);

        return $http.post(path + '/assignmentsscores', reg, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .success(function (response) {
             return response;
         })
         .error(function (response) {
             return response;
         });
    };
    this.addschoolstudentsbysubjectandlevel = function (registeredstudents, selectedlevel, selsubject, teacherid, authdata) {
        let reg = new FormData();
        reg.append('registeredstudents', registeredstudents);
        reg.append('selectedlevel', selectedlevel);
        reg.append('selsubject', selsubject);
        reg.append('teacherid', teacherid);
        reg.append('authdata', authdata);

        return $http.post(path + '/addschoolstudentsbysubjectandlevel', reg, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .success(function (response) {
             return response;
         })
         .error(function (response) {
             return response;
         });

    };
    this.getschoolstudentsby = function (id, authdata) {
        return $http.get(urlgetbyid + '/' + id + '/' + authdata).success(function (data) {
        }).error(function (data) { });
    }
    this.getschoolteacherstudentsubjectregistration = function (selectedsubject, selectedlevel, authdata) {
        let frm = new FormData();
        frm.append('selectedsubject', selectedsubject);
        frm.append('selectedlevel', selectedlevel);
        frm.append('authdata', authdata);

        return $http.post(path + '/schoolteacherstudentsubjectregistration', frm, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        })
         .success(function (response) {
             return response;
         })
         .error(function (response) {
             return response;
         });

    }
    this.getschoolstudentsbysubjectandlevel = function (selectedlevel, selectedsubject, authdata) {
        return $http.get(path + '/schoolstudentsbysubjectandlevel' + '/' + selectedlevel + '/' + selectedsubject + '/' + authdata).success(function (response) {
            return response;
        });
    };

    this.getschoolteachersubjects = function (authdata) {
        return $http.get(path + '/schoolteachersubjects' + '/' + authdata)
        .success(function (response) {
            return response.data;
        });
    };

}]);
