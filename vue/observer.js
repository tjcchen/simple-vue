/**
 * Observer makes data bind to vm.$data become reactive
 */

import Dependency from "./dependency.js";

class Observer {
  /**
   * Observer constructor
   */
  constructor(data) {
    this.observe(data);
  }

  /**
   * Observe data mutation
   */
  observe(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }

  /**
   * Define reactive data with Object.defineProperty()
   */
  defineReactive(obj, key, value) {
    this.observe(value); // recursively invoke observe() if we have nested object data

    const dependency = new Dependency();

    Object.defineProperty(obj, key, {
      get: () => {
        console.log('$data getter()', value);
        const watcher = Dependency.watcher;
        watcher && dependency.addWatcher(watcher);

        return value;
      },
      set: (newValue) => {
        console.log('$data setter()', value, newValue);
        if (value === newValue) {
          return;
        }

        this.observe(newValue);
        value = newValue;

        dependency.notify();
      }
    });
  }
};

export default Observer;