eAssessorApp.factory('authenticationfactory', function ($window) {
    var auth = {
        isLogged: false,
        check: function () {
            if ($window.sessionStorage.token && $window.sessionStorage.user) {
                this.isLogged = true;
            } else {
                this.isLogged = false;
                delete this.user;
            }
        }
    }

    return auth;
});

eAssessorApp.factory('userauthfactory', function ($window, $location, $http, authenticationfactory) {
    return {
        login: function (username, password, category) {
            let assign = new FormData();
            assign.append('username', username);
            assign.append('password', password);
            assign.append('category', category);
            return $http.post(pathlog + '/login', assign, {
                transformRequest: angular.identity,
                headers: { 'Content-Type': undefined }
            })
             .success(function (response) {
                 return response;
             })
             .error(function (response) {
                 return response;
             });
            
        },
        logout: function () {
            if (authenticationfactory.isLogged) {
                authenticationfactory.isLogged = false;
                delete authenticationfactory.user;
                delete authenticationfactory.userRole;

                delete $window.sessionStorage.token;
                delete $window.sessionStorage.user;
                delete $window.sessionStorage.userRole;

                $location.path("/login");
            }

        }
    }
});

eAssessorApp.factory('tokeninterceptor', function ($q, $window) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers['X-Access-Token'] = $window.sessionStorage.token;
                config.headers['X-Key'] = $window.sessionStorage.user;
                config.headers['Cat'] = $window.sessionStorage.userRole;
                config.headers['Content-Type'] = "application/json";
            }
            return config || $q.when(config);
        },

        response: function (response) {
            return response || $q.when(response);
        }
    };
});