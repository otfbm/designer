import { Sprite, Container, filters } from "pixi.js";

const _settings = Symbol("settings");
const _token = Symbol("token");
const _colorFilter = Symbol("colorFilter");
const _layer = Symbol("layer");
const _sprite = Symbol("sprite");

export default class Token {
  constructor(settings, assets, token) {
    const {
      loader: { resources },
    } = assets;
    const xy = (i) => i * settings.cellsize - settings.cellsize;
    this.xy = xy;

    this.id = token.id;
    this[_token] = token;

    this[_settings] = settings;
    this[_layer] = new Container();
    this[_layer].interactive = true;

    this[_layer].id = this.id;
    this[_layer].type = "token";

    this[_colorFilter] = new filters.ColorMatrixFilter();
    this[_layer].filters = [this[_colorFilter]];
    this[_colorFilter].enabled = false;
    this[_colorFilter].hue(45);

    const sprite = new Sprite(resources[token.src].texture);
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    this[_sprite] = sprite;

    this.move();
    this.resize();
    this.rotate();

    this[_layer].addChild(sprite);
  }

  get layer() {
    return this[_layer];
  }

  select() {
    // this[_colorFilter].enabled = true;
  }

  unselect() {
    // this[_colorFilter].enabled = false;
  }

  move() {
    const xy = (i) => i * this[_settings].cellsize - this[_settings].cellsize;
    const sizeModifier = this[_token].size % 2 === 0 ? 1 : 2;
    this[_layer].x =
      this[_settings].cellsize / sizeModifier + xy(this[_token].x);
    this[_layer].y =
      this[_settings].cellsize / sizeModifier + xy(this[_token].y);
  }

  resize() {
    this[_sprite].width =
      this[_settings].cellsize * parseFloat(this[_token].size);
    this[_sprite].height =
      this[_settings].cellsize * parseFloat(this[_token].size);
  }

  rotate() {
    this[_sprite].rotation = (this[_token].rotation * Math.PI) / 180;
  }

  set settings(settings) {
    this[_settings] = settings;
    this.move();
    this.resize();
    this.rotate();
  }

  set token(token) {
    this[_token] = token;
    this.move();
    this.resize();
    this.rotate();
  }
}
