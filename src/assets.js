export default class Assets {
  constructor() {
    this.tokens = [];
    this.backgrounds = [];
  }

  async fetchBackgrounds() {
    const response = await fetch("http://localhost:8081/users/1/backgrounds");
    return response.json();
  }

  async fetchTokens() {
    const response = await fetch("http://localhost:8081/users/1/tokens");
    return response.json();
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
