import { h, Component } from "preact";
import htm from "htm";

const html = htm.bind(h);

class TokenMenu extends Component {
  onInput = (e) => {
    const { value, name } = e.target;
    this.props.change(this.props.tokenId, name, value);
  };

  render(props) {
    if (!props.show) return html``;

    return html`<div
      class="fixed top-10 left-10 w-48 h-auto bg-black opacity-70 rounded p-1"
    >
      <label class="mb-1 uppercase font-bold text-sm text-white" for="label"
        >Label</label
      >
      <div class="mb-1 pt-0">
        <input
          type="text"
          name="label"
          placeholder="Label"
          class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
          value=${props.token.label || ""}
          onInput=${this.onInput.bind(this)}
        />
      </div>

      <label class="mb-1 uppercase font-bold text-sm text-white" for="size"
        >Size</label
      >
      <div class="mb-1 pt-0">
        <input
          type="text"
          name="size"
          placeholder="Size"
          class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
          value=${props.token.size || ""}
          onInput=${this.onInput.bind(this)}
        />
      </div>

      <label class="mb-1 uppercase font-bold text-sm text-white" for="rotation"
        >Rotation</label
      >
      <div class="mb-1 pt-0">
        <input
          type="text"
          name="rotation"
          placeholder="rotation"
          class="px-2 py-1 placeholder-blueGray-300 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full"
          value=${props.token.rotation || ""}
          onInput=${this.onInput.bind(this)}
        />
      </div>

      <div class="flex justify-end">
        <button
          class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mt-1 ease-linear transition-all duration-150 "
          type="button"
          onClick=${props.delete}
        >
          Delete
        </button>
      </div>
    </div>`;
  }
}

export default TokenMenu;
