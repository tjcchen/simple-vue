/**
 * Main entry point of vue implementation
 */

class Vue {
  constructor(options) {
    this.$el      = options.el;
    this.$data    = options.data;
    this.$options = options.data;

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