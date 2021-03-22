import { Container } from "pixi.js";
import Token from "./token.js";

export default class TokenCollection {
  constructor(state) {
    this.state = state;
    this.tokens = new Map();
    this.layer = new Container();
  }

  add(token) {
    if (token instanceof Token) {
      this.tokens.set(token.id, token);
      token.layer.click = () => {
        this.tokens.forEach((t) => {
          t.unselect();
        });
        this.state.selectedToken = token;
        token.select();
      };
      token.on("move", ({ x, y }) => {
        token.x = x;
        token.y = y;
        this.state.state.tokens.update(token);
      });
      this.layer.addChild(token.layer);
    } else {
      throw new Error(
        '"token" must be an instance of class Token when calling TokenCollection.add'
      );
    }
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
