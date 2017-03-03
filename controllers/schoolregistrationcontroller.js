eAssessorApp.controller('schoolregistrationcontroller', function ($scope, commonservice, menuservice, schoolregistrationservice, $location, $routeParams, $parse) {
    var id = $routeParams.id;
    $scope.ceofullname = '';
    $scope.schooldescription = '';
    $scope.registeredname = '';
    $scope.locationaddress = '';
    $scope.regnumber = '';
    $scope.contactemailadmin = '';
    $scope.contacttelephoneadmin = '';
    $scope.websiteurl = '';
    $scope.logofile = '';
    $scope.brandcolor = '';
    $scope.islocked = false;
    $scope.schools = getschools(0);
    $scope.accounts = getaccounts();
    $scope.selectedstatus = 'All';
    $scope.lockedaccount = function (lock) {
        $scope.islocked = lock;
    }
    $scope.adminmenus = menuservice.admins().map(function (item) {
        let add = $location.url().replace('/', '');
        let dataitem = item.id.replace('#', '');
        if (dataitem === add) {
            item.style = "list-group-item active";
        }
        return item;
    });
    $scope.processaccountfilter = function () {
        var locked = Boolean(false);
        var status = $scope.selectedstatus;
        switch (status) {
            case 'All':
                $scope.accounts = getaccounts();
                break;
            default:
                if (status == 'unlocked') {
                    locked = Boolean(false);
                }
                else if (status == 'locked') {
                    locked = Boolean(true);
                }
                schoolregistrationservice.getschoolsbylock(locked).then(function (response) {
                    $scope.accounts = response.data;
                });
                break;
        }


    }
    $scope.processaccountlock = function (id, lock) {
        var updatedlocked = 0;
        lock = Boolean(lock);
        lock = !lock;
        $scope.islocked = lock;
        updatedlocked = Number(lock);
        // $scope.modellocked

        schoolregistrationservice.updateaccount(id, updatedlocked, lock).then(function (response) {
            $scope.schools = response.data;
        });
    }
    function getaccounts() {
        schoolregistrationservice.getaccounts().then(function (response) {
            $scope.accounts = response.data;
        });
    }
    function getschools(chklocked) {
        schoolregistrationservice.getschools(chklocked).then(function (response) {
            $scope.schools = response.data;
        });
    }
    if (typeof (id) != 'undefined') {
        schoolregistrationservice.getschoolbyid(id).then(function (response) {
            var data = response.data;
            $scope.ceofullname = data.ceofullname;
            $scope.schooldescription = data.schooldescription;
            $scope.registeredname = data.registeredname;
            $scope.locationaddress = data.locationaddress;
            $scope.regnumber = data.regnumber;
            $scope.contactemailadmin = data.contactemailadmin;
            $scope.contacttelephoneadmin = data.contacttelephoneadmin;
            $scope.websiteurl = data.websiteurl;
            $scope.myFile = data.myFile;
            $scope.brandcolor = data.brandcolor;
        });
    }
    $scope.addschoolclient = function () {
        var ceofullname = $scope.ceofullname;
        var schooldescription = $scope.schooldescription;
        var registeredname = $scope.registeredname;
        var locationaddress = $scope.locationaddress;
        var regnumber = $scope.regnumber;
        var contactemailadmin = $scope.contactemailadmin;
        var contacttelephoneadmin = $scope.contacttelephoneadmin;
        var websiteurl = $scope.websiteurl;
        var logofile = $scope.myFile;
        var brandcolor = $scope.brandcolor;
        var locked = $scope.islocked;
        var modellocked = $scope.modellocked;
        var item = registeredname.replace(/ /g, "-") + regnumber;
        var schoolpasscode = commonservice.makeid(item.toUpperCase());

        if (typeof (id) != 'undefined') {
            schoolregistrationservice.updateschool(ceofullname, schooldescription, registeredname, locationaddress, regnumber, contactemailadmin,
            contacttelephoneadmin, websiteurl, logofile, brandcolor, schoolpasscode, locked, modellocked, id);

        }
        else {
            schoolregistrationservice.addschool(ceofullname, schooldescription, registeredname, locationaddress, regnumber, contactemailadmin,
            contacttelephoneadmin, websiteurl, logofile, brandcolor, schoolpasscode);

        }
        $location.path('/school');

    }

    $scope.setItemEditRemove = function (id) {
        schoolregistrationservice.deleteschool(id);
        getschools();
    };
});