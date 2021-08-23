import ElementMakerHTML from './elementMaker.mjs';
import { user, launchSchoolHours, DateMaker } from './app.mjs';

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
    this.getBackendAverage();
    this.getFrontendAverage();
    this.getCoreAverage();
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
      if (this[prop]?.max) {
        max += this[prop].max;
      }
    }

    this.coreMax = max;
  }

  getCoreAverage() {
    this.coreAverage = this.backendAverage + this.frontendAverage;
  }

  getBackendAverage() {
    this.backendAverage = this._getAvg('JS');
  }

  addBackendAverageToDOM() {
    this._addAvgToDOM('backend', this.backendAverage);
  }

  getFrontendAverage() {
    this.frontendAverage = this._getAvg('LS');
  }

  addFrontendAveragetoDom() {
    this._addAvgToDOM('frontend', this.frontendAverage);
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

  addCoreAvgToDom() {
    this._addAvgToDOM('', this.coreAverage)
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

  computerPercentage() {
    let percentage = 0;
    console.log(user);
    for (let prop in user) {
      if (prop.startsWith('JS') || prop.startsWith('LS')) {
        if (user[prop] > 0) {
          percentage += (this[prop].average / this.coreAverage) * 100;
        }
      }
    }

    this.addYourComputedPercentageToDOM(Math.round(percentage));
  }

  addYourComputedPercentageToDOM(percentage) {
    let yourAvgText = `Based on your input you have completed roughly ${percentage}% of the Core curriculum.`;
    let yourAvgEle = new ElementMakerHTML('li', yourAvgText,'courseList');
    yourAvgEle.appendElementToDOM();
  }

  addYourComputedAvgEstimateToDOM(comparedToAvgJS109) {
    let hoursLeft = Math.round(this.coreAverage * comparedToAvgJS109)
    - user.done;
    let weeksLeft = Math.ceil(hoursLeft / user.hours);
    let date = new DateMaker(weeksLeft * 7);

    let yourAvgText = `Based on your input it will probably take you another ${hoursLeft
    } hours to finish Core. At ${user.hours} hours per week it would take you around ${weeksLeft} weeks. This means that you would finish around ${date.now}.`;
    let yourAvgEle = new ElementMakerHTML('li', yourAvgText,'courseList');
    yourAvgEle.appendElementToDOM();
  }

  computeMoreAccurateBackend() {
    let arr = ['JS109','JS129','JS139','LS171','JS175','LS181','JS185']
    if (user?.JS185) return false;
  
    let computed = [];
    let coursesLeft = [];

    for (let prop in user) {
      if (arr.includes(prop)) {
        if (user[prop] > 0) {
          computed.push(user[prop] / launchSchoolHours[prop].average);
        } else {
          coursesLeft.push(prop)
        }
      }
    }

    let length = computed.length;
    let accurateEstimateBackend = computed.reduce((acc, num) => acc + num)
      / length;
    let hoursLeft = 0;

    for (let prop in user) {
      if (coursesLeft.includes(prop)) {
        hoursLeft += (launchSchoolHours[prop].average * accurateEstimateBackend);
      }
    }

    this.addYourComputedAvgBackendEstimateToDOM(Math.round(hoursLeft));
  }

  addYourComputedAvgBackendEstimateToDOM(hoursLeft) {
    let weeksLeft = Math.ceil(hoursLeft / user.hours);
    let date = new DateMaker(weeksLeft * 7);

    let yourAvgText = `Based on your input it will probably take you another ${hoursLeft
    } hours to finish the Backend course. At ${user.hours} hours per week it would take you around ${weeksLeft} weeks. This means that you would finish Backend around ${date.now}.`;
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

  _getAvg(coursePrefix) {
    let average = 0;
    for (let prop in this) {
      if (this[prop] && prop.startsWith(coursePrefix)) {
        this[prop].average = Math.round(this[prop].hours
          .reduce((acc, num) => acc + num) / this[prop].hours.length);
        average += this[prop].average;
      }
    }

    return average;
  }

  _addAvgToDOM(partOfCore, average) {
    let avgText = `The average time to finish the JavaScript ${partOfCore} track is: ${
      average} hours.`;
    let li = new ElementMakerHTML('li', avgText, 'courseList');
    li.appendElementToDOM();
  }
}

export default Hours;