import { Component, h } from "preact";
import htm from "htm";

const html = htm.bind(h);

export default class Token extends Component {
  constructor() {
    super();
    this.state = {
      dragging: false,
      srcElement: null,
      dragTarget: null,
      dragPosition: {
        current: {},
        previous: {},
      },
    };
  }

  doubleClick(e) {
    console.log("double click");
  }

  // pointerDown(e) {
  //   if (e.target.classList.contains("token")) {
  //     const srcElement = e.target;
  //     const dragTarget = e.target.cloneNode();
  //     srcElement.classList.add("opacity-70");
  //     document.body.appendChild(dragTarget);
  //     dragTarget.classList.add("fixed");
  //     dragTarget.classList.add("w-16");
  //     dragTarget.classList.add("h-16");
  //     this.setState({
  //       dragging: true,
  //       srcElement,
  //       dragTarget,
  //     });
  //   }
  // }

  // pointerMove(e) {
  //   const { dragging, dragTarget } = this.state;
  //   if (dragging && dragTarget) {
  //     dragTarget.style.left = e.clientX - 25 + "px";
  //     dragTarget.style.top = e.clientY - 25 + "px";
  //   }
  // }

  // pointerUp(e) {
  //   const { srcElement, dragging, dragTarget } = this.state;
  //   document.body.removeChild(dragTarget);
  //   srcElement.classList.remove("opacity-70");
  //   this.setState({
  //     dragging: false,
  //     dragTarget: null,
  //     srcElement: null,
  //   });
  //   // this.props.dropToken({ x: e.clientX, y: e.clientY });
  // }

  render(props) {
    const { src, select } = props;

    return html`<li>
      <img
        class="mb-1 token object-scale-down object-center"
        src="${src}"
        onPointerDown="${() => select(src)}"
      />
    </li>`;
  }
}
