eAssessorApp.service('clientregistrationservice', ['$http', function ($http) {
    this.deleteclientstudent = function (id, authdata) {
        return $http.delete(path + '/deleteclientstudent' + '/' + id + '/' + authdata).success(function (data) { }).error(function (data) { });
    };
    this.deleteclientteacher = function (id, authdata) {
        return $http.delete(path + '/deleteclientteacher' + '/' + id + '/' + authdata).success(function (data) { }).error(function (data) { });
    };

    this.addbatchclientstudent = function (file, authdata) {
        var fd = new FormData();
        fd.append('file', file);
        fd.append('authdata', authdata);
        return $http.post(path + '/uploadbatchclientstudent', fd, {
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
    this.addteacherschoolclient = function (teacherfullname, teacherdateofbirth, teacherpersonalemail,
                    teacherphonenumber, teachercurrentcontactaddress, registeredteacherqualifications, registeredteachersubjects, registeredteacherlevels, authdata) {

        $http.post(path + '/addteacherschoolclient' + '/' + authdata, {
            fullname: teacherfullname,
            dateofbirth: teacherdateofbirth,
            personalemail: teacherpersonalemail,
            phonenumber: teacherphonenumber,
            currentcontactaddress: teachercurrentcontactaddress,
            teacherqualifications: registeredteacherqualifications,
            teachersubjects: registeredteachersubjects,
            teacherlevels: registeredteacherlevels,
            suspended: false

        })
        .success(function (response) {
            if (response !== '') {

                return $http.get(path + '/submit' + '/' + response.ops[0].schoolteacher.personalemail + '/' + response.ops[0].password + '/'
                   + response.ops[0].schoolteacher.fullname + '/' + response.ops[0].username + '/' + response.ops[0]._id).success(function (data) {

                   });
            }
        }).error(function (response) {

        });
    };

    this.updateteacherschoolclient = function (teacherfullname, teacherdateofbirth, teacherpersonalemail,
                    teacherphonenumber, teachercurrentcontactaddress, registeredteacherqualifications,
                    registeredteachersubjects, registeredteacherlevels, teachersuspended, authdata, id) {

        return $http.put(path + '/updateclientteacher' + '/' + id + '/' + authdata, {
            fullname: teacherfullname,
            dateofbirth: teacherdateofbirth,
            personalemail: teacherpersonalemail,
            phonenumber: teacherphonenumber,
            currentcontactaddress: teachercurrentcontactaddress,
            teacherqualifications: registeredteacherqualifications,
            teachersubjects: registeredteachersubjects,
            teacherlevels: registeredteacherlevels,
            suspended: teachersuspended
        }).success(function (data) { }).error(function (data) { });
    }

    this.addclientstudent = function (fullname, dateofbirth, selectedlevel, personalemail, parentemail, parentnumber,
                    studentregisteredsubjects, authdata) {
        $http.post(path + '/addclientstudent' + '/' + authdata, {
            fullname: fullname,
            dateofbirth: dateofbirth,
            selectedlevel: selectedlevel,
            personalemail: personalemail,
            parentemail: parentemail,
            parentnumber: parentnumber,
            studentregisteredsubjects: studentregisteredsubjects,
            suspended: false

        })
        .success(function (response) {
            if (response !== '') {

                return $http.get(path + '/submit' + '/' + response.ops[0].schoolstudent.personalemail + '/' + response.ops[0].password + '/'
                   + response.ops[0].schoolstudent.fullname + '/' + response.ops[0].username + '/' + response.ops[0]._id).success(function (data) {

                   });
            }
        }).error(function (response) {

        });
    };
    this.updateclientstudent = function (fullname, dateofbirth, selectedlevel, personalemail, parentemail, parentnumber,
                    studentregisteredsubjects, suspended, authdata, id) {

        return $http.put(path + '/updateclientstudent' + '/' + id + '/' + authdata, {
            fullname: fullname,
            dateofbirth: dateofbirth,
            selectedlevel: selectedlevel,
            personalemail: personalemail,
            parentemail: parentemail,
            parentnumber: parentnumber,
            studentregisteredsubjects: studentregisteredsubjects,
            suspended: suspended
        }).success(function (data) { }).error(function (data) { });
    }
    this.getschoolstudentsby = function (id, authdata) {
        return $http.get(path + '/schoolstudentsby' + '/' + id + '/' + authdata).success(function (data) {
        }).error(function (data) { });
    }
    this.getschoolteachersby = function (id, authdata) {
        return $http.get(path + '/schoolteachersby' + '/' + id + '/' + authdata).success(function (data) {
        }).error(function (data) { });
    }
    this.getschoolteachers = function (authdata) {
        return $http.get(path + '/schoolteachers' + '/' + authdata).success(function (response) {
            return response.data;
        });
    };
    this.getschoolstudents = function (selectedlevel, authdata) {
        return $http.get(path + '/schoolstudents' + '/' + selectedlevel + '/' + authdata).success(function (response) {
            return response.data;
        });
    };
    this.getschoolstudentsdisciplinerecord = function (disciplinerecordid, authdata) {
        return $http.get(path + '/schoolstudentsdisciplinerecord' + '/' + disciplinerecordid + '/' + authdata).success(function (response) {
            return response.data;
        });
    }
    this.getschoolstudentsdisciplinerecords = function (level, authdata) {
        return $http.get(path + '/schoolstudentsdisciplinerecords' + '/' + level + '/' + authdata).success(function (response) {
            return response.data;
        });
    }
    this.addeddisciplinetostudentrecord = function (record, authdata) {
        let discipline = new FormData();
        discipline.append('studentid', record.studentid);
        discipline.append('fullname', record.fullname);
        discipline.append('dateofbirth', record.dateofbirth);
        discipline.append('offence', record.offence);
        discipline.append('penalty', record.penalty);
        discipline.append('remark', record.remark);
        discipline.append('disciplinerecordid', record.disciplinerecordid);
        discipline.append('level', record.level);
        discipline.append('authdata', authdata);

        return $http.post(path + '/disciplinetostudentrecord', discipline, {
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
    this.sendemail = function (personalemail, password, fullname, username, id) {
        return $http.get(path + '/submit' + '/' + personalemail + '/' + password + '/' + fullname + '/' + username + '/' + id).success(function (data) {
            return data;
        }).error(function (data) {
            return data;
        });
    }
}]);
