
eHackerApp.service('homeservice', ['$http', function ($http) {
    this.gettopstories = function () {
        return $http.get("https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty").success(function (data) {
            return data
        });
    };
    this.getstorydetails = function (id) {
        return $http.get("https://hacker-news.firebaseio.com/v0/item/" + id + ".json?print=pretty").success(function (data) {
            return data;
        });
    }
}]);
