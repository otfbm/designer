export default class Token {
  constructor(data = {}) {
    this.id = data.id || null;
    this.boardId = data.boardId || null;
    this.src = data.src || "";
    this.size = data.size || 1;
    this.rotation = data.rotation || 0;
    this.x = data.x || null;
    this.y = data.y || null;
    this.label = data.label || "";
  }

  height(cellsize) {
    return this.size * cellsize;
  }

  width(cellsize) {
    return this.size * cellsize;
  }

  center(cellsize) {
    const xy = (this.size * cellsize) / 2;
    return [x, y];
  }
}
