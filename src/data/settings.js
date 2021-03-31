export default class Settings {
  constructor(data = {}) {
    this.id = data.id;
    this.name = data.name;
    this.width = data.width;
    this.height = data.height;
    this.cellsize = data.cellsize;
    this.resolution = data.resolution;
    this.backgroundColor = data.backgroundColor;
    this.gridTransparency = data.gridTransparency;
    this.gridColor = data.gridColor;
    this.backgroundOffsetX = data.backgroundOffsetX;
    this.backgroundOffsetY = data.backgroundOffsetY;
  }
}
