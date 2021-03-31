import { Sprite, Container } from "pixi.js";

export default class Background {
  constructor(assets) {
    this.assets = assets;
    this.layer = new Container();
  }

  setImage(src) {
    this.src = src;
    this.layer.removeChild(this.sprite);
    if (src) {
      this.sprite = new Sprite(this.assets.resources[src].texture);
      this.layer.addChild(this.sprite);
    }
  }

  setOffset(x = 0, y = 0) {
    if (x) {
      this.layer.x = x;
    }

    if (y) {
      this.layer.y = y;
    }
  }
}
