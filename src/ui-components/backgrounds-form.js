import { h, Component } from "preact";
import htm from "htm";
import ModalHeader from "./modal-header.js";
import ModalFooter from "./modal-footer.js";

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
    return html`<${ModalHeader} close=${props.close}>Backgrounds<//>
      <div class="p-8 overflow-auto">
        <div class="">
          <div id="background-selector">
            <div id="background-thumbnails" class="flex flex-wrap -mx-4 -mb-8">
              <div
                class="md:w-1/4 px-4 mb-8"
                onClick="${() => this.onSelect(null)}"
              >
                <img
                  class="cursor-pointer rounded shadow-md border-solid border-4${cl ===
                  "blank"
                    ? " border-indigo-600"
                    : ""}"
                  src="blank.jpg"
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
          </div>
        </div>
      </div>
      <${ModalFooter}
        close=${props.close}
        action=${() => props.select(this.state.selected)}
        >Select<//
      >`;
  }
}

export default BackgroundsForm;
