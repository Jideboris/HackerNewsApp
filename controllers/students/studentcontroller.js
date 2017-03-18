eAssessorApp.controller('studentcontroller', function ($scope, $location, commonservice, menuservice, studentservice, $cookieStore) {
    var user = $cookieStore.get('globals');
    var authdata = user.currentUser.authdata;
    if ($scope.selectedsession != 'undefined' || $scope.selectedsession == "") {
        $scope.selectedsession = "Please select...";
    }
    if ($scope.selectedstudentsubcat != 'undefined' || $scope.selectedstudentsubcat == "") {
        $scope.selectedstudentsubcat = "Please select...";
    }

    getpassschoolsessions();
    getstudentofferedsubjects();
    getsessions();
    getreportcategory();

    $scope.processstudentsession = function () {
        let selsession = $scope.selectedsession;
        if (selsession === "Past") {
            $scope.showselectedstudents = true;
        }
        else {
            $scope.showselectedstudents = false;
        }
    }
    $scope.processselectedstudentsubcat = function () {
        let selsubcat = $scope.selectedstudentsubcat;
        if (selsubcat === "Single Subject") {
            $scope.showstudentregsubjects = true;
        }
        else {
            $scope.showstudentregsubjects = false;
        }
    }
    function getreportcategory() {
        let reportcat = commonservice.reportcategory();
        $scope.reportcategories = reportcat;
    }
    function getsessions() {
        let session = commonservice.session();
        $scope.sessions = session;
    }
    function getstudentofferedsubjects() {
        let studentsubjects = [];
        studentservice.getstudentregisteredsubjects(authdata).then(function (response) {
            response.data.map(function (item) {
                return studentsubjects.push({ description: item });
            })
            $scope.studentregsubjects = studentsubjects;
        });
    }
    function getpassschoolsessions() {
        let newsession = 0;
        let schoolsessions = [];
        let currentdate = new Date().getFullYear();
        let startyear = currentdate - 5;
        for (let i = 1; i <= 5; i++) {
            newsession = startyear + 1;
            let session = startyear + '/' + newsession;
            startyear = newsession;
            schoolsessions.push({ description: session });
        }
        $scope.passschoolsessions = schoolsessions;
    }
    $scope.studentmenus = menuservice.students().map(function (item) {
        let url = $location.url();
        let add = url.replace('/', '');
        let dataitem = item.id.replace('#', '');
        if (dataitem === add) {
            item.style = "list-group-item active";
        }
        return item;
    });
});