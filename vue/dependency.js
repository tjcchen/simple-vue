/**
 * 
 */

class Dependency {
  constructor() {
    this.watchers = [];
  }

  addWatcher(watcher) {
    this.watchers.push(watcher);
  }

  notify() {
    this.watchers.forEach(w => w.update());
  }
}

export default Dependency;