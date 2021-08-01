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

  addCourseListToDOM() {
    for (let prop in this) {
      if (this[prop].average) {
        let text = `${prop} takes on average ${this[prop].average
        } hours to complete and the max on record is ${this[prop].max}.`;

        let li = new ElementMakerHTML('li', text, 'list');
        li.appendElementToDOM();
      }
    }
  }
}

class DateMaker {
  constructor(days) {
    this.now = new Date();
    this.now.setDate(this.now.getDate() + days);
    this.now = this.now.toDateString();
  }
}

let launchSchoolHours = new hours();
launchSchoolHours.getMaxOfCourse();
launchSchoolHours.getBackendAvg();
launchSchoolHours.getMaxTotal();
launchSchoolHours.addCourseListToDOM();

let avgText = `The average time to finish the backend course is: ${
  launchSchoolHours.BackendAverage} hours.`;
let li = new ElementMakerHTML('li', avgText, 'list');
li.appendElementToDOM();

let maxText = `The maximum time on record to finish the backend course is: ${
  launchSchoolHours.BackendMax} hours.`;
let li2 = new ElementMakerHTML('li', maxText, 'list');
li2.appendElementToDOM();

class UserInput {
  constructor() {
    this.hours = this.getHoursPerWeek();
    this.done = this.getTotalHoursDone();
    this.total = launchSchoolHours.BackendAverage - this.done;
    this.maxTotal = launchSchoolHours.BackendMax - this.done;
    this.avgWeeks = Math.round((this.total / this.hours));
    this.maxWeeks = Math.round((this.maxTotal / this.hours));
  }

  getHoursPerWeek() {
    return Number(document.getElementById("hoursperweek").value);
  }

  getTotalHoursDone() {
    return Number(document.getElementById("hoursdone").value);
  }

  addYourAvgToDOM(date) {
    let yourAvgText = `Based on the average it will probably take you another ${
      this.total} hours or ${this.avgWeeks} weeks. This means that you would finish on ${date.now}`;
    let yourAvgEle = new ElementMakerHTML('li', yourAvgText,'list');
    yourAvgEle.appendElementToDOM();
  }

  addYourMaxEstimateToDOM(maxDate) {
    let yourMaxText = `Based on the maximum time on record it could take you another ${
      this.maxTotal} hours or ${this.maxWeeks} weeks. This means that you would finish on ${maxDate.now}`;
    let yourMaxEle = new ElementMakerHTML('li', yourMaxText,'list');
    yourMaxEle.appendElementToDOM();
  }
}

// gets user input
function getUserInput() {
  let user = new UserInput();

  let date = new DateMaker(user.avgWeeks * 7);
  user.addYourAvgToDOM(date);

  let maxDate = new DateMaker(user.maxWeeks * 7);
  user.addYourMaxEstimateToDOM(maxDate);
}

