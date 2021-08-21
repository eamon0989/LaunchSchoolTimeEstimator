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

export default ElementMakerHTML;