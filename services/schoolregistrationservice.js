eAssessorApp.service('schoolregistrationservice', ['$http', function ($http) {

    var urlschool = 'http://localhost:3000/schools';
    var urlsendmail = 'http://localhost:3000/submit';
    var urladdschool = 'http://localhost:3000/addschool';
    var urlupdate = 'http://localhost:3000/updateschool';
    var urldelete = 'http://localhost:3000/deleteschool';
    var urlschoolbyid = 'http://localhost:3000/schoolbyid';
    var urlschoolaccount = 'http://localhost:3000/addschoolaccount';
    var urlallschoolaccount = 'http://localhost:3000/allschools';
    var urlupdateaccount = 'http://localhost:3000/updateaccount';
    var urlallschoolsbylock = 'http://localhost:3000/allschoolsbylock';


    this.addschoolaccount = function (contactemailadmin, schoolpasscode, registeredname, regnumber, license) {
        return $http.get(urlschoolaccount + '/' + contactemailadmin + '/' + schoolpasscode + '/'
                   + registeredname + '/' + regnumber + '/' + license).success(function (response) {
                       return response;
                   }).error(function (response) { });
    };
    this.getschoolbyid = function (id) {
        return $http.get(urlschoolbyid + '/' + id).success(function (response) {
            return response;
        }).error(function (response) { });
    };
    this.addschool = function (ceofullname, schooldescription, registeredname, locationaddress, regnumber, contactemailadmin,
        contacttelephoneadmin, websiteurl, logofile, brandcolor, schoolpasscode) {

        var fd = new FormData();
        fd.append('file', logofile);
        fd.append('ceofullname', ceofullname);
        fd.append('schooldescription', schooldescription);
        fd.append('registeredname', registeredname);
        fd.append('locationaddress', locationaddress);
        fd.append('regnumber', regnumber);
        fd.append('contactemailadmin', contactemailadmin);
        fd.append('contacttelephoneadmin', contacttelephoneadmin);
        fd.append('websiteurl', websiteurl);
        fd.append('brandcolor', brandcolor);
        fd.append('schoolpasscode', schoolpasscode);

        $http.post(urladdschool, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).success(function (response) {
            //send email to the school admin
            if (response !== '') {
                return $http.get(urlsendmail + '/' + response.ops[0].contactemailadmin + '/' + response.ops[0].schoolpasscode + '/'
                   + response.ops[0].registeredname + '/' + response.ops[0].regnumber + '/' + response.ops[0]._id).success(function (data) {

                   });
            }
        })
        .error(function (response) {
        });


    };

    this.updateschool = function (ceofullname, schooldescription, registeredname, locationaddress, regnumber, contactemailadmin,
        contacttelephoneadmin, websiteurl, logofile, brandcolor, schoolpasscode, locked, id) {
        
        var fd = new FormData();
        fd.append('file', logofile);
        fd.append('id', id);
        fd.append('ceofullname', ceofullname);
        fd.append('schooldescription', schooldescription);
        fd.append('registeredname', registeredname);
        fd.append('locationaddress', locationaddress);
        fd.append('regnumber', regnumber);
        fd.append('contactemailadmin', contactemailadmin);
        fd.append('contacttelephoneadmin', contacttelephoneadmin);
        fd.append('websiteurl', websiteurl);
        fd.append('brandcolor', brandcolor);
        fd.append('schoolpasscode', schoolpasscode);
        fd.append('locked', locked);
        fd.append('modellocked', modellocked);
        $http.post(urlupdate, fd, {
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }).success(function (response) {

        })
       .error(function (response) {

       });

    }
    this.updateaccount = function (id, updatedlocked, lock) {
        return $http.put(urlupdateaccount + '/' + id + '/' + updatedlocked + '/' + lock).success(function (data) {
            return data;
        });
    }
    this.getaccounts = function () {
        return $http.get(urlallschoolaccount).success(function (data) {
            return data;
        });
    };
    this.getschoolsbylock = function (locked) {
        return $http.get(urlallschoolsbylock + '/' + locked).success(function (data) {
            return data;
        });
    };
    this.getschools = function (chklocked) {
        return $http.get(urlschool + '/' + chklocked).success(function (data) {
            return data;
        });
    };

    this.sendmail = function (mail, passcode, registeredname, renumber, license) {
        return $http.get(urlsendmail + '/' + mail + '/' + passcode + '/'
                  + registeredname + '/' + renumber + '/' + license).success(function (data) {
                      return data;
                  });
    };
    this.deleteschool = function (id) {
        return $http.delete(urldelete + '/' + id).success(function (data) {
        }).error(function (data) { });
    };
}]);
