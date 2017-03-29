eAssessorApp.controller('clientregistrationcontroller', function ($scope, subjectservice, menuservice,
    commonservice, $location, $routeParams, clientregistrationservice, $cookieStore, $window, $location, $route) {
    var id = $routeParams.id;
    var disciplinerecordid = $routeParams.disciplinerecordid;
    $scope.files = [];
    var user = $cookieStore.get('globals');
    var authdata = user.currentUser.authdata;
    var studentsubjects = [];
    var teacherqualifications = [];
    var teachersubjects = [];
    var teacherlevels = [];
    processstudentdiscipline();
    $scope.flastname = '';
    $scope.flevel = '';
    $scope.fdateofbirth = '';
    $scope.selectedcategory = "Please select...";
    $scope.selectedselective = "Please select...";
    $scope.promotedaction = "Please select...";
    $scope.monitoraction = "Please select...";
    $scope.monitoringselectlevel = "Please select...";
    $scope.isbatch = $scope.myFile != '' && typeof ($scope.myFile) != 'undefined';
    var data = {
        id: '',
        fullname: '',
        dateofbirth: '',
        selectedlevel: '',
        personalemail: '',
        parentemail: '',
        parentnumber: '',
        studentregisteredsubjects: [],
        suspended: ''

    }
    var subjectchecked = [];
    var subchecked = {
        description: '',
        ischecked: ''
    }

    //use a flag to check if there is content so it loads only once.
    //school admin must have ability to promote student with a button click.
    //promotion or demotion or anything on each student must also be possible.
    //level should be placed in a drop down and use to drive data being retrieved.And should include ALL option.
    //if admin school dropdown option should appear and admin uses it to get students data.if not admin level should come up.

    $scope.thisschoolteachers = getschoolteachers();
    $scope.adddisciplinetostudentrecord = function () {
        let fullname = $scope.fullname;
        let dateofbirth = $scope.dateofbirth;
        let offence = $scope.offencedescription;
        let penalty = $scope.serveddiscipline;
        let remark = $scope.teacherremark;

        let record = {
            disciplinerecordid: disciplinerecordid,
            studentid: typeof ($scope.selectedstudent) != 'undefined' ? $scope.selectedstudent.id : $scope.studentId,
            level: $scope.selectedlevel,
            fullname: fullname,
            dateofbirth: dateofbirth,
            offence: offence,
            penalty: penalty,
            remark: remark
        }

        clientregistrationservice.addeddisciplinetostudentrecord(record, authdata).then(function (response) {
            if (response.data.ops.length > 0) {
                $cookieStore.put('level', record.level);
                $location.path('/schooldisciplinary');
                $route.reload();
            }
            else {
                $scope.message = "Discipline record not added!"
            }
        })
    }

    $scope.adminmenus = menuservice.schools().map(function (item) {
        let add = $location.url().replace('/', '');
        let dataitem = item.id.replace('#', '');
        if (dataitem === add) {
            item.style = "list-group-item active";
        }
        return item;
    });
    $scope.AssignedSelectedStudent = function () {
        let schoolstudents = $scope.selectedstudent;
        $scope.fullname = schoolstudents.fullname;
        $scope.dateofbirth = schoolstudents.dateofbirth;
    }
    function processstudentdiscipline() {
        let level = (typeof ($scope.selectedlevel) != 'undefined') ? $scope.selectedlevel : $cookieStore.get('level');
        if (typeof (level) != 'undefined') {
            clientregistrationservice.getschoolstudentsdisciplinerecords(level, authdata).then(function (response) {
                if (response.data.length > 0) {
                    $scope.schoolstudentdisplinaryrecords = response.data;
                    $scope.showmessage = false;
                }
                else {
                    $scope.showmessage = true;
                    $scope.message = "No record found!"
                }

            })
        }
    }
    if (typeof (disciplinerecordid) != 'undefined') {
        clientregistrationservice.getschoolstudentsdisciplinerecord(disciplinerecordid, authdata).then(function (response) {
            if (response.data.length > 0) {
                let output = response.data[0];
                $scope.selectedlevel = output.level;
                $scope.fullname = output.fullname;
                $scope.dateofbirth = output.dateofbirth;
                $scope.offencedescription = output.offence;
                $scope.serveddiscipline = output.penalty;
                $scope.teacherremark = output.remark;
                $scope.studentId = output.studentid;

            }
            else {
                $scope.showmessage = true;
                $scope.message = "No record found!"
            }

        })
    }
    $scope.getstudentdesciplinerecords = function () {
        processstudentdiscipline();
    }
    $scope.getallyearstudents = function () {
        let level = $scope.selectedlevel;
        getschoolstudents(level);
    }
    $scope.resendschoolteacheremail = function (id) {
        if (typeof (id) != 'undefined') {
            clientregistrationservice.getschoolteachersby(id, authdata).then(function (response) {
                var teacher = prepareschoolteachers(response)[0];
                clientregistrationservice.sendemail(teacher.personalemail, teacher.password,
                    teacher.fullname, teacher.username, teacher.id).then(function (response) {
                        if (response.data == 'failed') {
                            $scope.ispassed = 'has-error';
                            $scope.message = "failed to resend email!"
                        }
                        else {
                            $scope.ispassed = 'has-success';
                            $scope.message = "email resent!"
                        }
                    });

            });
        }

    };

    $scope.resendschoolclientemail = function (id) {
        if (typeof (id) != 'undefined') {
            clientregistrationservice.getschoolstudentsby(id, authdata).then(function (response) {
                var student = prepareschoolstudents(response)[0];
                clientregistrationservice.sendemail(student.personalemail, student.password,
                    student.fullname, student.username, student.id).then(function (response) {
                        if (response.data == 'failed') {
                            $scope.ispassed = 'has-error';
                            $scope.message = "failed to resend email!"
                        }
                        else {
                            $scope.ispassed = 'has-success';
                            $scope.message = "email resent!"
                        }
                    });

            });
        }

    };
    if (typeof (id) != 'undefined') {
        clientregistrationservice.getschoolstudentsby(id, authdata).then(function (response) {
            var student = prepareschoolstudents(response)[0];
            $scope.id = student.id;
            $scope.fullname = student.fullname
            $scope.dateofbirth = student.dateofbirth;
            $scope.selectedlevel = student.selectedlevel;
            $scope.personalemail = student.personalemail;
            $scope.parentemail = student.parentemail;
            $scope.parentnumber = student.parentnumber;
            $scope.username = student.username;
            $scope.password = student.password;
            $scope.suspended = student.suspended;
            subjectservice.getSubjects('O', 'AO', 'A').then(function (response) {
                $scope.subjects = [];
                angular.forEach(response.data, function (value, key) {
                    var da = {};
                    var mainitems = student.studentregisteredsubjects;
                    var a = mainitems.indexOf(value.description);
                    if (a >= 0) {
                        da = { description: value.description, ischecked: true }
                    }
                    else {
                        da = { description: value.description, ischecked: false }
                    }
                    $scope.subjects.push(da);
                });

                for (var i = 0; i < $scope.subjects.length; i++) {
                    if ($scope.subjects[i].ischecked) {
                        studentsubjects.push($scope.subjects[i].description);
                    }
                }
            });

        });

    }
    if (typeof (id) != 'undefined') {
        clientregistrationservice.getschoolteachersby(id, authdata).then(function (response) {
            var teacher = prepareschoolteachers(response)[0];
            $scope.id = teacher.id;
            $scope.fullname = teacher.fullname
            $scope.dateofbirth = teacher.dateofbirth;
            $scope.personalemail = teacher.personalemail;
            $scope.phonenumber = teacher.phonenumber;
            $scope.currentcontactaddress = teacher.currentcontactaddress;
            $scope.username = teacher.username;
            $scope.password = teacher.password;
            $scope.suspended = teacher.suspended;
            subjectservice.getSubjects('O', 'AO', 'A').then(function (response) {

                $scope.subjects = [];
                angular.forEach(response.data, function (value, key) {

                    var da = {};
                    var mainitems = teacher.teachersubjects;
                    var a = mainitems.indexOf(value.description);
                    if (a >= 0) {
                        da = { description: value.description, ischecked: true }
                    }
                    else {
                        da = { description: value.description, ischecked: false }
                    }
                    $scope.subjects.push(da);
                });

                for (var i = 0; i < $scope.subjects.length; i++) {
                    if ($scope.subjects[i].ischecked) {
                        teachersubjects.push($scope.subjects[i].description);
                    }
                }
            });

            $scope.qualifications = [];
            angular.forEach(commonservice.qualifications(), function (value, key) {
                var da = {};
                var mainitems = teacher.teacherqualifications;
                var a = mainitems.indexOf(value.description);
                if (a >= 0) {
                    da = { description: value.description, ischecked: true }
                }
                else {
                    da = { description: value.description, ischecked: false }
                }
                $scope.qualifications.push(da);
            });

            for (var i = 0; i < $scope.qualifications.length; i++) {
                if ($scope.qualifications[i].ischecked) {
                    teacherqualifications.push($scope.qualifications[i].description);
                }
            }
            $scope.levels = [];
            angular.forEach(commonservice.levels(), function (value, key) {
                var da = {};
                var mainitems = teacher.teacherlevels;
                var a = mainitems.indexOf(value.description);
                if (a >= 0) {
                    da = { description: value.description, ischecked: true }
                }
                else {
                    da = { description: value.description, ischecked: false }
                }
                $scope.levels.push(da);
            });

            for (var i = 0; i < $scope.levels.length; i++) {
                if ($scope.levels[i].ischecked) {
                    teacherlevels.push($scope.levels[i].description);
                }
            }

        });

    }
    function getsubjects() {
        subjectservice.getSubjects('O', 'AO', 'A').then(function (response) {
            for (var i = 0; i < response.data.length; i++) {
                subchecked = {};
                subchecked.ischecked = false;
                subchecked.description = response.data[i].description;
                subjectchecked.push(subchecked);
            }
            $scope.subjects = subjectchecked;
        });
    }
    $scope.levels = commonservice.levels();
    $scope.qualifications = commonservice.qualifications();

    $scope.ischecked = false;
    var removeitems = [];

    $scope.checkFirst = function (itemchecked, ischecked) {
        var i = studentsubjects.indexOf(itemchecked);
        if (i == -1) {
            studentsubjects.push(itemchecked)
        }
        else {
            studentsubjects.splice(i, 1);
            removeitems.push(itemchecked)
        }
    };
    $scope.isqualificationchecked = false;
    var removequalificationsitems = [];
    $scope.checkqualification = function (itemchecked) {
        var i = teacherqualifications.indexOf(itemchecked);
        if (i == -1) {
            teacherqualifications.push(itemchecked)
        }
        else {
            teacherqualifications.splice(i, 1);
            removequalificationsitems.push(itemchecked)

        }
    };
    $scope.isteasubjectchecked = false;
    var removeteasubjectsitems = [];
    $scope.checkteachersubjects = function (itemchecked) {
        var i = teachersubjects.indexOf(itemchecked);
        if (i == -1) {
            teachersubjects.push(itemchecked)
        }
        else {
            teachersubjects.splice(i, 1);
            removeteasubjectsitems.push(itemchecked)

        }
    };
    $scope.istealevelchecked = false;
    var removetealevelsitems = [];
    $scope.checktealevel = function (itemchecked) {
        var i = teacherlevels.indexOf(itemchecked);
        if (i == -1) {
            teacherlevels.push(itemchecked)
        }
        else {
            teacherlevels.splice(i, 1);
            removetealevelsitems.push(itemchecked)

        }
    };
    $scope.downloadtemplate = function () {
        window.open("/assets/files/students.xlsx", '_blank', '');

        //clientregistrationservice.downloadtemplate(authdata);
    }
    $scope.processmonitoringselectedlevel = function () {
        let selmonitoringselectlevel = $scope.monitoringselectlevel;
        if (selmonitoringselectlevel !== "Please select...") {
            $scope.monitorselectedstudent = true;
        }
        else {
            $scope.monitorselectedstudent = false;
        }

    }
    $scope.processmonitoring = function () {
        let selmonitoraction = $scope.monitoraction;
        $scope.monitoringlevel = false;
        $scope.monitorselectedstudent = false;
        $scope.monitorselectedteacher = false;

        switch (selmonitoraction) {
            case "Teacher":
                $scope.monitorselectedteacher = true;
                break;
            case "Student":
                $scope.monitoringlevel = true;
                break;
            default:
        }
    }
    $scope.processpromoted = function () {
        let selpromoted = $scope.promotedaction;
        $scope.promotedselectedstudents = false;
        switch (selpromoted) {
            case "Selective":
                $scope.promotedselectedstudents = true;
                break;
            case "All":
                $scope.promotedselectedstudents = false;
                break;
            default:
        }

    }
    $scope.processselective = function () {
        let selcategory = $scope.selectedcategory;
        let selselective = $scope.selectedselective;
        $scope.teacherreportshow = false;
        $scope.isselectedteacher = false;
        $scope.singleselectedteacherreport = false;
        $scope.studentlevelshow = false;
        $scope.studentreportshow = false;
        $scope.isselectedstudent = false;
        $scope.singleselectedstudentreport = false;
        if (selcategory === "Teacher" && selselective === "All") {
            $scope.teacherreportshow = true;
        }
        else if (selcategory === "Teacher" && selselective === "Selective") {
            $scope.isselectedteacher = true;
            $scope.singleselectedteacherreport = true;
        }
        else if (selcategory === "Student" && selselective === "All") {
            $scope.studentlevelshow = true;
            $scope.studentreportshow = true;

        }
        else if (selcategory === "Student" && selselective === "Selective") {
            $scope.isselectedstudent = true;
            $scope.singleselectedstudentreport = true;
        }
    }
    $scope.processcategory = function () {
        $scope.teacherreportshow = false;
        $scope.studentlevelshow = false;
        $scope.studentreportshow = false;
        $scope.isselectedteacher = false;
        $scope.singleselectedteacherreport = false;
        $scope.isselectedstudent = false;
        $scope.singleselectedstudentreport = false;
        $scope.singlemultipleshow = true;

    }
    $scope.deleteschoolstudents = function (id) {
        let selectedlevel = $scope.selectedlevel;
        let deleteUser = $window.confirm('Are you sure you want to delete this?');
        if (deleteUser) {
            clientregistrationservice.deleteclientstudent(id, authdata);
            getschoolstudents(selectedlevel);
        }
    };
    $scope.deleteschoolteachers = function (id) {
        var deleteUser = $window.confirm('Are you sure you want to delete this?');
        if (deleteUser) {
            clientregistrationservice.deleteclientteacher(id, authdata);
            getschoolteachers();
        }
    };
    function getschoolstudents(selectedlevel) {
        clientregistrationservice.getschoolstudents(selectedlevel, authdata).then(function (response) {
            let schoolstudents = prepareschoolstudents(response);
            $scope.thisschoolstudents = schoolstudents;
            $scope.filteredstudents = schoolstudents;

        })
    }
    function getschoolteachers() {
        clientregistrationservice.getschoolteachers(authdata).then(function (response) {
            $scope.thisschoolteachers = prepareschoolteachers(response);
        })
    }
    function prepareschoolteachers(response) {
        var datas = [];
        for (var i = 0; i < response.data.length; i++) {
            var data = {};
            data.id = response.data[i]._id;
            data.fullname = response.data[i].schoolteacher.fullname;
            data.dateofbirth = response.data[i].schoolteacher.dateofbirth;
            data.personalemail = response.data[i].schoolteacher.personalemail;
            data.phonenumber = response.data[i].schoolteacher.phonenumber;
            data.currentcontactaddress = response.data[0].schoolteacher.currentcontactaddress;
            data.teacherqualifications = JSON.parse(response.data[i].schoolteacher.teacherqualifications);
            data.teachersubjects = JSON.parse(response.data[i].schoolteacher.teachersubjects);
            data.teacherlevels = JSON.parse(response.data[i].schoolteacher.teacherlevels);
            data.suspended = JSON.parse(response.data[i].schoolteacher.suspended);
            data.username = response.data[0].username;
            data.password = response.data[0].password;
            datas.push(data);
        }
        return datas;
    }
    function prepareschoolstudents(response) {
        var datas = [];
        for (var i = 0; i < response.data.length; i++) {
            var data = {};
            data.id = response.data[i]._id;
            data.fullname = response.data[i].schoolstudent.fullname
            data.dateofbirth = response.data[i].schoolstudent.dateofbirth;
            data.selectedstudent = data.fullname + '_' + data.dateofbirth;
            data.selectedlevel = response.data[i].schoolstudent.selectedlevel;
            data.personalemail = response.data[i].schoolstudent.personalemail;
            data.parentemail = response.data[i].schoolstudent.parentemail;
            data.parentnumber = response.data[i].schoolstudent.parentnumber;
            data.studentregisteredsubjects = JSON.parse(response.data[i].schoolstudent.studentregisteredsubjects);
            data.suspended = JSON.parse(response.data[i].schoolstudent.suspended);
            data.username = response.data[0].username;
            data.password = response.data[0].password;
            datas.push(data);
        }
        return datas;
    }
    $scope.addbatchstudentschoolclient = function () {
        var file = $scope.myFile;
        if (typeof (file) != 'undefined' || file != '') {
            clientregistrationservice.addbatchclientstudent(file, authdata).then(function (response) {
                if (!response.data.isvalid && typeof (response.data.isvalid) != 'undefined') {
                    $scope.message = response.data.errormessage;
                }
                else {
                    $scope.message = '';
                    $location.path('/schoolclientstudent');
                }
            })
        }
        else {
            $scope.message = "File not found!";
        }
    }

    $scope.addteacherschoolclient = function () {
        if (validatedate($scope.dateofbirth) && validateemail($scope.personalemail)) {
            if (teacherqualifications.length > 0 && teachersubjects.length > 0 && teacherlevels.length > 0) {
                var teacherfullname = $scope.fullname;
                var teacherdateofbirth = $scope.dateofbirth;
                var teacherpersonalemail = $scope.personalemail;
                var teacherphonenumber = $scope.phonenumber;
                var teachercurrentcontactaddress = $scope.currentcontactaddress;
                var registeredteacherqualifications = angular.toJson(teacherqualifications, true);
                var registeredteachersubjects = angular.toJson(teachersubjects, true);
                var registeredteacherlevels = angular.toJson(teacherlevels, true);
                if (typeof ($scope.teachersuspended) == 'undefined') {
                    $scope.teachersuspended = false;
                }
                var teachersuspended = $scope.teachersuspended;

                if (typeof (id) === 'undefined' || id == '') {
                    clientregistrationservice.addteacherschoolclient(teacherfullname, teacherdateofbirth, teacherpersonalemail,
                        teacherphonenumber, teachercurrentcontactaddress, registeredteacherqualifications, registeredteachersubjects, registeredteacherlevels, authdata);

                }
                else {
                    clientregistrationservice.updateteacherschoolclient(teacherfullname, teacherdateofbirth, teacherpersonalemail,
                        teacherphonenumber, teachercurrentcontactaddress,
                       registeredteacherqualifications, registeredteachersubjects, registeredteacherlevels, teachersuspended, authdata, id);
                }
                $location.path('/schoolclientteacher');
            }
            else {
                $scope.message = "A teacher's qualifications,subjects and levels must be selected!";
            }
        }
        else {
            $scope.message = "Dob OR email is not valid!";
        }
    }

    $scope.addstudentschoolclient = function () {
        debugger;
        if (studentsubjects.length > 0) {
            var fullname = $scope.fullname;
            var dateofbirth = $scope.dateofbirth;
            var selectedlevel = $scope.selectedlevel;
            var personalemail = $scope.personalemail;
            var parentemail = $scope.parentemail;
            var parentnumber = $scope.parentnumber;
            var studentregisteredsubjects = angular.toJson(studentsubjects, true);
            var suspended = $scope.suspended;
            if (typeof (id) === 'undefined' || id == '') {
                clientregistrationservice.addclientstudent(fullname, dateofbirth, selectedlevel, personalemail, parentemail, parentnumber,
                    studentregisteredsubjects, authdata);

            }
            else {
                clientregistrationservice.updateclientstudent(fullname, dateofbirth, selectedlevel, personalemail, parentemail,
                   parentnumber, studentregisteredsubjects, suspended, authdata, id);
            }
            $location.path('/schoolclientstudent');
        }
        else {
            $scope.message = 'Student subject must be selected';
        }
    }
    $scope.subjects = getsubjects();
    function validatedate(dateitem) {
        var dobpattern = /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/;
        if (!dobpattern.test(dateitem)) {
            return false;
        }
        else {
            return true;
        }
    }
    function validateemail(email) {
        var emailpattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!emailpattern.test(email)) {
            return false;
        }
        else {
            return true;
        }
    }
});
