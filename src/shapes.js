import { Graphics } from "pixi.js";

export const line = (from, to, thickness = 1, alpha = 1, color = 0xffffff) => {
  let line = new Graphics();
  line.lineStyle(thickness, color, alpha);
  line.moveTo(from.x, from.y);
  line.lineTo(to.x, to.y);
  return line;
};

export const rectangle = (
  topLeft,
  bottomRight,
  thickness = 1,
  alpha = 1,
  color = 0xffffff
) => {
  let rect = new Graphics();
  rect.lineStyle(thickness, color, alpha);
  rect.beginFill(color);
  rect.drawRect(topLeft.x, topLeft.y, bottomRight.x, bottomRight.y);
  rect.endFill();
  return rect;
};
