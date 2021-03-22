import { Sprite, Container, filters } from "pixi.js";
import EventEmitter from "eventemitter3";

const _settings = Symbol("settings");
const _colorFilter = Symbol("colorFilter");
const _layer = Symbol("layer");
const _sprite = Symbol("sprite");
const _events = Symbol("events");

export default class Token {
  constructor(settings, assets, { x, y, src, id }) {
    const {
      loader: { resources },
    } = assets;
    const xy = (i) => i * settings.cellsize - settings.cellsize;
    this.xy = xy;

    this.x = x;
    this.y = y;
    this.src = src;
    this.id = id;

    this[_settings] = settings;
    this[_layer] = new Container();
    this[_layer].interactive = true;

    this[_colorFilter] = new filters.ColorMatrixFilter();
    this[_layer].filters = [this[_colorFilter]];
    this[_colorFilter].enabled = false;
    this[_colorFilter].hue(45);

    const sprite = new Sprite(resources[src].texture);
    sprite.width = settings.cellsize;
    sprite.height = settings.cellsize;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    this[_sprite] = sprite;

    this[_events] = new EventEmitter();

    this.move(x, y);

    this.setupDragAndDrop();

    this[_layer].addChild(sprite);
  }

  update(settings) {
    this[_sprite].width = settings.cellsize;
    this[_sprite].height = settings.cellsize;
  }

  setupDragAndDrop() {
    const settings = this[_settings];
    let drag = false;
    this.layer.on("mousedown", () => {
      drag = true;
      this.layer.parent.parent.pause = true;
    });
    this.layer.on("mouseup", (e) => {
      const pos = e.data.getLocalPosition(this.layer.parent);
      const closestCellX = Math.ceil(pos.x / settings.cellsize);
      const closestCellY = Math.ceil(pos.y / settings.cellsize);
      this[_events].emit("move", { x: closestCellX, y: closestCellY });
      drag = false;
      this.layer.parent.parent.pause = false;
    });
    this.layer.on("mousemove", (e) => {
      if (drag) {
        this.layer.position.x = e.data.getLocalPosition(this.layer.parent).x;
        this.layer.position.y = e.data.getLocalPosition(this.layer.parent).y;
      }
    });
  }

  get layer() {
    return this[_layer];
  }

  select() {
    this[_colorFilter].enabled = true;
  }

  unselect() {
    this[_colorFilter].enabled = false;
  }

  move(x, y) {
    const xy = (i) => i * this[_settings].cellsize - this[_settings].cellsize;
    this[_layer].x = this[_settings].cellsize / 2 + xy(x);
    this[_layer].y = this[_settings].cellsize / 2 + xy(y);
  }

  on(...args) {
    this[_events].on(...args);
  }

  toJSON() {
    return {
      id: this.id,
      x: this.x,
      y: this.y,
      src: this.src,
    };
  }
}
