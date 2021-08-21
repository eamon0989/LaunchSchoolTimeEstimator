import { launchSchoolHours, user } from "./app.mjs";
import ElementMakerHTML from './elementMaker.mjs';

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

export default UserInput;