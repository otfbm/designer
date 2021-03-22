import { h, Component } from "preact";
import htm from "htm";

const html = htm.bind(h);

class BackgroundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null };
  }

  onSelect = (background) => {
    this.setState({ selected: background });
  };

  render(props, state) {
    return html`<div id="background-selector">
      <div id="background-thumbnails" class="flex flex-wrap -mx-4 -mb-8">
        ${props.backgrounds.map(
          (background) =>
            html`<div
              class="md:w-1/4 px-4 mb-8"
              onClick="${() => this.onSelect(background)}"
            >
              <img
                class="cursor-pointer rounded shadow-md border-solid border-4"
                src="${background}"
              />
            </div>`
        )}
      </div>
      <div class="ml-auto mt-5">
        <button
          onClick="${() => props.select(state.selected)}"
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Select
        </button>
      </div>
    </div>`;
  }
}

export default BackgroundsForm;