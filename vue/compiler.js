/**
 * Compiler handles template update logic, and bind data with UI template
 */

import utils from './utils.js';

class Compiler {
  /**
   * Compiler constructor
   */
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;

    const fragment = this.compileFragment(this.el);
    this.compile(fragment);

    this.el.appendChild(fragment);
  }

  /**
   * Transform #app and child elements to document fragment
   */
  compileFragment(el) {
    const fragment = document.createDocumentFragment();
    let firstChild;

    // Recursively append child elements to fragment
    // Note: fragment.appendChild() will automatically delete current node after appending
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild);
    }
    return fragment;
  }

  compile(fragment) {
    // Convert array-like element nodes to array, so that we can in Array forEach function
    const childNodes = Array.from(fragment.childNodes); 

    // Deal with v- attributes and mustache synxtax respectively
    childNodes.forEach(childNode => {
      if (this.isElementNode(childNode)) {
        this.compileElement(childNode);
      } else if (this.isTextNode(childNode)) {
        this.compileText(childNode);
      }

      // DFS(Depth First Search) algorithm
      if (childNode.childNodes && childNode.childNodes.length > 0) {
        this.compile(childNode);
      }
    });
  }

  /**
   * Handle directive relevant logic, like: v-model v-text v-on:click="handler" @click="handler"
   */
  compileElement(node) {
    const attributes = Array.from(node.attributes);

    attributes.forEach(attr => {
      const { name, value } = attr; // v-model="message", name=v-model, value=message

      if (this.isDirective(name)) { // v-model, v-text, v-bind, v-on:click
        const [, directive] = name.split('-');
        const [compileKey, eventName] = directive.split(':');
        
        // [IMPORTANT]: handle different directives logic with utils
        utils[compileKey](node, value, this.vm, eventName);
      } else if (this.isEventName(name)) { // @click="handler"
        const [, eventName] = name.split('@');
        utils['on'](node, value, this.vm, eventName);
      }
    });
  }

  /**
   * Handle mustache( {{ xxx }} ) syntax and v-text logic
   */
  compileText(node) {
    const content = node.textContent;
    const regExp  = /\{\{(.+)\}\}/;

    if (regExp.test(content)) {
      utils['text'](node, content, this.vm); // Allow utils v-text logic handle mustache( {{ xxx }} ) syntax too
    }
  }

  /**
   * Check truthy of @ prefix event, like @click
   */
  isEventName(name) {
    return name.startsWith('@');
  }

  /**
   * Check truthy of directive
   */
  isDirective(name) {
    return name.startsWith('v-');
  }

  /**
   * A dom element has `nodeType` property and its corresponding value equals to 1
   */
  isElementNode(el) {
    return el.nodeType === 1;
  }

  /**
   * A text node returns nodeType 3
   */
  isTextNode(el) {
    return el.nodeType === 3;
  }
}

export default Compiler;