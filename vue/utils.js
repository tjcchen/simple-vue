/**
 * A utility tool for handling different directives logic
 */

import Watcher from "./watcher.js";

const utils = {
  model(node, expression, vm) {
    const initValue = this.getValue(expression, vm);

    new Watcher(expression, vm, (newValue) => {
      this.modelUpdate(node, newValue);
    });

    node.addEventListener('input', (e) => {
      const newValue = e.target.value;
      this.setValue(expression, vm, newValue);
    });

    this.modelUpdate(node, initValue);
  },
  text(node, value, vm) {
    let result, regExp = /\{\{(.+)\}\}/g;

    if (value.includes('{{')) { // {{ message }}
      result = value.replace(regExp, (...args) => {
        const expression = args[1];
  
        new Watcher(expression, vm, (newValue) => {
          this.textUpdate(node, newValue);
        });

        return this.getValue(expression, vm);
      });
    } else { // v-text="message"
      result = this.getValue(value, vm);
    }

    this.textUpdate(node, result);
  },
  textUpdate(node, value) {
    node.textContent = value;
  },
  modelUpdate(node, value) {
    node.value = value;
  },
  getValue(expression, vm) {
    return vm.$data[expression.trim()];
  },
  setValue(expression, vm, newValue) {
    vm.$data[expression] = newValue;
  }
};

export default utils;