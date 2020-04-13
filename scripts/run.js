//import the week's office hour data
fs = require('fs');
var bang = require("../pastJSON/bang020520");
var derek = require("../pastJSON/derek020620");
var jerry = require("../pastJSON/jerry020520");
var johnvon = require("../pastJSON/johnvon020720");
var kerry = require("../pastJSON/kerry020620");
var kyle = require("../pastJSON/kyle020520");
var malachi = require("../pastJSON/malachi020620");
var max = require("../pastJSON/max020420");
var paul = require("../pastJSON/paul020620");
var petey = require("../pastJSON/petey020520");
var sam = require("../pastJSON/sam020520");
var scott = require("../pastJSON/scott020620");
//create array for processing
var allMeets = [
  bang,
  derek,
  jerry,
  johnvon,
  kerry,
  malachi,
  max,
  paul,
  petey,
  sam,
  scott
]
//count attendance eliminates duplicates and counts the number of students in meeting
var countAttendance = function (meeting) {
    meeting.length //?
    var result = [];
    var host = meeting[0]['Host'];
    meeting.forEach(function(x) {
        let currentIP = x['Host'];
        let currentID = x['Meeting ID'];
        if (result.indexOf(currentIP) === -1 && currentID !== host) {
            result.push(currentIP);
        }
    })
    var students = result.slice(2);
    return meeting[0]['Host'] + ', ' + students.length + ', ' + meeting[0]['Start Time'].split(',').join('');
}
//checkUniq will count total number of unique student attendance to get an idea on how many students attend office hour
var checkUniq = function(data) {
  var uniqNames = [];
  var uniqIPs = [];
  data.forEach(function(meet) {
    let host = meet[0]['Host']; //?
    let attendees = meet.slice(2);
    attendees.forEach(function(person) {
      let currentID = person['Meeting ID']
      let currentIP = person['Host'];
      if (uniqIPs.indexOf(currentIP) === -1 &&  uniqNames.indexOf(currentID) === -1 && currentID !== host) {
        if (currentID.indexOf('iPhone') === -1 && currentID !== 'Admin') {
          uniqIPs.push(currentIP);
          uniqNames.push(currentID);
        }
      }
    })
  })
  
  return uniqNames.sort().join(' ') + ', ' + uniqNames.length;
}

checkUniq(allMeets) //?
//total has about 47% of students going to office hours

var print = "Host, Attendance, Date/Time" +
allMeets.map(x => '\n' + countAttendance(x)) +
'\n' +
'\n' + "Dates, UniqNames, UniqueIPs" +
'\n' + "02/03/20 - 02/10/20, " + checkUniq(allMeets);

fs.writeFileSync('OHData.csv', print, function (err) {
  if (err) return console.log(err);
  console.log('it worked');
});