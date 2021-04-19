import { h, Component } from "preact";
import htm from "htm";
import ModalHeader from "./modal-header.js";
import ModalFooter from "./modal-footer.js";

const html = htm.bind(h);

const DeleteButton = ({ background, onDelete }) => {
  if (!background.custom) return html``;
  return html`<div class="absolute -top-1 right-3 w-6 h-6 cursor-pointer">
    <img
      class="object-scale-down object-center"
      src="/delete-sign.png"
      onClick="${() => onDelete(background)}"
    />
  </div>`;
};

const BackgroundImageThumbnail = ({
  background,
  selected,
  onSelect,
  onDelete,
}) => {
  return html`
    <div class="md:w-1/4 px-4 mb-8 relative">
      <${DeleteButton} background=${background} onDelete=${onDelete}><//>
      <img
        class="cursor-pointer rounded shadow-md border-solid border-4${selected ===
        background
          ? " border-indigo-600"
          : ""}"
        src="${background.src}"
        onClick="${() => onSelect(background)}"
      />
    </div>
  `;
};

class BackgroundsForm extends Component {
  constructor(props) {
    super(props);
    this.state = { selected: null, selectedVisual: null, newURLField: "" };
  }

  onSelect = (background) => {
    this.setState({
      selected: background,
      selectedVisual: background == null ? "blank" : background,
    });
  };

  onURLSubmit(e) {
    const { value } = e.target.children[0];
    if (value) this.props.newBackground({ src: value });
    this.setState({ newURLField: "" });
    e.preventDefault();
  }

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
                  html`<${BackgroundImageThumbnail}
                    background="${background}"
                    selected=${cl}
                    onSelect="${this.onSelect.bind(this)}"
                    onDelete="${props.delete}"
                  ><//>`
              )}
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div class="py-2 w-full px-8">
        <form
          class="flex flex-row items-center"
          onSubmit="${this.onURLSubmit.bind(this)}"
        >
          <input
            class="w-full border py-2 px-3 text-grey-darkest mr-2"
            type="text"
            name="background-url"
            value="${this.state.newURLField}"
            placeholder="Add background by URL"
          />
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            type="submit"
          >
            Add
          </button>
        </form>
      </div>
      <${ModalFooter}
        close=${props.close}
        action=${() => props.select(this.state.selected)}
        >Select<//
      >`;
  }
}

export default BackgroundsForm;
