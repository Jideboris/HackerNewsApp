eAssessorApp.controller('logincontroller', function ($scope, commonservice, menuservice, $rootScope, $location,
    $cookieStore, authenticationservice,
    $window, $location, userauthfactory,
    authenticationfactory, subjectservice, $sce) {
    //debugger;
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

            $location.path('/login');
        }
        else if (loglabel == 'Sign Out') {
            if (authenticationfactory.isLogged) {

                authenticationfactory.isLogged = false;
                delete authenticationfactory.user;
                delete authenticationfactory.userRole;

                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.userRole;

                authenticationservice.clearcredentials();
                $rootScope.loglabel = 'Sign In';
                $scope.isaboutlogin = false;
                $scope.isdefault = true;

                lockslinks();
                $location.path("/");
            }      
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

    $scope.logincategories = menuservice.logincategory().map(function (item) {
        //use logic here to sort by most clicked by users first.
        //  item = $sce.trustAsHtml(item)
        return item;
    });
    $scope.homemenus = menuservice.homemenus().map(function (item) {
        //use logic here to sort by most clicked by users first.
        //  item = $sce.trustAsHtml(item)
        return item;
    });

    $scope.categories = commonservice.categories();
    $scope.login = function login() {
        $scope.dataLoading = true;
        $scope.isschool = false;
        let username = 'AnthonyBorisade';// $scope.identity;
        let password = 'BOAY.1OONE';// $scope.password;
        let category = 'teacher';// $scope.category;
        if (username !== undefined && password !== undefined) {
            userauthfactory.login(username, password, category).success(function (data) {
                $scope.dataLoading = false;

                authenticationfactory.isLogged = true;
                authenticationfactory.user = data.user.username;
                authenticationfactory.userRole = category;

                $window.sessionStorage.token = data.token;
                $window.sessionStorage.user = data.user.username;
                $window.sessionStorage.userRole = category;
                authenticationservice.setcredentials(username, password);

                switch (category) {
                    case 'school':
                        $rootScope.registration = { "visibility": "visible" };
                        $cookieStore.put('category', category);
                        $location.path('/schoolclientstudent');
                        $scope.isschool = true;
                        break;
                    case 'admin':
                        $rootScope.registration = { "visibility": "visible" };
                        $rootScope.admin = { "visibility": "visible" };
                        $rootScope.parent = { "visibility": "visible" };
                        $rootScope.teacher = { "visibility": "visible" };
                        $rootScope.student = { "visibility": "visible" };
                        $rootScope.assessment = { "visibility": "visible" };
                        $cookieStore.put('category', category);
                        $location.path('/admin_main');
                        $scope.isschool = false;
                        break;
                    case 'teacher':
                        $rootScope.teacher = { "visibility": "visible" };
                        $cookieStore.put('category', category);
                        $location.path('/teacherstudentregistration');
                        $scope.isschool = false;
                        break;
                    case 'student':
                        $rootScope.student = { "visibility": "visible" };
                        $cookieStore.put('category', category);
                        $location.path('/studentreport');
                        $scope.isschool = false;
                        break;
                    case 'parent':
                        $rootScope.parent = { "visibility": "visible" };
                        $cookieStore.put('category', category);
                        $location.path('/parent');
                        $scope.isschool = false;
                        break;
                }
                $rootScope.loglabel = 'Sign Out';


            }).error(function (status) {
                $scope.message = 'Oops something went wrong!';
                $scope.dataLoading = false;

            });
        } else {
            $scope.message = 'Invalid credentials';
            $scope.dataLoading = false;

        }
    };

});