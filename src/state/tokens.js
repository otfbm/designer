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

  add(token) {
    token.id = uuidv4();
    this.set(token.id, token);
    this[_events].emit("state:tokens:add", token);
    this[_adapter].set(`${this.id}:state:tokens`, Array.from(this.entries()));
    return this;
  }

  remove(token) {
    if (this.has(token.id)) {
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

  update(token) {
    this.set(token.id, { ...this.get(token.id), ...token });
    this[_events].emit("state:tokens:update", this.get(token.id));
    this[_adapter].set(`${this.id}:state:tokens`, Array.from(this.entries()));
    return this;
  }

  select(token) {
    this[_events].emit("state:tokens:select", this.get(token.id));
  }

  deselect(token) {
    this[_events].emit("state:tokens:deselect", this.get(token.id));
  }
}
