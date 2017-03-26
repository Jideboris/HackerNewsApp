eAssessorApp.controller('homecontroller', function ($scope, authenticationservice, $location, $rootScope, $cookieStore) {
    debugger;
    var user = $cookieStore.get('globals');
    if (typeof (user) != 'undefined') {
        $rootScope.loglabel = 'Sign Out';
    }
    else {
        $rootScope.loglabel = 'Sign In';

        lockslinks();
    }
    $scope.isdefault = true;

    $scope.logprocess = function (loglabel) {
        if (loglabel == 'Sign In') {
            $scope.isaboutlogin = true;
            $scope.isdefault = false;
        }
        else if (loglabel == 'Sign Out') {
            authenticationservice.clearcredentials();
            $rootScope.loglabel = 'Sign In';
            $scope.isaboutlogin = false;
            $scope.isdefault = true;

            lockslinks();
           

            $location.path('/');
        }

    }
    function lockslinks() {
        $rootScope.registration = { "pointer-events": "none", "cursor": "default" };
        $rootScope.admin = { "pointer-events": "none", "cursor": "default" };
        $rootScope.parent = { "pointer-events": "none", "cursor": "default" };
        $rootScope.teacher = { "pointer-events": "none", "cursor": "default" };
        $rootScope.student = { "pointer-events": "none", "cursor": "default" };
        $rootScope.assessment = { "pointer-events": "none", "cursor": "default" };
    }


});
