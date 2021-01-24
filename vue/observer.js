/**
 * Observer makes data bind to vm.$data become reactive
 */

class Observer {
  constructor(data) {
    this.observe(data);
  }

  observe(data) {
    if (data && typeof data === 'object') {
      Object.keys(data).forEach(key => {
        this.defineReactive(data, key, data[key]);
      });
    }
  }

  defineReactive(obj, key, value) {
    // recursively invoke observe function if we have nested object data
    this.observe(value);

    Object.defineProperty(obj, key, {
      get: () => {
        console.log('$data getter()', value);
        return value;
      },
      set: (newValue) => {
        console.log('$data getter()', key, newValue);
        if (value = newValue) {
          return;
        }

        this.observe(newValue);
        value = newValue;
      }
    });
  }
};

export default Observer;