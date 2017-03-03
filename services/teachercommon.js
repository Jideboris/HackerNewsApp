path = 'http://localhost:3000'

function prepareschoolstudent(data) {
    let prepareschoolstuduent = [];
    for (let i = 0; i < data.length; i++) {
        let fullname = data[i].schoolstudent.fullname;
        let dateofbirth = data[i].schoolstudent.dateofbirth;
        let studentid = data[i].id;

        prepareschoolstuduent.push({
            fullname: fullname,
            dob: dateofbirth,
            studentid: studentid,
            
        });
    }
    return prepareschoolstuduent;
}

function prepareschoolstudentsbysubjectandlevel(data) {
    let arraydata = angular.fromJson(data);
    let prepareschoolstuduent = [];
    for (let i = 0; i < arraydata.length; i++) {
        let fullname = arraydata[i].fullname;
        let dateofbirth = arraydata[i].dob;
        let selected = arraydata[i].selected;
        let studentid = arraydata[i].studentId;
        let teacherid = arraydata[i].teacherId;

        prepareschoolstuduent.push({
            fullname: fullname,
            dateofbirth: dateofbirth,
            selected: selected,
            studentid: studentid,
            teacherid: teacherid
        });
    }
    return prepareschoolstuduent;
};
function selectcheckboxes(it, lists) {
    if (typeof (it) == 'undefined') {
        it = true;
    }
    else {
        it = !it;
    }
    let newlist = lists.map(function (item) {
        item.selected = it;
        item.selectedstudent = it;
        return item;
    });
    return newlist;
};
function prepareteachers(data) {
    var preparedteacher = {
        teachsubjects: [],
        teachlevels: []
    }
    var teachlevels = [];
    var teachsubjects = [];
    var subjects = angular.fromJson(data.data[0].subjects);
    var levels = angular.fromJson(data.data[0].levels);

    for (var i = 0; i < subjects.length; i++) {
        var sub = subjects[i];
        teachsubjects.push({ id: sub, description: sub, ischecked: false });
    }
    for (var i = 0; i < levels.length; i++) {
        var lev = levels[i];
        teachlevels.push({ id: lev, description: lev });
    }
    preparedteacher.teachsubjects = teachsubjects;
    preparedteacher.teachlevels = teachlevels;
    return preparedteacher;
}
function getcurrentdate() {
    let currentDate = new Date()
    let day = currentDate.getDate()
    let month = currentDate.getMonth() + 1
    let year = currentDate.getFullYear()
    return day + "/" + month + "/" + year;
}
function sortByKey(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}