import { Container, TextStyle, Text } from "pixi.js";
import { line, rectangle } from "./shapes.js";

const fontSize = (cellsize) => {
  if (cellsize <= 30) return 8;
  if (cellsize <= 40) return 10;
  if (cellsize <= 50) return 12;
  if (cellsize <= 60) return 14;
  if (cellsize <= 70) return 16;
  if (cellsize <= 80) return 18;
  if (cellsize <= 90) return 20;
  if (cellsize <= 100) return 22;
  if (cellsize > 100) return 24;
};

export default class Grid {
  constructor(viewport, state) {
    this.state = state;
    this.layer = new Container();
    this.borders = new Container();
    this.gridLines = new Container();
    this.axis = new Container();
    this.editingEnabled = false;
    this.width = null;
    this.height = null;

    this.layer.addChild(this.gridLines);
    this.layer.addChild(this.borders);
    this.layer.addChild(this.axis);

    viewport.on("mousedown", this.handleDragStart.bind(this));
    viewport.on("touchstart", this.handleDragStart.bind(this));

    viewport.on("mousemove", this.handleDrag.bind(this));
    viewport.on("touchmove", this.handleDrag.bind(this));

    viewport.on("mouseup", this.handleDragEnd.bind(this));
    viewport.on("touchend", this.handleDragEnd.bind(this));
  }

  drawXAxis({ cellsize, width }, style) {
    for (let i = 0; i < width; i++) {
      let character = String.fromCharCode((i % 26) + 65);
      if (i >= 26)
        character = String.fromCharCode(Math.floor(i / 26) + 64) + character;

      const text = new Text(character, style);
      text.anchor.set(0.5, 0.5);
      text.x = cellsize / 2 + cellsize * i;
      text.y = -24;
      this.axis.addChild(text);
    }
  }

  drawYAxis({ cellsize, height }, style) {
    for (let i = 0; i < height; i++) {
      const text = new Text(String(i + 1), style);
      text.anchor.set(0.5, 0.5);
      text.x = -24;
      text.y = cellsize / 2 + cellsize * i;
      this.axis.addChild(text);
    }
  }

  drawAxis({ cellsize, height, width }) {
    this.axis.removeChildren();

    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: fontSize(cellsize),
      fill: "white",
      // stroke: "#ff3300",
      // strokeThickness: 4,
      // dropShadow: true,
      // dropShadowColor: "#000000",
      // dropShadowBlur: 4,
      // dropShadowAngle: Math.PI / 6,
      // dropShadowDistance: 6,
    });
    this.drawXAxis({ cellsize, width }, style);
    this.drawYAxis({ cellsize, height }, style);
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
      const params = {
        ...this.state.settings,
      };

      if (this.dragBottom) {
        this.height = Math.round(position.y / this.state.settings.cellsize);
        params.height = this.height;
      }

      if (this.dragRight) {
        this.width = Math.round(position.x / this.state.settings.cellsize);
        params.width = this.width;
      }

      this.drawBorder({ ...params, handles: true });
      this.drawInternalGrid(params);
      this.drawAxis(params);
    }
  }

  handleDragEnd() {
    const settings = {};
    if (this.width) settings.width = this.width;
    if (this.height) settings.height = this.height;
    this.state.settings = settings;

    this.width = null;
    this.height = null;

    this.dragRight = false;
    this.dragBottom = false;
    this.layer.parent.pause = false;
  }

  enableEditing(editingState) {
    if (editingState) {
      document.querySelector("body").style.cursor = "nesw-resize";
    } else {
      document.querySelector("body").style.cursor = "default";
    }
    this.editingEnabled = editingState;
    this.drawBorder({ ...this.state.settings, handles: editingState });
  }

  drawInternalGrid({ cellsize, width, height, gridTransparency, gridColor }) {
    this.gridLines.removeChildren();
    const thickness = 1;

    for (let x = 1; x < width; x++) {
      const l = line(
        { x: 0, y: 0 },
        { x: 0, y: 0.5 + height * cellsize },
        thickness,
        gridTransparency,
        parseInt(gridColor, 16)
      );
      l.x = x * cellsize;
      this.gridLines.addChild(l);
    }
    let y = cellsize;
    for (let y = 1; y < height; y++) {
      const l = line(
        { x: 0, y: 0 },
        { x: 0.5 + width * cellsize, y: 0 },
        thickness,
        gridTransparency,
        parseInt(gridColor, 16)
      );
      l.y = y * cellsize;
      this.gridLines.addChild(l);
    }
  }

  drawBorder({
    cellsize,
    height,
    width,
    gridTransparency,
    gridColor,
    handles = false,
  }) {
    this.borders.removeChildren();
    const thickness = 1;

    const leftBorder = line(
      { x: 0, y: 0 },
      { x: 0, y: height * cellsize },
      thickness,
      gridTransparency,
      parseInt(gridColor, 16)
    );
    leftBorder.type = "leftBorder";
    this.borders.addChild(leftBorder);

    const topBorder = line(
      { x: 0, y: 0 },
      { x: width * cellsize, y: 0 },
      thickness,
      gridTransparency,
      parseInt(gridColor, 16)
    );
    topBorder.type = "topBorder";
    this.borders.addChild(topBorder);

    this.rightBorder = line(
      { x: 0, y: 0 },
      { x: 0, y: height * cellsize },
      thickness,
      gridTransparency,
      parseInt(gridColor, 16)
    );
    this.rightBorder.x = width * cellsize;
    this.rightBorder.type = "rightBorder";
    this.borders.addChild(this.rightBorder);

    this.bottomBorder = line(
      { x: 0, y: 0 },
      { x: width * cellsize, y: 0 },
      thickness,
      gridTransparency,
      parseInt(gridColor, 16)
    );
    this.bottomBorder.y = height * cellsize;
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
      rightHandle.x = width * cellsize - 3;
      rightHandle.y = (height * cellsize) / 2 - 6;
      this.rightHandle = rightHandle;

      bottomHandle.interactive = true;
      bottomHandle.type = "bottomBorder";
      bottomHandle.x = (width * cellsize) / 2 - 6;
      bottomHandle.y = height * cellsize - 3;
      this.bottomHandle = bottomHandle;

      this.borders.addChild(rightHandle);
      this.borders.addChild(bottomHandle);
    }
  }

  draw(settings) {
    this.drawInternalGrid(settings);
    this.drawBorder({ ...settings, handles: this.editingEnabled });
    this.drawAxis(settings);
  }
}
