import { h, Component } from "preact";
import htm from "htm";

const html = htm.bind(h);

class BackgroundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null, selectedVisual: null };
  }

  onSelect = (background) => {
    this.setState({
      selected: background,
      selectedVisual: background == null ? "blank" : background,
    });
  };

  render(props, state) {
    const cl = this.state.selectedVisual;
    return html`<div id="background-selector">
      <div id="background-thumbnails" class="flex flex-wrap -mx-4 -mb-8">
        <div class="md:w-1/4 px-4 mb-8" onClick="${() => this.onSelect(null)}">
          <img
            class="cursor-pointer rounded shadow-md border-solid border-4${cl ===
            "blank"
              ? " border-indigo-600"
              : ""}"
            src="backgrounds/blank.jpg"
          />
        </div>
        ${props.backgrounds.map(
          (background) =>
            html`<div
              class="md:w-1/4 px-4 mb-8"
              onClick="${() => this.onSelect(background)}"
            >
              <img
                class="cursor-pointer rounded shadow-md border-solid border-4${cl ===
                background
                  ? " border-indigo-600"
                  : ""}"
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
