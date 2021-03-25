import { Sprite, Container, filters } from "pixi.js";

const _settings = Symbol("settings");
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
    this.token = token;

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
    sprite.width = settings.cellsize;
    sprite.height = settings.cellsize;
    sprite.anchor.x = 0.5;
    sprite.anchor.y = 0.5;
    this[_sprite] = sprite;

    this.move(token.x, token.y);

    this[_layer].addChild(sprite);
  }

  update(settings) {
    this[_sprite].width = settings.cellsize;
    this[_sprite].height = settings.cellsize;
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

  move(x, y) {
    const xy = (i) => i * this[_settings].cellsize - this[_settings].cellsize;
    this[_layer].x = this[_settings].cellsize / 2 + xy(x);
    this[_layer].y = this[_settings].cellsize / 2 + xy(y);
  }
}
