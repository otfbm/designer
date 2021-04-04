import { Sprite, Container } from "pixi.js";

export default class Background {
  constructor(assets, viewport, state) {
    this.assets = assets;
    this.state = state;
    this.layer = new Container();
    this.layer.interactive = true;
    this.layer.type = "background";
    this.sprite = null;
    this.drag = false;
    this.selected = false;
    this.offsetEditingEnabled = false;

    viewport.on("mousedown", this.handleDragStart.bind(this));
    viewport.on("touchstart", this.handleDragStart.bind(this));

    viewport.on("mousemove", this.handleDrag.bind(this));
    viewport.on("touchmove", this.handleDrag.bind(this));

    viewport.on("mouseup", this.handleDragEnd.bind(this));
    viewport.on("touchend", this.handleDragEnd.bind(this));
  }

  handleDragStart(e) {
    if (
      e.target &&
      e.target.type === "background" &&
      this.offsetEditingEnabled
    ) {
      const viewportPosition = e.data.getLocalPosition(this.layer.parent);
      const backgroundPosition = e.data.getLocalPosition(this.layer);

      this.layer.position.x = viewportPosition.x;
      this.layer.position.y = viewportPosition.y;
      this.layer.pivot.x = backgroundPosition.x;
      this.layer.pivot.y = backgroundPosition.y;

      this.drag = true;
      this.layer.parent.pause = true;
    }
  }

  handleDrag(e) {
    if (this.drag) {
      const position = e.data.getLocalPosition(this.layer.parent);
      this.layer.position.x = position.x;
      this.layer.position.y = position.y;
    }
  }

  handleDragEnd(e) {
    if (this.drag) {
      const viewportPosition = e.data.getLocalPosition(this.layer.parent);
      const backgroundPosition = e.data.getLocalPosition(this.layer);

      this.state.settings = {
        backgroundOffsetX: Math.round(
          viewportPosition.x - backgroundPosition.x
        ),
        backgroundOffsetY: Math.round(
          viewportPosition.y - backgroundPosition.y
        ),
      };

      this.layer.parent.pause = false;
      this.drag = false;
    }
  }

  setImage(src) {
    this.src = src;
    if (this.sprite) this.layer.removeChild(this.sprite);
    if (src) {
      this.sprite = new Sprite(this.assets.resources[src].texture);
      this.layer.addChild(this.sprite);
    }
  }

  setOffset(x = 0, y = 0) {
    this.layer.pivot.x = 0;
    this.layer.pivot.y = 0;
    this.layer.x = x;
    this.layer.y = y;
  }

  resetOffset() {
    this.state.settings = {
      backgroundOffsetX: 0,
      backgroundOffsetY: 0,
    };
  }

  enableOffsetEditing(state) {
    this.offsetEditingEnabled = state;
    if (state) {
      document.querySelector("body").style.cursor = "move";
    } else {
      document.querySelector("body").style.cursor = "default";
    }
  }
}
