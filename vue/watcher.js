/**
 * 
 */

import Dependency from './dependency.js'
import utils from './utils.js';

class Watcher {
  constructor(expression, vm, callback) {
    this.expression = expression;
    this.vm = vm;
    this.callback = callback;
    this.oldValue = this.getOldValue();
  }

  getOldValue() {
    // Assign watcher to Dependency for global invocation
    Dependency.watcher = this;

    const oldValue = utils.getValue(this.expression, this.vm);

    // Clear current Dependency watcher
    Dependency.watcher = null;
    return oldValue;
  }

  update() {
    const newValue = utils.getValue(this.expression, this.vm);

    if (newValue !== this.oldValue) {
      this.callback(newValue);
    }
  }
}

export default Watcher;