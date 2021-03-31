import { Component, h } from "preact";
import htm from "htm";

const html = htm.bind(h);

export default class Token extends Component {
  render(props) {
    const { token, select } = props;

    return html`<li>
      <img
        class="mb-1 token object-scale-down object-center"
        src="${token.src}"
        onPointerDown="${() => select(token)}"
      />
    </li>`;
  }
}
