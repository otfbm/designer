export default class Background {
  constructor() {
    this.src = "";
  }

  set({ src } = {}) {
    if (!src) {
      // clear background
      this.src = null;
      return true;
    }
    if (src !== this.src) {
      // background changed
      this.src = src;
      return true;
    }
    return false;
  }
}
