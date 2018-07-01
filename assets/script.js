
var eHackerApp = angular.module('eHackerApp', ['ui.bootstrap']);

eHackerApp.config(function ($routeProvider, $httpProvider) {
   // $httpProvider.interceptors.push('tokeninterceptor');
    $routeProvider
        .when("/", {
            templateUrl: "/views/home.html",
            controller: "homecontroller",
           
        })
        .otherwise({ redirectTo: '/' });
});
eHackerApp.run(function ($rootScope, $templateCache) {
    $rootScope.$on('$viewContentLoaded', function () {
        $templateCache.removeAll();
    });
});

eHackerApp.config(['$httpProvider', function ($httpProvider) {
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
