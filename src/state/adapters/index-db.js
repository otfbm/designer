import { openDB } from "idb";

export default class IndexDBAdapter {
  constructor(name, version = 1) {
    this.name = name;
    this.version = version;
    this.db = openDB(this.name, this.version, {
      upgrade(db) {
        const tokensStore = db.createObjectStore("tokens", {
          keyPath: "id",
        });
        tokensStore.createIndex("boardId", "boardId", { unique: false });
        db.createObjectStore("settings", {
          keyPath: "boardId",
        });
        db.createObjectStore("backgrounds", {
          keyPath: "boardId",
        });
        const mapsStore = db.createObjectStore("maps", {
          keyPath: "id",
        });
        mapsStore.createIndex("boardId", "boardId", { unique: false });
        const userTokensStore = db.createObjectStore("userTokens", {
          keyPath: "id",
        });
        userTokensStore.createIndex("boardId", "boardId", { unique: false });
      },
    });
  }
  async add(store, value) {
    const db = await this.db;
    return db.add(store, value);
  }
  async set(store, value) {
    const db = await this.db;
    return db.put(store, value);
  }
  async get(store, key) {
    const db = await this.db;
    return db.get(store, key);
  }
  async getAll(store, index, value) {
    const db = await this.db;
    if (index && value) return db.getAllFromIndex(store, index, value);
    if (index) return db.getAllFromIndex(store, index);
    return db.getAll(store);
  }
  async getAllByIndex(store, index) {
    const db = await this.db;
    return db.getAllFromIndex(store, index);
  }
  async delete(store, key) {
    const db = await this.db;
    return db.delete(store, key);
  }
}
