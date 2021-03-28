export default class TokenDragAndDrop {
  constructor(tokenLayers, state) {
    this.drag = false;
    this.dragTarget = null;
    this.tokens = tokenLayers;
    this.state = state;
    this.originalX = null;
    this.originalY = null;
  }

  handleDragStart(e) {
    if (e.target && e.target.type === "token") {
      this.drag = true;
      const token = this.tokens.get(e.target.id);
      this.dragTarget = token;
      this.originalX = this.dragTarget.layer.position.x;
      this.originalY = this.dragTarget.layer.position.y;
      token.layer.parent.parent.pause = true;
    }
  }

  handleDrag(e) {
    if (this.drag && this.dragTarget) {
      this.dragTarget.layer.position.x = e.data.getLocalPosition(
        this.dragTarget.layer.parent
      ).x;
      this.dragTarget.layer.position.y = e.data.getLocalPosition(
        this.dragTarget.layer.parent
      ).y;
    }
  }

  handleDragEnd(e) {
    if (this.drag && this.dragTarget) {
      const pos = e.data.getLocalPosition(this.dragTarget.layer.parent);
      const { cellsize, width, height } = this.state.settings;
      const tokenInsideBoard =
        pos.x > 0 &&
        pos.x < width * cellsize &&
        pos.y > 0 &&
        pos.y < height * cellsize;
      if (tokenInsideBoard) {
        const closestCellX = Math.ceil(pos.x / cellsize);
        const closestCellY = Math.ceil(pos.y / cellsize);
        this.state.tokens.update({
          id: this.dragTarget.id,
          x: closestCellX,
          y: closestCellY,
        });
      } else {
        this.dragTarget.layer.position.x = this.originalX;
        this.dragTarget.layer.position.y = this.originalY;
      }

      this.dragTarget.layer.parent.parent.pause = false;
      this.drag = false;
      this.dragTarget = null;
      this.originalX = null;
      this.originalY = null;
    }
  }

  enable(viewport) {
    viewport.on("mousedown", this.handleDragStart.bind(this));
    viewport.on("touchstart", this.handleDragStart.bind(this));

    viewport.on("mousemove", this.handleDrag.bind(this));
    viewport.on("touchmove", this.handleDrag.bind(this));

    viewport.on("mouseup", this.handleDragEnd.bind(this));
    viewport.on("touchend", this.handleDragEnd.bind(this));
  }
}
