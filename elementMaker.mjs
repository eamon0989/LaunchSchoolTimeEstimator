// Create DOM elements
class ElementMakerHTML {
  constructor(elementType, text, parentElement, id, className, placeholder) {
    this.ele = document.createElement(elementType);
    this.parentElement = document.getElementById(parentElement);
    this.text = document.createTextNode(text);
    this.id = id;
    this.className = className;
    this.placeholder = placeholder;
  }

  setId() {
    if (this.id) {
      this.ele.id = this.id;
    }
  }
  setText() {
    if(this.text) {
      this.ele.appendChild(this.text);
    }
  }

  setClassName() {
    if (this.className) {
      this.ele.className = this.className;
    }
  }
  setPlaceholder() {
    if (this.placeholder) {
      this.ele.placeholder = this.placeholder;
    }
  }

  // Append the newly created HTML element to DOM tree
  settingAttributes() {
    this.setId()
    this.setClassName();
    this.setPlaceholder();
  }

  appendElementToDOM() {
    this.settingAttributes();
    this.setText();
    this.parentElement.appendChild(this.ele);
  }
}

export default ElementMakerHTML;