/**
 * Main entry point of vue.js implementation
 */

import Compiler from './compiler.js';
import Observer from './observer.js';

class Vue {
  /**
   * Vue constructor
   */
  constructor(options) {
    this.$el      = options.el;
    this.$data    = options.data;
    this.$options = options.data;

    // Make data bind to vm.$data possess reactive feature
    new Observer(this.$data);
    // Handle template update logic, and bind data with UI template
    new Compiler(this.$el, this);

    this.proxyData(this.$data);
  }

  /**
   * Make vm.data become reactive
   */
  proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        get() {
          return data[key];
        },
        set(newVal) {
          data[key] = newVal;
        }
      });
    });
  }
}

export default Vue;