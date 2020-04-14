fs = require('fs');
const csvToJson = require('csv-file-to-json')
// var fullWeek = require('./reports/fullWeek.csv');
// var report = csvToJson({filePath: './reports/fullWeek.csv'});
var report = require('./reports/fullWeek.json')
var education = report.filter(x => x['Department'] === "Education");
var teachersOnly = education.filter(x => x['Host'] !== 'Icon Online A')

//helper function to check minutes after hour
var isLate = function(startTime) {
    let time = startTime.slice(-9);
    let minutes = parseInt(time.slice(4, 6));
    if (minutes <= 20 && minutes >= 1) {
        return true;
    } else {
        return false;
    }
}

var lateOfficeHours = function (data) {
    var lateMeetings = data.filter(x => isLate(x['Start Time']));
    var result = "";
    return lateMeetings.reduce(function(memo, item) {
        return memo + item["Meeting ID"] + ", " + item["Host"] + ", " + item["Start Time"].split(',').join('') + "\n";
    }, result);
}

var print = "MeetingID, Host, Start Day/Time" + "\n" + lateOfficeHours(teachersOnly); //? 


console.log(print)

fs.writeFileSync('./lateOfficeHours.csv', print, function (err) {
    if (err) return console.log(err);
    console.log('it worked');
});