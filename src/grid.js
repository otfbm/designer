import { Container } from "pixi.js";
import { line, rectangle } from "./shapes.js";

export default class Grid {
  constructor(viewport) {
    this.layer = new Container();
    this.borders = new Container();
    this.gridLines = new Container();
    this.editingEnabled = false;

    this.layer.addChild(this.gridLines);
    this.layer.addChild(this.borders);

    viewport.on("mousedown", this.handleDragStart.bind(this));
    viewport.on("touchstart", this.handleDragStart.bind(this));

    viewport.on("mousemove", this.handleDrag.bind(this));
    viewport.on("touchmove", this.handleDrag.bind(this));

    viewport.on("mouseup", this.handleDragEnd.bind(this));
    viewport.on("touchend", this.handleDragEnd.bind(this));
  }

  handleDragStart(e) {
    if (this.editingEnabled) {
      if (e.target && e.target.type === "rightBorder") {
        this.dragRight = true;
        this.layer.parent.pause = true;
      }
      if (e.target && e.target.type === "bottomBorder") {
        this.dragBottom = true;
        this.layer.parent.pause = true;
      }
    }
  }

  handleDrag(e) {
    if (this.dragBottom || this.dragRight) {
      const position = e.data.getLocalPosition(this.layer.parent);

      if (this.dragBottom) {
        const height = Math.round(position.y / this.settings.cellsize);
        this.settings.height = height;
      }

      if (this.dragRight) {
        const width = Math.round(position.x / this.settings.cellsize);
        this.settings.width = width;
      }

      this.drawBorder(this.settings, true);
      this.drawInternalGrid(this.settings);
    }
  }

  handleDragEnd(e) {
    this.dragRight = false;
    this.dragBottom = false;
    this.layer.parent.pause = false;
  }

  enableEditing(settings, state) {
    this.editingEnabled = state;
    if (this.editingEnabled) {
      document.querySelector("body").style.cursor = "nesw-resize";
    } else {
      document.querySelector("body").style.cursor = "default";
    }
    this.settings = settings;
    this.drawBorder(settings, this.editingEnabled);
  }

  drawInternalGrid(settings) {
    this.gridLines.removeChildren();
    const { cellsize, gridTransparency, gridColor } = settings;
    const thickness = 1;

    for (let x = 1; x < settings.width; x++) {
      const l = line(
        { x: 0, y: 0 },
        { x: 0, y: 0.5 + settings.heightPx },
        thickness,
        gridTransparency,
        parseInt(gridColor, 16)
      );
      l.x = x * cellsize;
      this.gridLines.addChild(l);
    }
    let y = cellsize;
    for (let y = 1; y < settings.height; y++) {
      const l = line(
        { x: 0, y: 0 },
        { x: 0.5 + settings.widthPx, y: 0 },
        thickness,
        gridTransparency,
        parseInt(gridColor, 16)
      );
      l.y = y * cellsize;
      this.gridLines.addChild(l);
    }
  }

  drawBorder(settings, handles = false) {
    this.borders.removeChildren();
    const { gridTransparency, gridColor } = settings;
    const thickness = 1;

    const leftBorder = line(
      { x: 0, y: 0 },
      { x: 0, y: settings.heightPx },
      thickness,
      gridTransparency,
      parseInt(gridColor, 16)
    );
    leftBorder.type = "leftBorder";
    this.borders.addChild(leftBorder);

    const topBorder = line(
      { x: 0, y: 0 },
      { x: settings.widthPx, y: 0 },
      thickness,
      gridTransparency,
      parseInt(gridColor, 16)
    );
    topBorder.type = "topBorder";
    this.borders.addChild(topBorder);

    this.rightBorder = line(
      { x: 0, y: 0 },
      { x: 0, y: settings.heightPx },
      thickness,
      gridTransparency,
      parseInt(gridColor, 16)
    );
    this.rightBorder.x = settings.widthPx;
    this.rightBorder.type = "rightBorder";
    this.borders.addChild(this.rightBorder);

    this.bottomBorder = line(
      { x: 0, y: 0 },
      { x: settings.widthPx, y: 0 },
      thickness,
      gridTransparency,
      parseInt(gridColor, 16)
    );
    this.bottomBorder.y = settings.heightPx;
    this.bottomBorder.type = "bottomBorder";
    this.borders.addChild(this.bottomBorder);

    if (handles) {
      this.rightBorder.interactive = true;
      this.bottomBorder.interactive = true;
      const rightHandle = rectangle({ x: 1, y: 1 }, { x: 4, y: 10 }, thickness);
      const bottomHandle = rectangle(
        { x: 1, y: 1 },
        { x: 10, y: 4 },
        thickness
      );

      rightHandle.interactive = true;
      rightHandle.type = "rightBorder";
      rightHandle.x = settings.widthPx - 3;
      rightHandle.y = settings.heightPx / 2 - 6;
      this.rightHandle = rightHandle;

      bottomHandle.interactive = true;
      bottomHandle.type = "bottomBorder";
      bottomHandle.x = settings.widthPx / 2 - 6;
      bottomHandle.y = settings.heightPx - 3;
      this.bottomHandle = bottomHandle;

      this.borders.addChild(rightHandle);
      this.borders.addChild(bottomHandle);
    }
  }

  draw(settings) {
    this.settings = settings;
    this.drawInternalGrid(settings);
    this.drawBorder(settings, this.editingEnabled);
  }
}
