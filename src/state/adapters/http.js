import Background from "../../data/background.js";
import Settings from "../../data/settings.js";

const join = (...args) => args.join("/");

export default class HttpAdapter {
  constructor(origin, version = 1) {
    this.origin = origin;
    this.version = version;
  }
  async add(store, value) {
    // const db = await this.db;
    // return db.add(store, value);
    return;
  }
  async set(store, value) {
    // let result;
    switch (store) {
      case "backgrounds":
        break;
      case "settings":
        break;
    }
    // const db = await this.db;
    // return db.put(store, value);
    // return result.json();
  }
  async get(store, key) {
    let settings;
    switch (store) {
      case "backgrounds":
        const boards = await fetch(new URL(join("boards", key), this.origin));
        settings = await boards.json();
        return new Background(settings.background);
      case "settings":
        settings = await fetch(new URL(join("boards", key), this.origin));
        return new Settings(await settings.json());
    }
  }
  async getAll(store, index, value) {
    let result;
    switch (store) {
      case "tokens":
        result = await fetch(
          new URL(join("boards", this.id, "tokens"), this.origin)
        );
        break;
    }

    return result.json();
  }
  async delete(store, key) {
    return;
  }
}
