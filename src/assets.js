export default class Assets {
  constructor() {
    this.tokens = [];
    this.backgrounds = [];
  }

  async load() {
    this.backgrounds = [
      "backgrounds/grass-grid.jpg",
      "backgrounds/sand-grid.jpg",
      "backgrounds/stone-grid.jpg",
      "backgrounds/water-grid.jpg",
      "backgrounds/wood-grid.jpg",
      "backgrounds/falls.png",
      "backgrounds/mines.jpg",
      "backgrounds/grass-river.jpg",
      "backgrounds/forge.jpg",
      "backgrounds/grass-rock.jpeg",
    ];
    this.tokens = [
      "token_144.png",
      "token_150.png",
      "token_146.png",
      "token_137.png",
      "token_134.png",
      "token_133.png",
    ];
  }
}
