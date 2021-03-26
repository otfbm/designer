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
}
