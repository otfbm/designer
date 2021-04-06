export default class Background {
  constructor(data = {}) {
    this.id = data.id || null;
    this.src = data.src || "";
    this.userId = data.userId || null;
    this.custom = data.custom || false;
  }
}
