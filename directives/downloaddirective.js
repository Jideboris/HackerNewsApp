eAssessorApp.directive('pdfDownload', function () {
    return {
        restrict: 'E',
        templateUrl: '/views/templates/pdfdownload.html',
        scope: {
            action: '&'
        },
        link: function (scope, element, attr) {
            
            var anchor = element.children()[0];
            // When the download starts, disable the link
            scope.$on('download-start', function () {
                
                $(anchor).attr('disabled', 'disabled');
            });
            // When the download finishes, attach the data to the link. Enable the link and change its appearance.
            scope.$on('downloaded', function (event, data) {
                
                $(anchor).attr({href: 'data:application/pdf;base64,' + data,
                    download: attr.filename
                })
                    .removeAttr('disabled')
                    .text('Save')
                    .removeClass('btn-primary')
                    .addClass('btn-success');
            });
        },
        //controller: ['$scope', '$attrs', '$http', function ($scope, $attrs, $http) {
        //    $scope.downloadPdf = function () {
        //        
        //        $scope.$emit('download-start');
        //        $http.get($attrs.url).then(function (response) {
        //            
        //            $scope.$emit('downloaded', response.data);
        //        });
        //    };
        //}]
    }
});