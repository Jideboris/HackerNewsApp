eHackerApp.controller('homecontroller', function ($scope, homeservice) {
    var parents = []
    var comments = []

    var main = []
    var allheaders = ''
    var start = 0
    var end = 10
    $scope.getallcontents = function (id) {
        let children = []
        $scope.iswaiting = true
        getcontent(id).then((d) => {
            processor(d.kids).then((o) => {
                for (let i = 0; i <= o.length - 1; i++) {
                    children.push(o[i])
                }
                $scope.iswaiting = false
            })

        })
        $scope.children = children
    }
    async function getheadercontent() {
        await homeservice.gettopstories().then(function (response) {
            allheaders = response.data
            let headers = getheaders(start, end, response.data)
            for (let i = 0; i <= headers.length - 1; i++) {
                getcontent(headers[i]).then((d) => {
                    parents.push({ id: d.id, title: d.title })
                })
            }
            $scope.parents = parents
        })
    }
    function getheaders(start, end, response) {
        let heads = []
        let content = response.sort(function (a, b) {
            return a - b;
        });
        for (let i = start; i <= end - 1; i++) {
            heads.push(content[i])
        }
        return heads
    }

    async function processor(kids) {
        if (typeof kids !== 'undefined') {
            for (let i = 0; i <= kids.length - 1; i++) {
                await getcontent(kids[i]).then((res) => {
                    if (typeof res.kids !== 'undefined') {
                        processor(res.kids)
                    }
                    comments.push({ id: res.id, parent: res.parent, text: res.text })
                })
            }
            return comments
        }
        return []
    }
    function getcontent(id) {
        let a = homeservice.getstorydetails(id).then((res) => {
            return res.data
        })
        return a
    }
    function concatenate(headers) {
        let newheaders = headers.map((data) => {
            return getcontent(data)
        })
        return newheaders
    }
    getheadercontent()

    $scope.hasmore = function () {
        return end < allheaders.length
    }
    $scope.hasless = function () {
        return end > 10
    }
    $scope.showmore = function () {
        start = end
        end = end + 10
        let refreshdata = []
        let headers = getheaders(start, end, allheaders)
        for (let i = 0; i <= headers.length - 1; i++) {
            getcontent(headers[i]).then((d) => {
                parents.push({ id: d.id, title: d.title })
            })
        }
        $scope.parents = parents
    }
    $scope.showless = function () {
        for (let i = 0; i <= 9; i++) {
            parents.pop()
        }
        start = start - 10
        end = end - 10
    }

});
