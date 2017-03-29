// script.js
path = 'http://localhost:3000'
var eAssessorApp = angular.module('eAssessorApp', ['ngRoute', 'ngSanitize', 'ngCookies']);

eAssessorApp.config(function ($routeProvider) {

    $routeProvider
      // route for the home page
           .when("/", {
               templateUrl: "/views/home.html",
               controller: "logincontroller",
           })
           .when('/register', {
               templateUrl: "/views/login/register.html",
                controller: "homecontroller",
            })
            .when('/login', {
                templateUrl: "/views/login/login.html",
                controller: "logincontroller",
            })
            .when("/studentfeedback", {
                templateUrl: "/views/studentfeedback.html",
                controller: "studentcontroller"
            })
            .when("/studentrecommendation", {
                templateUrl: "/views/studentrecommendation.html",
                controller: "studentcontroller"
            })
         .when("/studentweakareas", {
             templateUrl: "/views/studentweakareas.html",
             controller: "studentcontroller"
         })
         .when("/studentreportanalysis", {
             templateUrl: "/views/studentcomparativeanalysis.html",
             controller: "studentcontroller"
         })
         .when("/studentreport", {
             templateUrl: "/views/student/student.html",
             controller: "studentcontroller"
         })
          .when("/comparativereport", {
              templateUrl: "/views/student/studentcomparativeanalysis.html",
              controller: "studentcontroller"
          })
        .when("/progresstracker", {
            templateUrl: "/views/student/studentprogresstracker.html",
            controller: "studentcontroller"
        })
         .when("/addquestion/:id", {
             templateUrl: "/views/admin/addeditquestion.html",
             controller: "questioncontroller"
         })
         .when("/download/:level/:subject/:id", {
             templateUrl: "/views/templates/pdfdownload.html",
             controller: "pdfcontroller"
         })
         .when("/question", {
             templateUrl: "/views/admin/question.html",
             controller: "questioncontroller"
         })
          .when("/registration", {
              templateUrl: "/views/studentregistration.html",
              controller: "studentregistrationcontroller"
          })
          .when("/teacherstudentregistration", {
              templateUrl: "/views/teacher/clientteacherstudent.html",
              controller: "teachercontroller"
          })
        .when("/teachingmethod", {
            templateUrl: "/views/teacher/addteachingmethod.html",
            controller: "teachingmethodcontroller"
        })
        .when("/teacheremail", {
            templateUrl: "/views/teacher/teacheremailing.html",
            controller: "teacheremailingcontroller"
        })
        .when("/teachersuggestion", {
            templateUrl: "/views/teacher/addteachersuggestion.html",
            controller: "teachersuggestioncontroller"
        })
        .when("/teachersquestion", {
            templateUrl: "/views/teacher/addteacherquestion.html",
            controller: "teacherquestioncontroller"
        })
          .when("/teacherstudentattendanceregister", {
              templateUrl: "/views/teacher/teacherstudentattendanceregister.html",
              controller: "teacherattendancecontroller"
          })
         .when("/teacher", {
             templateUrl: "/views/teacher/teachertestsetup.html",
             controller: "teachertestsetupcontroller"
         })
        .when("/studenttestscores", {
            templateUrl: "/views/teacher/teacherstudentscores.html",
            controller: "teacherstudentscorecontroller"
        })
        .when("/teacherstudentassignment", {
            templateUrl: "/views/teacher/teacherstudentassignmentsetup.html",
            controller: "teacherassignmentcontroller"
        })
        .when("/addquestion", {
            templateUrl: "/views/admin/addeditquestion.html",
            controller: "questioncontroller"
        })
         .when("/topic", {
             templateUrl: "/views/admin/topic.html",
             controller: "topiccontroller"
         })
        .when("/addtopic", {
            templateUrl: "/views/admin/addedittopic.html",
            controller: "topiccontroller"
        })
          .when("/addtopic/:id", {
              templateUrl: "/views/admin/addedittopic.html",
              controller: "topiccontroller"
          })
        //.when("/location", {
        //    templateUrl: "/views/location.html",
        //    controller: "locationcontroller"
        //})
       .when("/addlocation", {
           templateUrl: "/views/admin/addeditlocation.html",
           controller: "locationcontroller"
       })
         .when("/addlocation/:id", {
             templateUrl: "/views/admin/addeditlocation.html",
             controller: "locationcontroller"
         })
        .when("/subject", {
            templateUrl: "/views/admin/subject.html",
            controller: "subjectcontroller"
        })
         .when("/addsubject", {
             templateUrl: "/views/admin/addeditsubject.html",
             controller: "subjectcontroller"
         })
         .when("/addsubject/:id", {
             templateUrl: "/views/admin/addeditsubject.html",
             controller: "subjectcontroller"
         })
         .when("/access", {
             templateUrl: "/views/access.html",
             controller: "aboutcontroller"
         })
        .when("/schoolclientstudent", {
            templateUrl: "/views/school/clientstudentregistration.html",
            controller: "clientregistrationcontroller"
        })
        .when("/addschoolbatchclientstudent", {
            templateUrl: "/views/school/addschoolbatchclientstudent.html",
            controller: "clientregistrationcontroller"
        })
          .when("/addschoolclientstudent", {
              templateUrl: "/views/school/addschoolclientstudent.html",
              controller: "clientregistrationcontroller"
          })
         .when("/addschoolclientstudent/:id", {
             templateUrl: "/views/school/addschoolclientstudent.html",
             controller: "clientregistrationcontroller"
         })
           .when("/addschoolclientsteacher", {
               templateUrl: "/views/school/addschoolclientsteacher.html",
               controller: "clientregistrationcontroller"
           })
         .when("/addschoolclientsteacher/:id", {
             templateUrl: "/views/school/addschoolclientsteacher.html",
             controller: "clientregistrationcontroller"
         })
        .when("/addschoolclientstudentdesciplinerecord", {
            templateUrl: "/views/school/addclientdisciplinaryrecord.html",
            controller: "clientregistrationcontroller"
        })
        .when("/addschoolclientstudentdesciplinerecord/:disciplinerecordid", {
            templateUrl: "/views/school/addclientdisciplinaryrecord.html",
            controller: "clientregistrationcontroller"
        })
        .when("/schooldisciplinary", {
            templateUrl: "/views/school/clientdisciplinaryrecord.html",
            controller: "clientregistrationcontroller"
        })
        .when("/schoolpromotionrecords", {
            templateUrl: "/views/school/promotestudents.html",
            controller: "clientregistrationcontroller"
        })
         .when("/schoolreport", {
             templateUrl: "/views/school/schoolreports.html",
             controller: "clientregistrationcontroller"
         })
        .when("/schoolmonitor", {
            templateUrl: "/views/school/schoolmonitor.html",
            controller: "clientregistrationcontroller"
        })
          .when("/schoolclientteacher", {
              templateUrl: "/views/school/clientteacherregistration.html",
              controller: "clientregistrationcontroller"
          })
           .when("/school", {
               templateUrl: "/views/admin/schoolregistration.html",
               controller: "schoolregistrationcontroller"
           })
        .when("/school/:id", {
            templateUrl: "/views/admin/addschoolregistration.html",
            controller: "schoolregistrationcontroller"
        })
        .when("/schools", {
            templateUrl: "/views/admin/schools.html",
            controller: "schoolregistrationcontroller"
        })
        .when("/addschool", {
            templateUrl: "/views/admin/addschoolregistration.html",
            controller: "schoolregistrationcontroller"
        })
          .when("/parent", {
              templateUrl: "/views/parent/newsletters.html",
              controller: "parentcontroller"
          })
         .when("/admin/:id", {
             templateUrl: "/views/admin/addeditadmin.html",
             controller: "admincontroller"
         })
        .when("/addadmin", {
            templateUrl: "/views/admin/addeditadmin.html",
            controller: "admincontroller"
        })
        .when("/adminsetup", {
            templateUrl: "/views/admin/adminsetup.html",
            controller: "admincontroller"
        })
          .when("/admin_main", {
              templateUrl: "/views/admin/admin.html",
              controller: "admincontroller"
          }).otherwise({ redirectTo: '/' });
});
eAssessorApp.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});
eAssessorApp.run(run);
//run.$inject = ['$rootScope', '$location', '$cookieStore', '$http'];
function run($rootScope, $location, $cookieStore, $http) {
    $rootScope.registration = { "pointer-events": "none", "cursor": "default" };
    $rootScope.admin = { "pointer-events": "none", "cursor": "default" };
    $rootScope.parent = { "pointer-events": "none", "cursor": "default" };
    $rootScope.teacher = { "pointer-events": "none", "cursor": "default" };
    $rootScope.student = { "pointer-events": "none", "cursor": "default" };
    $rootScope.assessment = { "pointer-events": "none", "cursor": "default" };
    var category = $cookieStore.get('category');
    switch (category) {
        case 'school':
            $rootScope.registration = { "pointer-events": "", "cursor": "" };
            break;
        case 'admin':
            $rootScope.registration = { "pointer-events": "", "cursor": "" };
            $rootScope.admin = { "pointer-events": "", "cursor": "" };
            $rootScope.parent = { "pointer-events": "", "cursor": "" };
            $rootScope.teacher = { "pointer-events": "", "cursor": "" };
            $rootScope.student = { "pointer-events": "", "cursor": "" };
            $rootScope.assessment = { "pointer-events": "", "cursor": "" };
            break;
        case 'teacher':
            $rootScope.teacher = { "pointer-events": "", "cursor": "" };
            break;
        case 'student':
            $rootScope.student = { "pointer-events": "", "cursor": "" };
            break;
    }

    // keep user logged in after page refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser) {
        $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        // redirect to login page if not logged in and trying to access a restricted page
        //  var restrictedPage = $.inArray($location.path(), ['/', '/register']) === -1;
        var loggedIn = $rootScope.globals.currentUser;
        if (typeof (loggedIn) !== "undefined" && !loggedIn) {
            $location.path('/');
        }
    });
}
eAssessorApp.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
    //disable IE ajax request caching
    // $httpProvider.defaults.headers.get['Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    // $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
    //// extra
    $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
    $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
}]);
