export default class DragDrop {
  constructor(dropCallback) {
    this.dragging = false;
    this.dragTarget = null;
    this.srcElement = null;
    this.callback = dropCallback;
  }

  down(e) {
    if (e.target.classList.contains("token")) {
      this.dragging = true;
      this.srcElement = e.target;
      this.srcElement.classList.add("opacity-70");
      this.dragTarget = e.target.cloneNode();
      this.dragTarget.classList.add("fixed");
      this.dragTarget.classList.add("w-16");
      this.dragTarget.classList.add("h-16");
      this.dragTarget.style.left = "10000px";
      this.dragTarget.style.top = "10000px";
      document.body.appendChild(this.dragTarget);
    }
  }

  move(e) {
    if (this.dragging && this.dragTarget) {
      this.dragTarget.style.left = e.clientX - 25 + "px";
      this.dragTarget.style.top = e.clientY - 25 + "px";
    }
  }

  up(e) {
    if (this.dragging && this.dragTarget) {
      const src = this.dragTarget.getAttribute("src");
      document.body.removeChild(this.dragTarget);
      this.dragging = false;
      this.dragTarget = null;
      this.srcElement.classList.remove("opacity-70");
      this.srcElement = null;
      this.callback({
        src,
        x: e.clientX,
        y: e.clientY,
      });
    }
  }

  enable() {
    document.addEventListener("pointerdown", this.down.bind(this));
    document.addEventListener("pointermove", this.move.bind(this));
    document.addEventListener("pointerup", this.up.bind(this));
  }

  disable() {
    document.removeEventListener("pointerdown", this.down.bind(this));
    document.removeEventListener("pointermove", this.move.bind(this));
    document.removeEventListener("pointerup", this.up.bind(this));
  }
}
