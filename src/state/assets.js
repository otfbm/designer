import Token from "../data/token";
import Background from "../data/background";

const backgrounds = [
  [
    1,
    [
      [
        1,
        {
          id: 1,
          userId: 1,
          src: "http://localhost:8080/backgrounds/grass-grid.jpg",
        },
      ],
      [
        2,
        {
          id: 2,
          userId: 1,
          src: "http://localhost:8080/backgrounds/sand-grid.jpg",
        },
      ],
      [
        3,
        {
          id: 3,
          userId: 1,
          src: "http://localhost:8080/backgrounds/stone-grid.jpg",
        },
      ],
      [
        4,
        {
          id: 4,
          userId: 1,
          src: "http://localhost:8080/backgrounds/water-grid.jpg",
        },
      ],
      [
        5,
        {
          id: 5,
          userId: 1,
          src: "http://localhost:8080/backgrounds/wood-grid.jpg",
        },
      ],
      [
        6,
        {
          id: 6,
          userId: 1,
          src: "http://localhost:8080/backgrounds/falls.png",
        },
      ],
      [
        7,
        {
          id: 7,
          userId: 1,
          src: "http://localhost:8080/backgrounds/mines.jpg",
        },
      ],
      [
        8,
        {
          id: 8,
          userId: 1,
          src: "http://localhost:8080/backgrounds/grass-river.jpg",
        },
      ],
      [
        9,
        {
          id: 9,
          userId: 1,
          src: "http://localhost:8080/backgrounds/forge.jpg",
        },
      ],
      [
        10,
        {
          id: 10,
          userId: 1,
          src: "http://localhost:8080/backgrounds/grass-rock.jpeg",
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
          id: 1,
          userId: 1,
          src: "http://localhost:8080/tokens/token_144.png",
        },
      ],
      [
        2,
        {
          id: 2,
          userId: 1,
          src: "http://localhost:8080/tokens/token_150.png",
        },
      ],
      [
        3,
        {
          id: 3,
          userId: 1,
          src: "http://localhost:8080/tokens/token_146.png",
        },
      ],
      [
        4,
        {
          id: 4,
          userId: 1,
          src: "http://localhost:8080/tokens/token_137.png",
        },
      ],
      [
        5,
        {
          id: 5,
          userId: 1,
          src: "http://localhost:8080/tokens/token_134.png",
        },
      ],
      [
        6,
        {
          id: 6,
          userId: 1,
          src: "http://localhost:8080/tokens/token_133.png",
        },
      ],
    ],
  ],
];

export default class Assets {
  constructor() {
    this.tokens = [];
    this.backgrounds = [];
  }

  async fetchBackgrounds() {
    // const response = await fetch("http://localhost:8081/users/1/backgrounds");
    // return response.json();
    const userData = new Map(backgrounds).get(1);
    const bgs = new Map(userData);
    return Array.from(bgs.values()).map((bg) => new Background(bg));
  }

  async fetchTokens() {
    // const response = await fetch("http://localhost:8081/users/1/tokens");
    // return response.json();
    const userData = new Map(tokens).get(1);
    const tks = new Map(userData);
    return Array.from(tks.values()).map((token) => new Token(token));
  }

  async load() {
    const [backgrounds, tokens] = await Promise.all([
      this.fetchBackgrounds(),
      this.fetchTokens(),
    ]);
    this.backgrounds = backgrounds;
    this.tokens = tokens;
  }
}
