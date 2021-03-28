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
      "tokens/token_144.png",
      "tokens/token_150.png",
      "tokens/token_146.png",
      "tokens/token_137.png",
      "tokens/token_134.png",
      "tokens/token_133.png",
    ];
  }
}
