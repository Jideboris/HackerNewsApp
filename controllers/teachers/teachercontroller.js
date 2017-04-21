eAssessorApp.controller('teachercontroller', function ($scope, $cookieStore,
    teacherservice, menuservice, $location, $sce) {
    $scope.message = '';
    buffer = [];
    reservouir = [];
    $scope.recordsnotfound = true;
    var user = $cookieStore.get('globals');
    var authdata = user.currentUser.authdata;
    $scope.findnewsletters = function () {
        let level = $scope.selectedlevel;
        if (typeof (level) != 'undefined') {
            $scope.message = "";
            let date = $scope.searchitem.split('/').join('-');
            debugger;
            teacherservice.getnewslettersbydate(level, date, authdata).then(function (response) {
                debugger;
                if (response.data != '' && response.data != null) {
                    $scope.newsletters = response.data;
                    $scope.recordsnotfound = false;
                }
                else {
                    $scope.newsletters = null;
                    $scope.recordsnotfound = true;
                }
            })
        }
        else {
            $scope.message = "please select level!!";
        }
    }
    $scope.teacherlevels = getteachersubjects();
    $scope.selectAll = function (it) {
        $scope.schoolsubjectlevelstudents = selectcheckboxes(it, $scope.schoolsubjectlevelstudents);
    };
    $scope.processteacherstudent = function () {
        getprocessteacherstudent();
    };
    $scope.loadnewsletter = function (newsid) {
        let level = $scope.selectedlevel;
        teacherservice.getnewsletter(level, newsid, authdata).then(function (response) {
            debugger;
            let blob = new Blob(([response.data.image]), { type: response.data.imageType });
            if (navigator.appVersion.toString().indexOf('.NET') > 0)
                window.navigator.msSaveBlob(blob, response.data.filename);
            else {
                var link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
                link.href = URL.createObjectURL(blob);
                link.download = response.data.filename;
                link.click();
            }
        })
    }

    $scope.uploadnewletter = function () {
        let level = $scope.selectedlevel;
        let file = $scope.newsletterfile;
        let message = $scope.aboutnewsletter;
        let title = $scope.newslettertitle;
        teacherservice.addtodaynewsletters(title, level, message, file, authdata).then(function (response) {
            getnewsletters(response.data);
        })
    }
    $scope.processretrievingnewsletters = function () {
        return getnewsletters(null);
    }
    function getnewsletters(resp) {
        if (typeof (resp) != 'undefined' && resp != null) {
            $scope.newsletters = resp;
        }
        else {
            let level = $scope.selectedlevel;
            if (typeof (level) != 'undefined') {
                teacherservice.gettodaynewsletters(level, authdata).then(function (response) {
                    debugger;
                    if (response.data != '' && response.data != null) {
                        $scope.newsletters = response.data;
                        $scope.recordsnotfound = false;
                    }
                    else {
                        $scope.newsletters = null;
                        $scope.recordsnotfound = true;
                    }
                })
            }
        }
    }
    $scope.studentregistrationmenu = menuservice.assignmentsetup().map(function (item) {
        let url = $location.url();
        let add = url.replace('/', '');
        let dataitem = item.id.replace('#', '');
        if (dataitem === add) {
            item.style = "list-group-item active";
        }
        return item;
    });
    function getprocessteacherstudent() {
        var selectedlevel = $scope.selectedlevel.replace('/', '-');
        if (typeof (selectedlevel) != 'undefined' && typeof ($scope.selectedsubject) != 'undefined') {
            teacherservice.getschoolteacherstudentsubjectregistration($scope.selectedsubject, selectedlevel, authdata).then(function (response) {
                teacherservice.getschoolstudentsbysubjectandlevel(selectedlevel, $scope.selectedsubject, authdata).then(function (resall) {
                    if (response.data.length == 0) {
                        $scope.schoolsubjectlevelstudents = preparedefaultschoolstudentsbysubjectandlevel(resall.data);
                    }
                    else {
                        $scope.schoolsubjectlevelstudents = prepareschoolstudentsbysubjectandlevel(response.data[0].registeredstudents);
                    }
                })

            });
            $scope.message = '';
        }
        else {
            $scope.message = "Please ensure that both level and subject are selected!";
        }
    }

    $scope.registersubjectlevelstudents = function () {
        let selsubject = $scope.selectedsubject;
        let selectedlevel = $scope.selectedlevel;
        let selectedstudent = $scope.schoolsubjectlevelstudents;
        let registeredstudents = [];
        angular.forEach($scope.schoolsubjectlevelstudents, function (item) {
            let desc = {
                selected: item.selected,
                dob: item.dateofbirth,
                fullname: item.fullname,
                studentId: item.studentid,
                teacherId: item.teacherid
            }
            registeredstudents.push(desc);
        });
        if (typeof (selsubject) != 'undefined' && typeof (selectedlevel) != 'undefined') {
            let regstudents = angular.toJson(registeredstudents);
            teacherservice.addschoolstudentsbysubjectandlevel(regstudents,
                selectedlevel,
                selsubject,
                registeredstudents[0].teacherId,
                authdata).then(function (response) {
                    if (response.data == 'passed') {
                        getprocessteacherstudent();
                        $scope.message = 'saved successful!!';
                    }
                })
        }
        else {
            $scope.message = 'Registration failed,please subject and level!!!';
        }

    }
    function preparedefaultschoolstudentsbysubjectandlevel(data) {
        var schoolstudents = data.schoolstudent;
        prepareschoolstuduent = [];
        for (var i = 0; i < schoolstudents.length; i++) {
            var identity = '';
            var fullname = schoolstudents[i].schoolstudent.fullname;
            var level = schoolstudents[i].schoolstudent.selectedlevel;
            var subject = $scope.selectedsubject;
            var dateofbirth = schoolstudents[i].schoolstudent.dateofbirth;
            var studentid = schoolstudents[i].id;
            var teacherid = data.teacherid;
            var selected = false;

            prepareschoolstuduent.push({
                identity: identity,
                studentid: studentid,
                fullname: fullname,
                level: level,
                subject: subject,
                dateofbirth: dateofbirth,
                teacherid: teacherid,
                selected: selected
            });
        }

        return prepareschoolstuduent;
    }

    function getteachersubjects() {
        teacherservice.getschoolteachersubjects(authdata).then(function (response) {
            var output = prepareteachers(response);
            $scope.teachersubjects = output.teachsubjects;
            $scope.teacherlevels = output.teachlevels;

        })
    };

});