//**import the week's office hour data**
fs = require('fs');
const csv = require('csvtojson');
// var bang = require("../pastJSON/bang020520");
// var derek = require("../pastJSON/derek020620");
// var jerry = require("../pastJSON/jerry020520");
// var johnvon = require("../pastJSON/johnvon020720");
var grooveAnalysis = './scripts/reports/grooveAnalysis.csv';
var meganK = './scripts/reports/meganK.csv';
var malachiM = './scripts/reports/malachiM.csv';
var davidM = './scripts/reports/davidM.csv'
var maxP = './scripts/reports/maxP.csv'
var nickA = './scripts/reports/nickA.csv'
var derekP = './scripts/reports/derekP.csv'
var beatRecipes = './scripts/reports/beatRecipes.csv'
var jonP = './scripts/reports/jonP.csv'
var prestonW = './scripts/reports/prestonW.csv'
var mattB = './scripts/reports/mattB.csv'
var paulL = './scripts/reports/paulL.csv'
var kristenGP = './scripts/reports/kristenGP.csv'
var anthonyP = './scripts/reports/anthonyP.csv'
var remixLab = './scripts/reports/remixLab.csv'
var orionN = './scripts/reports/orionN.csv'
var jerryD = './scripts/reports/jerryD.csv'
var namasteInside = './scripts/reports/namasteInside.csv'
var richardN = './scripts/reports/richardN.csv'
var lyricistL = './scripts/reports/lyricistL.csv'
var musicHistory = './scripts/reports/musicHistory.csv'
var peteyE = './scripts/reports/peteyE.csv'
var samB = './scripts/reports/samB.csv'
var desM = './scripts/reports/desM.csv'
var kristianR = './scripts/reports/kristianR.csv'
var aaronP = './scripts/reports/aaronP.csv'
var connorS = './scripts/reports/connorS.csv'
var michaelD = './scripts/reports/michaelD.csv'
var mattN = './scripts/reports/mattN.csv'
var daneM = './scripts/reports/daneM.csv'
var romanP = './scripts/reports/romanP.csv'
var kyleS = './scripts/reports/kyleS.csv'
var gregS = './scripts/reports/gregS.csv'
var soundDesignClub = './scripts/reports/soundDesignClub'
var taylrR = './scripts/reports/taylrR'
var ericP = './scripts/reports/ericP'
var scottZ = './scripts/reports/scottZ'

//**create array for processing**
var allCSV = [
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
  lyricistL,
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
  kyleS,
  gregS,
  soundDesignClub,
  taylrR,
  ericP,
  scottZ,
]
//** MAP CSV **/
var convert = (path) => {
  csv()
  .fromFile(path)
  .then((jsonObj) => {
    console.log(jsonObj)
  })
  var json = await csv().fromFile(path);

  return json;
}

convert(desM) //?


// **IN PROGRESS** */
// var allFiles = require('require-all')({dirname: __dirname +'/stuff'})
// allMeets = [];

// for (var meet in allFiles) {
//   allMeets.push(allFiles[meet])
// }

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