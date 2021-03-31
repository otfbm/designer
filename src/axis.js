import { Container, filters, TextStyle, Text } from "pixi.js";

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

export default class Axis {
  constructor() {
    this.layer = new Container();
  }

  drawXAxis(settings, style) {
    const { cellsize, width } = settings;
    for (let i = 0; i < width; i++) {
      let character = String.fromCharCode((i % 26) + 65);
      if (i >= 26)
        character = String.fromCharCode(Math.floor(i / 26) + 64) + character;

      const text = new Text(character, style);
      text.anchor.set(0.5, 0.5);
      text.x = cellsize / 2 + cellsize * i;
      text.y = -24;
      this.layer.addChild(text);
    }
  }

  drawYAxis(settings, style) {
    const { cellsize, height } = settings;
    for (let i = 0; i < height; i++) {
      const text = new Text(String(i + 1), style);
      text.anchor.set(0.5, 0.5);
      text.x = -24;
      text.y = cellsize / 2 + cellsize * i;
      this.layer.addChild(text);
    }
  }

  draw(settings) {
    this.layer.removeChildren();

    const style = new TextStyle({
      fontFamily: "Arial",
      fontSize: fontSize(settings.cellsize),
      fill: "white",
      // stroke: "#ff3300",
      // strokeThickness: 4,
      // dropShadow: true,
      // dropShadowColor: "#000000",
      // dropShadowBlur: 4,
      // dropShadowAngle: Math.PI / 6,
      // dropShadowDistance: 6,
    });
    this.drawXAxis(settings, style);
    this.drawYAxis(settings, style);
  }
}
