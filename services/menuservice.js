eAssessorApp.service('menuservice', ['$http', function ($http) {
    var menus = {};
    menus.assignmentsetup = assignmentsetup;
    menus.admins = admins;
    menus.schools = schools;
    menus.students = students;
    return menus;

    function assignmentsetup() {
        return [
            { id: "#teacherstudentregistration", description: "Registration", style: "list-group-item" },
            { id: "#teacherstudentattendanceregister", description: "Attendance", style: "list-group-item" },
            { id: "#teacher", description: "Test Setup", style: "list-group-item" },
            { id: "#teacherstudentassignment", description: "Setup Assignment", style: "list-group-item" },
            { id: "#studenttestscores", description: "Scores", style: "list-group-item" },
            { id: "#parentsappointments", description: "Appointments", style: "list-group-item" },
            { id: "#teacheremail", description: "Emailing & SMS", style: "list-group-item" },
            { id: "#teachersquestion", description: "Add Questions", style: "list-group-item" },
            //{ id: "#", description: "Approved Questions",style:"list-group-item" },
            { id: "#teachersuggestion", description: "Add Suggestions", style: "list-group-item" },
            { id: "#teachingmethod", description: "Share Teaching Method", style: "list-group-item" },
            //{ id: "#", description: "Summary Report",style:"list-group-item" },
        ]
    };
    function admins() {
        return [
           { id: "#admin_main", description: "Locations", style: "list-group-item" },
           { id: "#subject", description: "Subjects", style: "list-group-item" },
           { id: "#question", description: "Questions", style: "list-group-item" },
           { id: "#topic", description: "Topics", style: "list-group-item" },
           { id: "#school", description: "Schools", style: "list-group-item" },
           { id: "#schools", description: "View Accounts", style: "list-group-item" },
           { id: "#adminsetup", description: "View Admins", style: "list-group-item" }
           //{ id: "#adminviewquestion", description: "View Questions", style: "list-group-item" },
           //{ id: "#adminviewstudent", description: "View Students",style:"list-group-item" },
           //{ id: "#adminviewteacher", description: "View Teachers",style:"list-group-item" },
           //{ id: "#adminviewparent", description: "View Parents", style: "list-group-item" },
           //{ id: "#adminviewsuggestion", description: "View Suggestions",style:"list-group-item" },
           //{ id: "#adminviewsharemethod", description: "View Shared Methods",style:"list-group-item" },
           //{ id: "#adminmakepayment", description: "Make Payments",style:"list-group-item" },
           //{ id: "#adminerrorlog", description: "Error Log",style:"list-group-item" }
        ]
    }
    function schools() {
        return [
           { id: "#schoolclientstudent", description: "Students", style: "list-group-item" },
           { id: "#schoolclientteacher", description: "Teachers", style: "list-group-item" },
           { id: "#schoolreport", description: "Administrative/Report", style: "list-group-item" },
           { id: "#schooldisciplinary", description: "Disciplinaries Records", style: "list-group-item" },
           { id: "#schoolpromotionrecords", description: "Promotions", style: "list-group-item" },
        { id: "#schoolmonitor", description: "Monitoring Tools", style: "list-group-item" }

        ]
    }
    function students() {
        return [
           { id: "#studentreport", description: "Reports", style: "list-group-item" },
           { id: "#comparativereport", description: "Comparative Analysis", style: "list-group-item" },
           { id: "#progresstracker", description: "Progress Tracker", style: "list-group-item" },
         ]
    }
}]);
