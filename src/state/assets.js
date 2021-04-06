import Token from "../data/token";
import Background from "../data/background";

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  );
}

const backgrounds = [
  [
    1,
    [
      [
        1,
        {
          id: uuidv4(),
          userId: 1,
          src: "/backgrounds/grass-grid.jpg",
        },
      ],
      [
        2,
        {
          id: uuidv4(),
          userId: 1,
          src: "/backgrounds/sand-grid.jpg",
        },
      ],
      [
        3,
        {
          id: uuidv4(),
          userId: 1,
          src: "/backgrounds/stone-grid.jpg",
        },
      ],
      [
        4,
        {
          id: uuidv4(),
          userId: 1,
          src: "/backgrounds/water-grid.jpg",
        },
      ],
      [
        5,
        {
          id: uuidv4(),
          userId: 1,
          src: "/backgrounds/wood-grid.jpg",
        },
      ],
    ],
  ],
];

const tokens = [
  [
    1,
    [
      [
        1,
        {
          id: uuidv4(),
          userId: 1,
          src: "/tokens/token_144.png",
        },
      ],
      [
        2,
        {
          id: uuidv4(),
          userId: 1,
          src: "/tokens/token_150.png",
        },
      ],
      [
        3,
        {
          id: uuidv4(),
          userId: 1,
          src: "/tokens/token_146.png",
        },
      ],
      [
        4,
        {
          id: uuidv4(),
          userId: 1,
          src: "/tokens/token_137.png",
        },
      ],
      [
        5,
        {
          id: uuidv4(),
          userId: 1,
          src: "/tokens/token_134.png",
        },
      ],
      [
        6,
        {
          id: uuidv4(),
          userId: 1,
          src: "/tokens/token_133.png",
        },
      ],
    ],
  ],
];

export default class Assets {
  constructor(boardId, adapter) {
    this.tokens = [];
    this.maps = [];
    this.adapter = adapter;
    this.boardId = boardId;
  }

  async fetchMaps() {
    // const response = await fetch("http://localhost:8081/users/1/backgrounds");
    // return response.json();
    const userData = new Map(backgrounds).get(1);
    const bgs = new Map(userData);
    const baseMaps = Array.from(bgs.values()).map((bg) => new Background(bg));

    const maps = await this.adapter.getAll("maps", "boardId", this.boardId);

    if (maps && maps.length)
      return baseMaps.concat(maps.map((m) => new Background(m)));
    else return baseMaps;
  }

  async fetchTokens() {
    // const response = await fetch("http://localhost:8081/users/1/tokens");
    // return response.json();
    const userData = new Map(tokens).get(1);
    const tks = new Map(userData);
    const baseUserTokens = Array.from(tks.values()).map(
      (token) => new Token(token)
    );

    const userTokens = await this.adapter.getAll(
      "userTokens",
      "boardId",
      this.boardId
    );

    if (userTokens && userTokens.length)
      return baseUserTokens.concat(userTokens.map((t) => new Token(t)));
    else return baseUserTokens;
  }

  async add(type, asset) {
    asset.id = uuidv4();
    asset.userId = 1;
    asset.boardId = this.boardId;
    await this.adapter.set(type, asset);
  }

  async remove(type, asset) {
    await this.adapter.delete(type, asset.id);
  }

  async load() {
    const [m, t] = await Promise.all([this.fetchMaps(), this.fetchTokens()]);
    this.maps = m;
    this.tokens = t;
  }
}
