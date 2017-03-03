eAssessorApp.controller('pdfcontroller', function ($scope, $location, $routeParams, $cookieStore, teacherservice, $sce) {
    const user = $cookieStore.get('globals');
    const authdata = user.currentUser.authdata;
    
    let level = $routeParams.level;
    let subject = $routeParams.subject;
    let id = $routeParams.id
    teacherservice.getanassignment(id, level, subject, authdata).then(function (response) {
        
        var blob = new Blob([response.data], { type: 'application/pdf' });
        //var fileURL = URL.createObjectURL(file);

        saveAs(blob, "file.pdf");
        $scope.content = response.data;// $sce.trustAsResourceUrl(fileURL);
    });
});
