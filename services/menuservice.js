eAssessorApp.service('menuservice', ['$http', function ($http) {
    var menus = {};
    menus.assignmentsetup = assignmentsetup;
    menus.admins = admins;
    menus.schools = schools;
    menus.students = students;
    menus.homemenus = homemenu;
    menus.logincategory = logincategory;
    menus.parentmenus = parentmenus;
    return menus;
    function parentmenus() {
        return [
            { id: "#parent", description: "News Letters", style: "list-group-item" },
            { id: "#studentsreport", description: "View Reports", style: "list-group-item" },
            { id: "#bookappointment", description: "Book Appointment", style: "list-group-item" },
             { id: "#emailteacher", description: "Send Email", style: "list-group-item" },
            { id: "#downloadreports", description: "Download Reports", style: "list-group-item" },
            { id: "#comment", description: "Post Comments", style: "list-group-item" }
        ]
    }
    function logincategory() {
        return [
               { id: "#admin", description: "admin" },
               { id: "#school", description: "school" },
               { id: "#student", description: "student" },
               { id: "#parent", description: "parent" },
               { id: "#teacher", description: "teacher" }
        ]
    }
    function homemenu() {
        return [
                { id: "#firsttimer", description: "First timer?" },
                { id: "#aboutus", description: "FIND OUT ABOUT US?" },
                { id: "#ouraimandobjective", description: "Our aims and objectives?" },
                { id: "#contactus", description: "Contact us?" },
                { id: "#signup", description: "Register as a user?" },
                { id: "#usefullink", description: "Find useful links?" },
                { id: "#ourolevelsubject", description: "Currently covered O/L subjects" },
                { id: "#ouralevelsubject", description: "Currently covered A/L subjects" },
                { id: "#signin", description: "I'm a user" },
                { id: "#schoolperformances", description: "View schools' performances" },
                { id: "#quickpractice", description: "Practice/Test yourself" },
                { id: "#myhomework", description: "Home work" },
                { id: "#registeredusersassessment", description: "Assessment" },
                { id: "#needhelps", description: "I need help" },
                { id: "#teacherremarks", description: "Read teacher's remarks" },
                { id: "#topstudents", description: "Top students" },

        ]
    };
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
            { id: "#uploadnewsletter", description: "Upload Newsletters",style:"list-group-item" },
            { id: "#teachersuggestion", description: "Add Suggestions", style: "list-group-item" },
            { id: "#teachingmethod", description: "Share Teaching Method", style: "list-group-item" },
            { id: "#forwardrecommendation", description: "Recommendations", style: "list-group-item" },
            { id: "#sujectteacherremarks", description: "Remarks and Endorsement", style: "list-group-item" }
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
           { id: "#schoolmonitor", description: "Monitoring Tools", style: "list-group-item" },
           { id: "#schoolheadteacherremarks", description: "Remarks and Endorsement", style: "list-group-item" }

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
