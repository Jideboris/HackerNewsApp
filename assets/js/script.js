// script.js
//path = 'https://evaluatorapi.herokuapp.com/api/v1';
path = 'http://localhost:3000/api/v1';
pathlog = 'http://localhost:3000';
var eAssessorApp = angular.module('eAssessorApp', ['ngRoute', 'ngSanitize', 'ngCookies', '720kb.datepicker']);

eAssessorApp.config(function ($routeProvider, $httpProvider) {
    $httpProvider.interceptors.push('tokeninterceptor');
    $routeProvider
      // route for the home page
           .when("/", {
               templateUrl: "/views/home.html",
               controller: "logincontroller",
               access: {
                   requiredLogin: false
               }
           })
           .when('/register', {
               templateUrl: "/views/login/register.html",
               controller: "homecontroller",
               access: {
                   requiredLogin: false
               }
           })
            .when('/login', {
                templateUrl: "/views/login/login.html",
                controller: "logincontroller",
                access: {
                    requiredLogin: false
                }
            })
            .when("/studentfeedback", {
                templateUrl: "/views/studentfeedback.html",
                controller: "studentcontroller",
                access: {
                    requiredLogin: true
                }
            })
            .when("/studentrecommendation", {
                templateUrl: "/views/studentrecommendation.html",
                controller: "studentcontroller",
                access: {
                    requiredLogin: true
                }
            })
         .when("/studentweakareas", {
             templateUrl: "/views/studentweakareas.html",
             controller: "studentcontroller",
             access: {
                 requiredLogin: true
             }
         })
         .when("/studentreportanalysis", {
             templateUrl: "/views/studentcomparativeanalysis.html",
             controller: "studentcontroller",
             access: {
                 requiredLogin: true
             }
         })
         .when("/studentreport", {
             templateUrl: "/views/student/student.html",
             controller: "studentcontroller",
             access: {
                 requiredLogin: true
             }
         })
          .when("/comparativereport", {
              templateUrl: "/views/student/studentcomparativeanalysis.html",
              controller: "studentcontroller",
              access: {
                  requiredLogin: true
              }
          })
        .when("/progresstracker", {
            templateUrl: "/views/student/studentprogresstracker.html",
            controller: "studentcontroller",
            access: {
                requiredLogin: true
            }
        })
         .when("/addquestion/:id", {
             templateUrl: "/views/admin/addeditquestion.html",
             controller: "questioncontroller",
             access: {
                 requiredLogin: true
             }
         })
         .when("/download/:level/:subject/:id", {
             templateUrl: "/views/templates/pdfdownload.html",
             controller: "pdfcontroller",
             access: {
                 requiredLogin: true
             }
         })
         .when("/question", {
             templateUrl: "/views/admin/question.html",
             controller: "questioncontroller",
             access: {
                 requiredLogin: true
             }
         })
          .when("/registration", {
              templateUrl: "/views/studentregistration.html",
              controller: "studentregistrationcontroller",
              access: {
                  requiredLogin: true
              }
          })
          .when("/uploadnewsletter", {
              templateUrl: "/views/teacher/uploadnewsletter.html",
              controller: "teachercontroller",
              access: {
                  requiredLogin: true
              }
          })
          .when("/teacherstudentregistration", {
              templateUrl: "/views/teacher/clientteacherstudent.html",
              controller: "teachercontroller",
              access: {
                  requiredLogin: true
              }
          })
        .when("/teachingmethod", {
            templateUrl: "/views/teacher/addteachingmethod.html",
            controller: "teachingmethodcontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/teacheremail", {
            templateUrl: "/views/teacher/teacheremailing.html",
            controller: "teacheremailingcontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/teachersuggestion", {
            templateUrl: "/views/teacher/addteachersuggestion.html",
            controller: "teachersuggestioncontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/teachersquestion", {
            templateUrl: "/views/teacher/addteacherquestion.html",
            controller: "teacherquestioncontroller",
            access: {
                requiredLogin: true
            }
        })
          .when("/teacherstudentattendanceregister", {
              templateUrl: "/views/teacher/teacherstudentattendanceregister.html",
              controller: "teacherattendancecontroller",
              access: {
                  requiredLogin: true
              }
          })
         .when("/teacher", {
             templateUrl: "/views/teacher/teachertestsetup.html",
             controller: "teachertestsetupcontroller",
             access: {
                 requiredLogin: true
             }
         })
        .when("/studenttestscores", {
            templateUrl: "/views/teacher/teacherstudentscores.html",
            controller: "teacherstudentscorecontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/teacherstudentassignment", {
            templateUrl: "/views/teacher/teacherstudentassignmentsetup.html",
            controller: "teacherassignmentcontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/addquestion", {
            templateUrl: "/views/admin/addeditquestion.html",
            controller: "questioncontroller",
            access: {
                requiredLogin: true
            }
        })
         .when("/topic", {
             templateUrl: "/views/admin/topic.html",
             controller: "topiccontroller",
             access: {
                 requiredLogin: true
             }
         })
        .when("/addtopic", {
            templateUrl: "/views/admin/addedittopic.html",
            controller: "topiccontroller",
            access: {
                requiredLogin: true
            }
        })
          .when("/addtopic/:id", {
              templateUrl: "/views/admin/addedittopic.html",
              controller: "topiccontroller",
              access: {
                  requiredLogin: true
              }
          })
       .when("/addlocation", {
           templateUrl: "/views/admin/addeditlocation.html",
           controller: "locationcontroller",
           access: {
               requiredLogin: true
           }
       })
         .when("/addlocation/:id", {
             templateUrl: "/views/admin/addeditlocation.html",
             controller: "locationcontroller",
             access: {
                 requiredLogin: true
             }
         })
        .when("/subject", {
            templateUrl: "/views/admin/subject.html",
            controller: "subjectcontroller",
            access: {
                requiredLogin: true
            }
        })
         .when("/addsubject", {
             templateUrl: "/views/admin/addeditsubject.html",
             controller: "subjectcontroller",
             access: {
                 requiredLogin: true
             }
         })
         .when("/addsubject/:id", {
             templateUrl: "/views/admin/addeditsubject.html",
             controller: "subjectcontroller",
             access: {
                 requiredLogin: true
             }
         })
         .when("/access", {
             templateUrl: "/views/access.html",
             controller: "aboutcontroller",
             access: {
                 requiredLogin: true
             }
         })
        .when("/schoolclientstudent", {
            templateUrl: "/views/school/clientstudentregistration.html",
            controller: "clientregistrationcontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/addschoolbatchclientstudent", {
            templateUrl: "/views/school/addschoolbatchclientstudent.html",
            controller: "clientregistrationcontroller",
            access: {
                requiredLogin: true
            }
        })
          .when("/addschoolclientstudent", {
              templateUrl: "/views/school/addschoolclientstudent.html",
              controller: "clientregistrationcontroller",
              access: {
                  requiredLogin: true
              }
          })
         .when("/addschoolclientstudent/:id", {
             templateUrl: "/views/school/addschoolclientstudent.html",
             controller: "clientregistrationcontroller",
             access: {
                 requiredLogin: true
             }
         })
           .when("/addschoolclientsteacher", {
               templateUrl: "/views/school/addschoolclientsteacher.html",
               controller: "clientregistrationcontroller",
               access: {
                   requiredLogin: true
               }
           })
         .when("/addschoolclientsteacher/:id", {
             templateUrl: "/views/school/addschoolclientsteacher.html",
             controller: "clientregistrationcontroller",
             access: {
                 requiredLogin: true
             }
         })
        .when("/addschoolclientstudentdesciplinerecord", {
            templateUrl: "/views/school/addclientdisciplinaryrecord.html",
            controller: "clientregistrationcontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/addschoolclientstudentdesciplinerecord/:disciplinerecordid", {
            templateUrl: "/views/school/addclientdisciplinaryrecord.html",
            controller: "clientregistrationcontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/schooldisciplinary", {
            templateUrl: "/views/school/clientdisciplinaryrecord.html",
            controller: "clientregistrationcontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/schoolpromotionrecords", {
            templateUrl: "/views/school/promotestudents.html",
            controller: "clientregistrationcontroller",
            access: {
                requiredLogin: true
            }
        })
         .when("/schoolreport", {
             templateUrl: "/views/school/schoolreports.html",
             controller: "clientregistrationcontroller",
             access: {
                 requiredLogin: true
             }
         })
        .when("/schoolmonitor", {
            templateUrl: "/views/school/schoolmonitor.html",
            controller: "clientregistrationcontroller",
            access: {
                requiredLogin: true
            }
        })
          .when("/schoolclientteacher", {
              templateUrl: "/views/school/clientteacherregistration.html",
              controller: "clientregistrationcontroller",
              access: {
                  requiredLogin: true
              }
          })
           .when("/school", {
               templateUrl: "/views/admin/schoolregistration.html",
               controller: "schoolregistrationcontroller",
               access: {
                   requiredLogin: true
               }
           })
        .when("/school/:id", {
            templateUrl: "/views/admin/addschoolregistration.html",
            controller: "schoolregistrationcontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/schools", {
            templateUrl: "/views/admin/schools.html",
            controller: "schoolregistrationcontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/addschool", {
            templateUrl: "/views/admin/addschoolregistration.html",
            controller: "schoolregistrationcontroller",
            access: {
                requiredLogin: true
            }
        })
          .when("/parent", {
              templateUrl: "/views/parent/newsletters.html",
              controller: "parentcontroller",
              access: {
                  requiredLogin: true
              }
          })
         .when("/admin/:id", {
             templateUrl: "/views/admin/addeditadmin.html",
             controller: "admincontroller",
             access: {
                 requiredLogin: true
             }
         })
        .when("/addadmin", {
            templateUrl: "/views/admin/addeditadmin.html",
            controller: "admincontroller",
            access: {
                requiredLogin: true
            }
        })
        .when("/adminsetup", {
            templateUrl: "/views/admin/adminsetup.html",
            controller: "admincontroller",
            access: {
                requiredLogin: true
            }
        })
          .when("/admin_main", {
              templateUrl: "/views/admin/admin.html",
              controller: "admincontroller",
              access: {
                  requiredLogin: true
              }
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
eAssessorApp.run(function ($rootScope, $window, $location, authenticationfactory) {
    // when the page refreshes, check if the user is already logged in
    authenticationfactory.check();
    $rootScope.$on("$routeChangeStart", function (event, nextRoute, currentRoute) {
        if ((nextRoute.access && nextRoute.access.requiredLogin) && !authenticationfactory.isLogged) {
            $location.path("/login");
        } else {
            // check if user object exists else fetch it. This is incase of a page refresh
            if (!authenticationfactory.user) authenticationfactory.user = $window.sessionStorage.user;
            if (!authenticationfactory.userRole) authenticationfactory.userRole = $window.sessionStorage.userRole;
        }
    });

    $rootScope.$on('$routeChangeSuccess', function (event, nextRoute, currentRoute) {
        $rootScope.showMenu = authenticationfactory.isLogged;
        $rootScope.role = authenticationfactory.userRole;
        // if the user is already logged in, take him to the home page
        if (authenticationfactory.isLogged == true && $location.path() == '/login') {
            $location.path('/');
        }
    });
});
eAssessorApp.config(['$httpProvider', function ($httpProvider) {
    //initialize get if not there
    $httpProvider.defaults.cache = true;
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
