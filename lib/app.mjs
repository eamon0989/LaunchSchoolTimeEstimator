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
  if (!validate('hoursperweek','line1') || !validate('hoursdone','line2')) return false

  let arr = ['JS109','JS129','JS139','LS171','JS175','LS181','JS185','LS202','LS216','JS239']
  let idObj = {
    'hoursPerWeek':getUserValue('hoursperweek'),
    'done': getUserValue('hoursdone')
  }

  arr.forEach((elem,index) => {
    idObj[elem] = getUserValue(`hoursInput${index}`)
  })

  computeNumbers(idObj)
}

function computeNumbers(idObj) {
  user = new UserInput(idObj);

  if (idObj.JS109 > 0) {
    launchSchoolHours.computeMoreAccurate();
    launchSchoolHours.computeMoreAccurateBackend();
    launchSchoolHours.computerPercentage();
  } else {
    let date = new DateMaker(user.weeksLeftBasedOnAvg * 7);
    user.addYourAvgToDOM(date);

    let maxDate = new DateMaker(user.maxWeeksLeftBasedOnMaxRecord * 7);
    user.addYourMaxEstimateToDOM(maxDate);
  }

  launchSchoolHours.addBackendAverageToDOM();
  launchSchoolHours.addFrontendAveragetoDom();
  launchSchoolHours.addCoreAvgToDom();
  launchSchoolHours.addMaxToDom();
}

function validate(id,line) {
  if (!validateUserInput(id)) {
    let error = new ElementMakerHTML('li', 'Please insert a valid number.',line, 'errormessage');
    error.appendElementToDOM();
    return false;
  } 
  return true;
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

listenFor.click('moredetailsbutton', showDetails, hideDetailsButton)
listenFor.pressEnter('moredetailsbutton', showDetails, hideDetailsButton);
listenFor.click('yesfinished', showInputField);
listenFor.click('notfinished', showSubmitButton);
listenFor.pressEnter('initialform', showInputField);
listenFor.click('coursehourssubmitbutton', getUserInput, changeView);
listenFor.pressEnter('questions', getUserInput, changeView);