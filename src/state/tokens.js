import Token from "../data/token";

const _events = Symbol("events");
const _adapter = Symbol("events");

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

export default class Tokens extends Map {
  constructor(id, events, adapter) {
    super();
    this.id = id;
    this[_events] = events;
    this[_adapter] = adapter;
  }

  add(data) {
    const token = new Token(data);
    token.id = uuidv4();
    this.set(token.id, token);
    this[_events].emit("state:tokens:add", token);
    this[_adapter].set(`${this.id}:state:tokens`, Array.from(this.entries()));
    return this;
  }

  remove(data) {
    if (this.has(data.id)) {
      const token = this.get(data.id);
      this.deselect(token);
      const success = this.delete(token.id);
      if (success) {
        this[_events].emit("state:tokens:remove", token);
        this[_adapter].set(
          `${this.id}:state:tokens`,
          Array.from(this.entries())
        );
      }
      return success;
    }
    return false;
  }

  update(data) {
    const token = this.get(data.id);
    this.set(token.id, { ...token, ...data });
    this[_events].emit("state:tokens:update", this.get(token.id));
    this[_adapter].set(`${this.id}:state:tokens`, Array.from(this.entries()));
    return this;
  }

  select(data) {
    this[_events].emit("state:tokens:select", this.get(data.id));
  }

  deselect(data) {
    this[_events].emit("state:tokens:deselect", this.get(data.id));
  }
}
