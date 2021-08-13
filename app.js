/* * Class representing an HTML Element */
class ElementMakerHTML {
  /**
   * Create and initialize an new HTML element
   * @param {string} elementType - the type of element to be created. e.g. <li></li> (list item)
   * @param {string} text - The text to be embedded in the html element e.g. <li>JS101 takes...</li>
   * @param {string} parentElement - the parent element the child element belongs to e.g. <ul><li></li></ul>
   * @param {string} id - the CSS id for that html element e.g. <ul id="courseList">
   * @param {string} className - the CSS class name for an html element e.g. <button class="submitbutton">
   * @param {string} placeholder - the place holder text for an element e.g. <input placeholder="How many...">
   */
  constructor(elementType, text, parentElement, id, className, placeholder) {
    this.ele = document.createElement(elementType);
    if (text) {
      this.textNode = document.createTextNode(text);
      this.ele.appendChild(this.textNode);
    }

    this.parentElement = document.getElementById(parentElement);
    if (id) this.ele.id = id;
    if (className) this.ele.className = className;
    if (placeholder) this.ele.placeholder = placeholder;
  }

  /**
   * Append the newly created HTML element to DOM tree
   */
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

let user;

class Hours {
  constructor() {
    this.JS101 = { hours: [190, 149, 307, 113, 102, 165, 78] };
    this.JS120 = { hours: [115, 175, 85, 131, 63, 87, 95, 90] };
    this.JS130 = { hours: [55, 80, 155, 69, 60, 36, 50, 58] };
    this.JS170 = { hours: [30, 26, 30, 38, 17, 35, 37, 9] };
    this.JS175 = { hours: [30, 73, 90, 58, 24, 76, 35, 52] };
    this.JS180 = { hours: [83, 49, 48, 58, 25, 27, 51, 51] };
    this.JS185 = { hours: [8, 10, 15, 15, 7, 12, 10, 16] };
    this.LS202 = { hours: [78, 55, 160, 46, 92, 38] };
    this.LS215 = { hours: [75, 66, 60, 105, 52, 89, 77, 73] };
    this.LS230 = { hours: [212, 245, 91, 187, 187, 192, 172, 136] };
    this.getMaxOfCourse();
    this.getCoreAverage();
    this.getBackendAverage();
    this.getFrontendAverage();
    this.getMaxTotal();
    this.addCourseListToDOM();
    this.addBackendAverageToDOM();
    this.addFrontendAveragetoDom();
    this.addAvgToDom();
    this.addMaxToDom();
  }

  getMaxOfCourse() {
    for (let prop in this) {
      if (this[prop]) this[prop].max = Math.max(...this[prop].hours);
    }
  }

  getMaxTotal() {
    let max = 0;
    for (let prop in this) {
      if (this[prop]) {
        if (this[prop].max) {
          max += this[prop].max;
        }
      }
    }

    this.coreMax = max;
  }

  getCoreAverage() {
    let courseAvg = 0;
    for (let prop in this) {
      if (this[prop]) {
        this[prop].average = Math.round(this[prop].hours
          .reduce((acc, num) => acc + num) / this[prop].hours.length);
        courseAvg += this[prop].average;
      }
    }

    this.coreAverage = courseAvg;
  }

  getBackendAverage() {
    let backendAvg = 0;
    for (let prop in this) {
      if (this[prop] && prop.startsWith('JS')) {
        this[prop].average = Math.round(this[prop].hours
          .reduce((acc, num) => acc + num) / this[prop].hours.length);
        backendAvg += this[prop].average;
      }
    }

    this.backendAverage = backendAvg;
  }

  addBackendAverageToDOM() {
    let avgText = `The average time to finish the JavaScript backend track is: ${
      this.backendAverage} hours.`;
    let li = new ElementMakerHTML('li', avgText, 'courseList');
    li.appendElementToDOM();
  }

  getFrontendAverage() {
    let frontendAvg = 0;
    for (let prop in this) {
      if (this[prop] && prop.startsWith('LS')) {
        this[prop].average = Math.round(this[prop].hours
          .reduce((acc, num) => acc + num) / this[prop].hours.length);
        frontendAvg += this[prop].average;
      }
    }

    this.frontendAverage = frontendAvg;
  }

  addFrontendAveragetoDom() {
    let avgText = `The average time to finish the JavaScript frontend track is: ${
      this.frontendAverage} hours.`;
    let li = new ElementMakerHTML('li', avgText, 'courseList');
    li.appendElementToDOM();
  }

  addCourseListToDOM() {
    for (let prop in this) {
      if (this[prop]) {
        if (this[prop].average) {
          let text = `${prop} takes on average ${this[prop].average
          } hours to complete and the max on record is ${this[prop].max}.`;

          let li = new ElementMakerHTML('li', text, 'courseList');
          li.appendElementToDOM();
        }
      }
    }
  }

  addAvgToDom() {
    let avgText = `The average time to finish the JavaScript track is: ${
      this.coreAverage} hours.`;
    let li = new ElementMakerHTML('li', avgText, 'courseList');
    li.appendElementToDOM();
  }

  addMaxToDom() {
    let maxText = `The maximum time on record to finish the JavaScript track is: ${
      this.coreMax} hours.`;
    let li2 = new ElementMakerHTML('li', maxText, 'courseList');
    li2.appendElementToDOM();
  }

  computeMoreAccurate(js109Hours) {
    let comparedToAvgJS109 = js109Hours / this.JS101.average;
    this.addYourComputedAvgEstimateToDOM(comparedToAvgJS109);
  }

  addYourComputedAvgEstimateToDOM(comparedToAvgJS109) {
    let hoursLeft = Math.round(this.coreAverage * comparedToAvgJS109)
    - user.done;
    let weeksLeft = Math.ceil(hoursLeft / user.hours);
    let date = new DateMaker(weeksLeft * 7);

    let yourAvgText = `Based on your input it will probably take you another ${hoursLeft
    } hours or ${weeksLeft} weeks. This means that you would finish on ${date.now}.`;
    let yourAvgEle = new ElementMakerHTML('li', yourAvgText,'list');
    yourAvgEle.appendElementToDOM();
  }
}

let launchSchoolHours = new Hours();


class UserInput {
  constructor() {
    this.hours = this.getHoursPerWeek();
    this.done = this.getTotalHoursDone();
    this.total = launchSchoolHours.coreAverage - this.done;
    this.maxTotal = launchSchoolHours.coreMax - this.done;
    this.avgWeeks = Math.round((this.total / this.hours));
    this.maxWeeks = Math.round((this.maxTotal / this.hours));
  }

  getHoursPerWeek() {
    return Number(document.getElementById('hoursperweek').value);
  }

  getTotalHoursDone() {
    return Number(document.getElementById('hoursdone').value);
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

  addMoreAccurateToDom() {
    let moreAccurateText = `If you want a more accurate estimate and have finished both JS101 and JS109, write how many hours it took you to complete both here:`;
    let li2 = new ElementMakerHTML('li', moreAccurateText, 'list', 'js120hours');
    li2.appendElementToDOM();
    let inputDiv = new ElementMakerHTML('div', '', 'list', 'inputDiv');
    inputDiv.appendElementToDOM();
    let input = new ElementMakerHTML('input', '', 'inputDiv', 'numberInput', '', "If you don't know, multiply avg hours per week by weeks spent studying.");
    input.appendElementToDOM();
    let submitButton = new ElementMakerHTML('div', 'Submit', 'inputDiv', 'js120submitbutton', 'submitbutton');
    submitButton.appendElementToDOM();
  }
}

// gets user input
function getUserInput() {
  if (!validateHoursPerWeekInput('hoursperweek')) return false;
  user = new UserInput();

  let date = new DateMaker(user.avgWeeks * 7);
  user.addYourAvgToDOM(date);

  let maxDate = new DateMaker(user.maxWeeks * 7);
  user.addYourMaxEstimateToDOM(maxDate);
  document.getElementById('submitbutton').style.display = 'none';

  user.addMoreAccurateToDom();
  document.getElementById('js120submitbutton').addEventListener('click', getJS120Input);
}

function getJS120Input() {
  if (!validateHoursPerWeekInput('numberInput')) return false;
  let js120hours = Number(document.getElementById('numberInput').value);
  launchSchoolHours.computeMoreAccurate(js120hours);
}

function validateHoursPerWeekInput(element) {
  let input = Number(document.getElementById(element).value);

  if (Number.isNaN(input) || input <= 0) {
    alert('Please input how many hours you study per week.');
    return false;
  }

  return true;
}

function scrollToBottom() {
  window.scrollTo(0, document.body.scrollHeight);
}

function hideButton() {
  document.getElementById('js120submitbutton').style.display = 'none';
}

function resetButton() {
  let li = new ElementMakerHTML('div', '', 'list', 'buttonDiv');
  li.appendElementToDOM();
  let reset = new ElementMakerHTML('div', 'Reset', 'buttonDiv', 'resetButton', 'submitbutton');
  reset.appendElementToDOM();
  document.getElementById('resetButton').addEventListener('click', reloadPage);
}

function hideList() {
  if (document.getElementById('hoursperweek').value) {
    let list = document.getElementById('courseList');
    list.style.display = 'none';
    document.getElementById('js120submitbutton').addEventListener('click', hideButton);
    document.getElementById('js120submitbutton').addEventListener('click', resetButton);
    document.getElementById('js120submitbutton').addEventListener('click', scrollToBottom);
  }
}

function reloadPage() {
  location.reload();
}

document.getElementById('submitbutton').addEventListener('click', getUserInput);
document.getElementById('submitbutton').addEventListener('click', scrollToBottom);
document.getElementById('submitbutton').addEventListener('click', hideList);