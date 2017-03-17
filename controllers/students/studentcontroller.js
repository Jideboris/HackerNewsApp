eAssessorApp.controller('studentcontroller', function ($scope, $location, menuservice, $cookieStore) {
    var user = $cookieStore.get('globals');
    var authdata = user.currentUser.authdata;

    getpassschoolsessions();
    $scope.selectedstudentsession = "Please select...";
    $scope.selectedstudentsubcat = "Please select...";
  
    $scope.processselectedstudentsession = function () {
        let selsession = $scope.selectedstudentsession;
        if (selsession === "Past") {
            $scope.showselectedstudents = true;
        }
        else {
            $scope.showselectedstudents = false;
        }
    }
    $scope.processselectedstudentsubcat = function () {
        let selsubcat = $scope.selectedstudentsubcat;
        if (selsubcat === "Selected Subject") {
            $scope.showstudentregsubjects = true;
        }
        else {
            $scope.showstudentregsubjects = false;
        }
    }
    function getstudentofferedsubjects(authdata) {

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