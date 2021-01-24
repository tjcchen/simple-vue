/**
 * Main entry point of vue.js implementation
 */

import Observer from './observer.js';

class Vue {
  constructor(options) {
    this.$el      = options.el;
    this.$data    = options.data;
    this.$options = options.data;

    // Makes data bind to vm.$data become reactive
    new Observer(this.$data);

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