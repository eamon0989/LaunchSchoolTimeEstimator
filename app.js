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

// This function creates html list elements and adds them to the html
// based on the numbers from the launchSchoolHours object.
function createListOfAverageTimes() {
  let list = document.getElementById("list");

  for (let prop in launchSchoolHours) {
    if (launchSchoolHours[prop].average) {
      let li = document.createElement('li');
      let course = document.createTextNode(`${prop} takes on average ${
        launchSchoolHours[prop].average
      } hours to complete and the max on record is ${
        launchSchoolHours[prop].max}.`);
      list.appendChild(li);
      li.appendChild(course);
      document.getElementById('list').appendChild(li);
    }
  }

  createAvgTotalElement();
  createAvgMaxElement();
}

function createAvgTotalElement() {
  let li = document.createElement('li');
  let courseAvg = launchSchoolHours.BackendAverage;
  let courseAvgNode = document
    .createTextNode(`The average time to finish the backend course is: ${
      courseAvg}.`);
  li.appendChild(courseAvgNode);
  document.getElementById('list').appendChild(li);
}

function createAvgMaxElement() {
  let li2 = document.createElement('li');
  let courseMax = launchSchoolHours.BackendMax;
  let courseMaxNode = document
    .createTextNode(`The Max time on record to finish the backend course is: ${
      courseMax}.`);
  li2.appendChild(courseMaxNode);
  document.getElementById('list').appendChild(li2);
}

function getHoursPerWeek() {
  let hours = Number(document.getElementById("hoursperweek").value);
  let done = getTotalHoursDone();
  let total = launchSchoolHours.BackendAverage - done;
  let maxTotal = launchSchoolHours.BackendMax - done;

  createYourAvgHoursElement(total, hours);
  createYourMaxHoursElement(maxTotal, hours);
}

function createYourAvgHoursElement(total, hours) {
  let now = new Date();
  now.setDate(now.getDate() + ((total / hours) * 7));
  let date = now.toDateString();
  let div2 = document.createElement('div');
  document.getElementById('insertText').appendChild(div2);
  let left = document
    .createTextNode(`Based on the average it will probably take you another ${
      total} hours or ${Math.round(total / hours)
    } weeks. This means that you would finish on ${date}`);
  div2.appendChild(left);
}

function createYourMaxHoursElement(maxTotal, hours) {
  let now = new Date();
  now.setDate(now.getDate() + ((maxTotal / hours) * 7));
  let date = now.toDateString();
  let maxDiv = document.createElement('div');
  document.getElementById('insertText').appendChild(maxDiv);
  let maxLeft = document
    .createTextNode(`Based on the max on record it could take you another ${
      maxTotal} hours or ${Math.round(maxTotal / hours)
    } weeks. This means you would finish on ${date}`);
  maxDiv.appendChild(maxLeft);
}

function getTotalHoursDone() {
  return Number(document.getElementById("hoursdone").value);
}

createListOfAverageTimes();