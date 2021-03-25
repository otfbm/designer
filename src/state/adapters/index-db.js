import { openDB } from "idb";

export default class IndexDBAdapter {
  constructor(name, version = 1) {
    this.name = name;
    this.version = version;
    this.db = openDB(this.name, this.version, {
      upgrade(db) {
        db.createObjectStore("tokens");
        db.createObjectStore("settings");
        db.createObjectStore("backgrounds");
      },
    });
  }
  async add(store, value) {
    const db = await this.db;
    return db.add(store, value);
  }
  async set(store, key, value) {
    const db = await this.db;
    return db.put(store, value, key);
  }
  async get(store, key) {
    const db = await this.db;
    return db.get(store, key);
  }
  async getAll(store, query = null, count = null) {
    const db = await this.db;
    return db.getAll(store, query, count);
  }
  async delete(store, key) {
    const db = await this.db;
    return db.delete(store, key);
  }
}
