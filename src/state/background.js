export default class Background {
  constructor() {
    this.src = "";
  }

  set(opts = {}) {
    if (!opts || !opts.src) {
      // clear background
      this.src = null;
      return true;
    }
    if (opts && opts.src && opts.src !== this.src) {
      // background changed
      this.src = opts.src;
      return true;
    }
    return false;
  }
}
