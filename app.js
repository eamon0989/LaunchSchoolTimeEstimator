class hours {
  constructor() {
    this.JS101 = { hours: [190, 149, 307, 113, 102, 165, 78]};
    this.JS120 = { hours: [115, 175, 85, 131, 63, 87, 95, 90]};
    this.JS130 = { hours: [55, 80, 155, 69, 60, 36, 50, 58]};
    this.JS170 = { hours: [30, 26, 30, 38, 17, 35, 37, 9]};
    this.JS175 = { hours: [30, 73, 90, 58, 24, 76, 35, 52]};
    this.JS180 = { hours: [83, 49, 48, 58, 25, 27, 51, 51]};
    this.JS185 = { hours: [8, 10, 15, 15, 7, 12, 10, 16]};
  }

  getMaxOfCourse() {
    for (let prop in this) {
      this[prop].max = Math.max(...this[prop].hours);
    }
  }

  getMaxTotal() {
    let max = 0;
    for (let prop in this) {
      if (this[prop].max) {
        max += this[prop].max;
      }
    }

    this.BackendMax = max;
  }

  getBackendAvg() {
    let courseAvg = 0;
    for (let prop in this) {
      this[prop].average = Math.round(this[prop].hours
        .reduce((acc, num) => acc + num) / this[prop].hours.length);
      courseAvg += this[prop].average;
    }

    this.BackendAverage = courseAvg;
  }
}

let launchSchoolHours = new hours();
launchSchoolHours.getMaxOfCourse();
launchSchoolHours.getBackendAvg();
launchSchoolHours.getMaxTotal();

class ElementMakerHTML {
  constructor(elementType, text, parentElement) {
    this.ele = document.createElement(elementType);
    this.textNode = document.createTextNode(text);
    this.ele.appendChild(this.textNode);
    this.parentElement = document.getElementById(parentElement);
  }

  appendElementToDOM() {
    this.parentElement.appendChild(this.ele);
  }
}

class DateMaker {
  constructor(days) {
    this.now = new Date();
    this.now.setDate(this.now.getDate() + days);
    this.now = this.now.toDateString();
  }
}

// This function adds a new list element to the DOM for each 'course'
function createListOfAverageTimes() {
  for (let prop in launchSchoolHours) {
    if (launchSchoolHours[prop].average) {
      let text = `${prop} takes on average ${launchSchoolHours[prop].average
      } hours to complete and the max on record is ${launchSchoolHours[prop].max}.`;

      let li = new ElementMakerHTML('li', text, 'list');
      li.appendElementToDOM();
    }
  }
}

// gets user input
function getUserInput() {
  let hours = getHoursPerWeek();
  let done = getTotalHoursDone();
  let total = launchSchoolHours.BackendAverage - done;
  let maxTotal = launchSchoolHours.BackendMax - done;
  let days = (total / hours) * 7;
  let maxDays = (maxTotal / hours) * 7;

  let date = new DateMaker(days);
  let yourAvgText = `Based on the average it will probably take you another ${
    total} hours or ${Math.round(total / hours)
  } weeks. This means that you would finish on ${date.now}`;
  let yourAvgEle = new ElementMakerHTML('div', yourAvgText,'insertText');
  yourAvgEle.appendElementToDOM();

  let maxDate = new DateMaker(maxDays);
  let yourMaxText = `Based on the max on record it could take you another ${
    maxTotal} hours or ${Math.round(maxTotal / hours)
  } weeks. This means that you would finish on ${maxDate.now}`;
  let yourMaxEle = new ElementMakerHTML('div', yourMaxText,'insertText');
  yourMaxEle.appendElementToDOM();
}

function getTotalHoursDone() {
  return Number(document.getElementById("hoursdone").value);
}

function getHoursPerWeek() {
  return Number(document.getElementById("hoursperweek").value);
}

createListOfAverageTimes();

let avgText = `The average time to finish the backend course is: ${
  launchSchoolHours.BackendAverage} hours.`;
let li = new ElementMakerHTML('li', avgText, 'list');
li.appendElementToDOM();

let maxText = `The Max time on record to finish the backend course is: ${
  launchSchoolHours.BackendMax} hours.`;
let li2 = new ElementMakerHTML('li', maxText, 'list');
li2.appendElementToDOM();