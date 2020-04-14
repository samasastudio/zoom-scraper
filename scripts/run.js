//** import the week's office hour data**
fs = require('fs');
const csv = require('csvtojson');
const csvToJson = require('csv-file-to-json');
var grooveAnalysis = csvToJson({filePath: './scripts/reports/grooveAnalysis.csv'});
var meganK = csvToJson({filePath: './scripts/reports/meganK.csv'});
var malachiM = csvToJson({filePath: './scripts/reports/malachiM.csv'});
var davidM = csvToJson({filePath: './scripts/reports/davidM.csv'});
var maxP = csvToJson({filePath: './scripts/reports/maxP.csv'});
var nickA = csvToJson({filePath: './scripts/reports/nickA.csv'});
var derekP = csvToJson({filePath: './scripts/reports/derekP.csv'});
var beatRecipes = csvToJson({filePath: './scripts/reports/beatRecipes.csv'});
var jonP = csvToJson({filePath: './scripts/reports/jonP.csv'});
var prestonW = csvToJson({filePath: './scripts/reports/prestonW.csv'});
var mattB = csvToJson({filePath: './scripts/reports/mattB.csv'});
var paulL = csvToJson({filePath: './scripts/reports/paulL.csv'});
var kristenGP = csvToJson({filePath: './scripts/reports/kristenGP.csv'});
var anthonyP = csvToJson({filePath: './scripts/reports/anthonyP.csv'});
var remixLab = csvToJson({filePath: './scripts/reports/remixLab.csv'});
var orionN = csvToJson({filePath: './scripts/reports/orionN.csv'});
var jerryD = csvToJson({filePath: './scripts/reports/jerryD.csv'});
var namasteInside = csvToJson({filePath: './scripts/reports/namasteInside.csv'});
var richardN = csvToJson({filePath: './scripts/reports/richardN.csv'});
var lyricistLounge = csvToJson({filePath: './scripts/reports/lyricistLounge.csv'});
var musicHistory = csvToJson({filePath: './scripts/reports/musicHistory.csv'});
var peteyE = csvToJson({filePath: './scripts/reports/peteyE.csv'});
var samB = csvToJson({filePath: './scripts/reports/samB.csv'});
var desM = csvToJson({filePath: './scripts/reports/desM.csv'});
var kristianR = csvToJson({filePath: './scripts/reports/kristianR.csv'});
var aaronP = csvToJson({filePath: './scripts/reports/aaronP.csv'});
var connorS = csvToJson({filePath: './scripts/reports/connorS.csv'});
var michaelD = csvToJson({filePath: './scripts/reports/michaelD.csv'});
var mattN = csvToJson({filePath: './scripts/reports/mattN.csv'});
var daneM = csvToJson({filePath: './scripts/reports/daneM.csv'});
var romanP = csvToJson({filePath: './scripts/reports/romanP.csv'});
// var kyleS = csvToJson({filePath: './scripts/reports/kyleS.csv'});
var gregS = csvToJson({filePath: './scripts/reports/gregS.csv'});
var soundDesignClub = csvToJson({filePath: './scripts/reports/soundDesignClub.csv'});
var taylrR = csvToJson({filePath: './scripts/reports/taylrR.csv'});
var ericP = csvToJson({filePath: './scripts/reports/ericP.csv'});
var scottZ = csvToJson({filePath: './scripts/reports/scottZ.csv'});
var qna = csvToJson({filePath: './scripts/reports/qna.csv'})

//** create array for processing**
var allMeets = [
  grooveAnalysis,
  meganK,
  malachiM,
  davidM,
  maxP,
  nickA,
  derekP,
  beatRecipes,
  jonP,
  prestonW,
  mattB,
  paulL,
  kristenGP,
  anthonyP,
  remixLab,
  orionN,
  jerryD,
  namasteInside,
  richardN,
  lyricistLounge,
  musicHistory,
  peteyE,
  samB,
  desM,
  kristianR,
  aaronP,
  connorS,
  michaelD,
  mattN,
  daneM,
  romanP,
  // kyleS,
  gregS,
  soundDesignClub,
  taylrR,
  ericP,
  scottZ,
  qna
]


//**count attendance eliminates duplicates and counts the number of students in meeting
var countAttendance = function (meeting) {
    meeting.length //?
    console.log(meeting)
    var result = [];
    var host = meeting[1]['Host'];
    meeting.forEach(function(x) {
        let currentIP = x['Host'];
        let currentID = x['Meeting ID'];
        if (result.indexOf(currentIP) === -1 && currentID !== host) {
            result.push(currentIP);
        }
    })
    var students = result.slice(2);
    return meeting[1]['Host'] + ', ' + students.length + ', ' + meeting[1]['Duration (hh:mm:ss)'] + ', ' + meeting[1]['Start Time'].split(',').join('');
}
//checkUniq will count total number of unique student attendance to get an idea on how many students attend office hour
var checkUniq = function(data) {
  var uniqNames = [];
  var uniqIPs = [];
  data.forEach(function(meet) {
    let host = meet[1]['Host']; //?
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

var print = "Host, Attendance, Duration, Date/Time" +
allMeets.map(x => '\n' + countAttendance(x)) +
'\n' +
'\n' + "Dates, UniqNames, UniqueIPs" +
'\n' + "03/06/20 - 03/11/20, " + checkUniq(allMeets);

fs.writeFileSync('OHData.csv', print, function (err) {
  if (err) return console.log(err);
  console.log('it worked');
});