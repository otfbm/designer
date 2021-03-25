import { Component, h } from "preact";
import htm from "htm";

const html = htm.bind(h);

export default class Token extends Component {
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
