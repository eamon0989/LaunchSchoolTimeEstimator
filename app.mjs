"use strict";
import ElementMakerHTML from './elementMaker.mjs';
import Hours from './hoursClass.mjs';
import UserInput from './userInput.mjs';

export class DateMaker {
  constructor(days) {
    this.now = new Date();
    this.now.setDate(this.now.getDate() + days);
    this.now = this.now.toLocaleDateString('en-US', {
      weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
    });
  }
}

export let user;
export let launchSchoolHours = new Hours();

function getUserValue(input) {
  return Number(document.getElementById(input).value);
}

function getUserInput() {
  if (!validateUserInput('hoursperweek')) {
    let error = new ElementMakerHTML('li', 'Please insert a valid number.','line1', 'errormessage');
    error.appendElementToDOM();
    return false;
  } else if (!validateUserInput('hoursdone')) {
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

function validateUserInput(element) {
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
  listenFor.click('resetButton', reloadPage);
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
  changeDisplay('haveyoufinishedjs109', 'none');
  changeDisplay('submitInnerDiv','flex');
}

function hideDetailsButton() {
  changeDisplay('list', 'none');
}

class Listener {
  click(id, ...callbacks) {
    let element = document.getElementById(id);
    element.addEventListener('click', () => {
      callbacks.forEach(callback => callback());
    });
  }

  pressEnter(id, ...callbacks) {
    let element = document.getElementById(id);

    const checkKeyType = (event) => {
      if (event.code === 'Enter') {
        callbacks.forEach(callback => callback());
      };
    };
    

    element.addEventListener('keyup', checkKeyType);
  }
}

const listenFor = new Listener();

listenFor.click('moredetailsbutton', showDetails)
listenFor.pressEnter('moredetailsbutton', showDetails);
listenFor.click('yesfinished', showInputField);
listenFor.click('notfinished', showSubmitButton);
listenFor.pressEnter('initialform', showInputField);
listenFor.click('coursehourssubmitbutton', getUserInput, changeView, hideDetailsButton);
listenFor.pressEnter('questions', getUserInput, changeView, hideDetailsButton);

// export default launchSchoolHours;
// export default user;