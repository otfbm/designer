import { Container } from "pixi.js";
import { line } from "./shapes.js";

export default class Grid {
  constructor() {
    this.layer = new Container();
  }

  draw(settings) {
    const { cellsize, gridTransparency, gridColor } = settings;
    const thickness = 1;
    this.layer.removeChildren();
    this.layer.addChild(
      line(
        { x: 0, y: 0 },
        { x: 0, y: settings.heightPx },
        thickness,
        gridTransparency,
        parseInt(gridColor, 16)
      )
    );
    this.layer.addChild(
      line(
        { x: 0, y: 0 },
        { x: settings.widthPx, y: 0 },
        thickness,
        gridTransparency,
        parseInt(gridColor, 16)
      )
    );
    this.layer.addChild(
      line(
        { x: settings.widthPx, y: 0 },
        { x: settings.widthPx, y: settings.heightPx },
        thickness,
        gridTransparency,
        parseInt(gridColor, 16)
      )
    );
    this.layer.addChild(
      line(
        { x: 0, y: settings.heightPx },
        { x: settings.widthPx, y: settings.heightPx },
        thickness,
        gridTransparency,
        parseInt(gridColor, 16)
      )
    );
    for (let x = 1; x < settings.width; x++) {
      this.layer.addChild(
        line(
          { x: x * cellsize, y: 0 },
          { x: x * cellsize, y: 0.5 + settings.heightPx },
          thickness,
          gridTransparency,
          parseInt(gridColor, 16)
        )
      );
    }
    let y = cellsize;
    for (let y = 1; y < settings.height; y++) {
      this.layer.addChild(
        line(
          { x: 0, y: y * cellsize },
          { x: 0.5 + settings.widthPx, y: y * cellsize },
          thickness,
          gridTransparency,
          parseInt(gridColor, 16)
        )
      );
    }
  }
}
