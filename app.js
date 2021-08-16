// Create DOM elements
class ElementMakerHTML {
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


  // Append the newly created HTML element to DOM tree

  appendElementToDOM() {
    this.parentElement.appendChild(this.ele);
  }
}

class DateMaker {
  constructor(days) {
    this.now = new Date();
    this.now.setDate(this.now.getDate() + days);
    this.now = this.now.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
  }
}

let user;

class Hours {
  constructor() {
    this.JS109 = { hours: [190, 149, 307, 113, 102, 165, 78] };
    this.JS129 = { hours: [115, 175, 85, 131, 63, 87, 95, 90] };
    this.JS139 = { hours: [55, 80, 155, 69, 60, 36, 50, 58] };
    this.LS171 = { hours: [30, 26, 30, 38, 17, 35, 37, 9] };
    this.JS175 = { hours: [30, 73, 90, 58, 24, 76, 35, 52] };
    this.LS181 = { hours: [83, 49, 48, 58, 25, 27, 51, 51] };
    this.JS185 = { hours: [8, 10, 15, 15, 7, 12, 10, 16] };
    this.LS202 = { hours: [78, 55, 160, 46, 92, 38] };
    this.LS216 = { hours: [75, 66, 60, 105, 52, 89, 77, 73] };
    this.JS239 = { hours: [212, 245, 91, 187, 187, 192, 172, 136] };
    this.getMaxOfCourse();
    this.getCoreAverage();
    this.getBackendAverage();
    this.getFrontendAverage();
    this.getMaxTotal();
    this.addCompletedCoursesQuestionsToDOM();
    this.addCourseListToDOM();
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
          } hours to complete and the max on record is ${this[prop].max}. It makes up about ${Math.round((this[prop].average / this.coreAverage) * 100)}% of core.`;

          let li = new ElementMakerHTML('li', text, 'courseListMoreDetails');
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

  computeMoreAccurate() {
    let computed = [];
    for (let prop in user) {
      if (prop.startsWith('JS') || prop.startsWith('LS')) {
        if (user[prop] > 0) {
          computed.push(user[prop] / launchSchoolHours[prop].average);
        }
      }
    }

    let length = computed.length;
    let accurateEstimatePercentage = computed.reduce((acc, num) => acc + num)
      / length;
    this.addYourComputedAvgEstimateToDOM(accurateEstimatePercentage);
  }

  addYourComputedAvgEstimateToDOM(comparedToAvgJS109) {
    console.log(this.coreAverage, comparedToAvgJS109, user.done);
    let hoursLeft = Math.round(this.coreAverage * comparedToAvgJS109)
    - user.done;
    let weeksLeft = Math.ceil(hoursLeft / user.hours);
    let date = new DateMaker(weeksLeft * 7);

    let yourAvgText = `Based on your input it will probably take you another ${hoursLeft
    } hours. At ${user.hours} hours per week it would take you around ${weeksLeft} weeks. This means that you would finish around ${date.now}.`;
    let yourAvgEle = new ElementMakerHTML('li', yourAvgText,'courseList');
    yourAvgEle.appendElementToDOM();
  }

  addCompletedCoursesQuestionsToDOM() {
    let text = `If you have finished any of the following courses, please input how many hours it took you to complete both the course and the exams. e.g. JS109 = JS101 + JS109. `;

    let li = new ElementMakerHTML('li', text, 'questions');
    li.appendElementToDOM();

    let text1 = `Leave any courses you have not yet finished empty. If you don't know your hours just click submit.`;

    let li1 = new ElementMakerHTML('li', text1, 'questions');
    li1.appendElementToDOM();

    let count = 0;
    for (let prop in this) {
      if (this[prop]) {
        if (this[prop].average) {
          let div = new ElementMakerHTML('div', '', 'questions', `hoursInputDiv${count}`, 'flexDiv');
          div.appendElementToDOM();
          let input = new ElementMakerHTML('input', '', `hoursInputDiv${count}`, `hoursInput${count}`, 'smallLiInput', `How many hours did it take you to finish ${prop}?`);
          input.appendElementToDOM();
          count += 1;
        }
      }
    }
  }
}

let launchSchoolHours = new Hours();

class UserInput {
  constructor(hoursPerWeek, done, JS109, JS129, JS139, LS171, JS175, LS181, JS185, LS202, LS216, JS239) {
    this.hours = hoursPerWeek;
    this.done = done;
    this.totalHoursLeftBasedOnAvg = launchSchoolHours.coreAverage - this.done;
    this.maxtotalHoursLeftBasedOnAvg = launchSchoolHours.coreMax - this.done;
    this.weeksLeftBasedOnAvg = Math.round((this.totalHoursLeftBasedOnAvg
      / this.hours));
    this.maxWeeksLeftBasedOnMaxRecord = Math.round((this.maxtotalHoursLeftBasedOnAvg
      / this.hours));
    this.JS109 = JS109;
    this.JS129 = JS129;
    this.JS139 = JS139;
    this.LS171 = LS171;
    this.JS175 = JS175;
    this.LS181 = LS181;
    this.JS185 = JS185;
    this.LS202 = LS202;
    this.LS216 = LS216;
    this.JS239 = JS239;
  }

  addYourAvgToDOM(date) {
    let yourAvgText = `Based on the average it will probably take you another ${
      this.totalHoursLeftBasedOnAvg} hours. At ${user.hours} hours per week it would take you around ${this.weeksLeftBasedOnAvg} weeks. This means that you would finish on ${date.now}`;
    let yourAvgEle = new ElementMakerHTML('li', yourAvgText,'courseList');
    yourAvgEle.appendElementToDOM();
  }

  addYourMaxEstimateToDOM(maxDate) {
    let yourMaxText = `Based on the maximum time on record it could take you another ${
      this.maxtotalHoursLeftBasedOnAvg} hours.  At ${user.hours} hours per week it would take you around ${this.maxWeeksLeftBasedOnMaxRecord} weeks. This means that you would finish on ${maxDate.now}`;
    let yourMaxEle = new ElementMakerHTML('li', yourMaxText,'courseList');
    yourMaxEle.appendElementToDOM();
  }
}

function getUserValue(input) {
  return Number(document.getElementById(input).value)
}

function getUserInput() {
  if (!validateHoursPerWeekInput('hoursperweek')) {
    let error = new ElementMakerHTML('li', 'Please insert a valid number.','line1', 'errormessage');
    error.appendElementToDOM();
    return false;
  } else if (!validateHoursPerWeekInput('hoursdone')) {
    let error = new ElementMakerHTML('li', 'Please insert a valid number.','line2', 'errormessage');
    error.appendElementToDOM();
    return false;
  } 

  let hoursPerWeek = getUserValue('hoursperweek')
  let done = getUserValue('hoursdone')
  let JS109 = getUserValue('hoursInput0')
  let JS129 = getUserValue('hoursInput1')
  let JS139 = getUserValue('hoursInput2')
  let LS171 = getUserValue('hoursInput3')
  let JS175 = getUserValue('hoursInput4')
  let LS181 = getUserValue('hoursInput5')
  let JS185 = getUserValue('hoursInput5')
  let LS202 = getUserValue('hoursInput6')
  let LS216 = getUserValue('hoursInput7')
  let JS239 = getUserValue('hoursInput8')

  user = new UserInput(hoursPerWeek, done, JS109, JS129, JS139, LS171,
    JS175, LS181, JS185, LS202, LS216, JS239);

  if (JS109 > 0) {
    launchSchoolHours.computeMoreAccurate();
  } else {
    let date = new DateMaker(user.weeksLeftBasedOnAvg * 7);
    user.addYourAvgToDOM(date);

    let maxDate = new DateMaker(user.maxWeeksLeftBasedOnMaxRecord * 7);
    user.addYourMaxEstimateToDOM(maxDate);
  }

  launchSchoolHours.addBackendAverageToDOM();
  launchSchoolHours.addFrontendAveragetoDom();
  launchSchoolHours.addAvgToDom();
  launchSchoolHours.addMaxToDom();
}

function validateHoursPerWeekInput(element) {
  let input = getUserValue(element);

  if (Number.isNaN(input) || input <= 0) {
    return false;
  }

  return true;
}

function resetButton() {
  let li = new ElementMakerHTML('div', '', 'resetButtonDiv', 'buttonDiv');
  li.appendElementToDOM();
  let reset = new ElementMakerHTML('div', 'Reset', 'buttonDiv', 'resetButton', 'submitbutton');
  reset.appendElementToDOM();
  eventListener('resetButton',reloadPage);
}

function reloadPage() {
  location.reload();
}

function changeDisplay(id,style) {
  document.getElementById(id).style.display = style;
}

function changeView() {
  if (getUserValue('hoursperweek') > 0 && getUserValue('hoursdone') > 0) {
    changeDisplay('initialDiv', 'none');
    changeDisplay('mainbody', 'grid');
    resetButton();
  }
}

function showDetails() {
  changeDisplay('moreDetails','grid');
}

function showInputField() {
  changeDisplay('questions','block');
  changeDisplay('submitInnerDiv','flex');
  changeDisplay('haveyoufinishedjs109', 'none');
}

function showSubmitButton() {
  changeDisplay('haveyoufinishedjs109', 'none')
  changeDisplay('submitInnerDiv','flex');
}

function hideDetailsButton() {
  changeDisplay('list', 'none');
}


function eventListener(id,callback) {
  document.getElementById(id).addEventListener('click',callback);
}

eventListener('moredetailsbutton',showDetails);
eventListener('yesfinished',showInputField);
eventListener('notfinished',showSubmitButton);
eventListener('notfinished',showSubmitButton);
eventListener('coursehourssubmitbutton',getUserInput);
eventListener('coursehourssubmitbutton',changeView);
eventListener('coursehourssubmitbutton',hideDetailsButton);