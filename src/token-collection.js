import { Container } from "pixi.js";
import Token from "./token.js";

export default class TokenCollection {
  constructor(state) {
    this.state = state;
    this.tokens = new Map();
    this.layer = new Container();
  }

  add(token) {
    this.tokens.set(token.id, token);
    this.layer.addChild(token.layer);
  }

  get(id) {
    return this.tokens.get(id);
  }

  update(settings) {
    for (const token of Array.from(this.tokens.values())) {
      token.update(settings);
    }
  }

  remove(token) {
    const t = this.tokens.get(token.id);
    this.layer.removeChild(t.layer);
    this.tokens.delete(token.id);
  }

  removeAll() {
    this.layer.removeChildren();
  }
}
