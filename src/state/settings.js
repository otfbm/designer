const defaults = {
  NAME: "",
  WIDTH: Math.floor(window.innerWidth / 50),
  HEIGHT: Math.floor(window.innerHeight / 50),
  CELLSIZE: 50,
  RESOLUTION: 1,
  BACKGROUND_COLOR: "8f8f8f",
  GRID_TRANSPARENCY: 1,
  GRID_COLOR: "ffffff",
  BACKGROUND_OFFSET_X: 0,
  BACKGROUND_OFFSET_Y: 0,
};

export default class Settings {
  constructor(boardId) {
    this.boardId = boardId;
  }

  get widthPx() {
    return parseInt(this.width * this.cellsize, 10);
  }

  get heightPx() {
    return parseInt(this.height * this.cellsize, 10);
  }

  set(values = null) {
    if (values == null) {
      this.name = defaults.NAME;
      this.width = defaults.WIDTH;
      this.height = defaults.HEIGHT;
      this.cellsize = defaults.CELLSIZE;
      this.resolution = defaults.RESOLUTION;
      this.backgroundColor = defaults.BACKGROUND_COLOR;
      this.gridTransparency = defaults.GRID_TRANSPARENCY;
      this.gridColor = defaults.GRID_COLOR;
      this.backgroundOffsetX = defaults.BACKGROUND_OFFSET_X;
      this.backgroundOffsetY = defaults.BACKGROUND_OFFSET_Y;
      return true;
    }

    let changes = false;
    const {
      name,
      width,
      height,
      cellsize,
      resolution,
      backgroundColor,
      gridTransparency,
      gridColor,
      backgroundOffsetX,
      backgroundOffsetY,
    } = values;

    if (name && name !== this.name) {
      this.name = name;
      changes = true;
    }

    if (width && width !== this.width) {
      this.width = parseInt(width, 10);
      changes = true;
    }

    if (height && height !== this.height) {
      this.height = parseInt(height, 10);
      changes = true;
    }

    if (cellsize && cellsize !== this.cellsize) {
      this.cellsize = parseInt(cellsize, 10);
      changes = true;
    }

    if (resolution && resolution !== this.resolution) {
      this.resolution = parseInt(resolution, 10);
      changes = true;
    }

    if (backgroundColor && backgroundColor !== this.backgroundColor) {
      this.backgroundColor = backgroundColor;
      changes = true;
    }

    if (gridTransparency && gridTransparency !== this.gridTransparency) {
      this.gridTransparency = parseFloat(gridTransparency);
      changes = true;
    }

    if (gridColor && gridColor !== this.gridColor) {
      this.gridColor = gridColor;
      changes = true;
    }

    if (
      typeof backgroundOffsetY === "number" &&
      backgroundOffsetX !== this.backgroundOffsetX
    ) {
      this.backgroundOffsetX = backgroundOffsetX;
      changes = true;
    }

    if (
      typeof backgroundOffsetY === "number" &&
      backgroundOffsetY !== this.backgroundOffsetY
    ) {
      this.backgroundOffsetY = backgroundOffsetY;
      changes = true;
    }

    return changes;
  }
}
