eAssessorApp.service('commonservice', ['$http', function ($http) {
    var common = {};
    common.levels = levels;
    common.makeid = makeid;
    common.qualifications = qualifications;
    common.categories = categories;
    common.session = session;
    common.reportcategory = reportcategory;
    return common;
    function session() {
        return [{ id: "Current", description: "Current" },
                { id: "Past", description: "Past" } ]
    };
    function reportcategory() {
        return [{ id: "All", description: "All" },
                { id: "Single Subject", description: "Single Subject" }]
    };
    function levels() {
        return [{ id: "O/L", description: "O/L" },
    { id: "A/L", description: "A/L" },
    { id: "Year 7", description: "Year 7" },
     { id: "Year 8", description: "Year 8" },
     { id: "Year 9", description: "Year 9" },
     { id: "Year 10", description: "Year 10" },
     { id: "Year 11", description: "Year 11" }, ]
    };
    function qualifications() {
        return [{ id: "Dr", description: "Dr" },
    { id: "MSc", description: "MSc" },
    { id: "Prof", description: "Prof" },
     { id: "MEd", description: "MEd" },
     { id: "BA", description: "BA" },
     { id: "BEd", description: "BEd" },
     { id: "BSc", description: "BSc" },
     { id: "PGD", description: "PGD" },
        { id: "Dip", description: "Dip" },
        { id: "Cert", description: "Cert" }, ]
    };
    function categories() {
        return [{ id: "admin", description: "admin" },
    { id: "school", description: "school" },
     { id: "student", description: "student" },
     { id: "parent", description: "parent" },
     { id: "teacher", description: "teacher" }]
    };
    function makeid(schoolnameregnumber) {
        var text = "";
        var possible = schoolnameregnumber;
        for (var i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
}]);