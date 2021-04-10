import { h, Component } from "preact";
import htm from "htm";

const html = htm.bind(h);

class UtilityBar extends Component {
  constructor() {
    super();
    this.state = {
      editingBackgroundPosition: false,
      editingGridDrag: false,
    };
  }

  toggleBackgroundPositionEditing() {
    const newState = !this.state.editingBackgroundPosition;
    this.setState({
      editingBackgroundPosition: newState,
    });
    this.props.offsetEditingToggled(newState);
  }

  toggleGridDragEditing() {
    const newState = !this.state.editingGridDrag;
    this.setState({
      editingGridDrag: newState,
    });
    this.props.gridEditingToggled(newState);
  }

  render({ resetOffset, gainFocus }) {
    return html`<div
      id="utility-bar"
      class="absolute top-2 left-2 flex items-left space-x-2 max-w-sm h-10 bg-white bg-opacity-50 shadow p-2"
      onClick="${gainFocus}"
    >
      <div class="flex-shrink-0">
        <button
          id="enable-offset-map-button"
          onClick="${() => {
            this.toggleBackgroundPositionEditing();
            gainFocus();
          }}"
        >
          <img class="h-6 w-6" src="move.png" />
        </button>
      </div>
      <div class="flex-shrink-0">
        <button
          id="enable-offset-map-button"
          onClick="${() => {
            resetOffset();
            gainFocus();
          }}"
        >
          <img class="h-6 w-6" src="rotate-left.png" />
        </button>
      </div>
      <div class="flex-shrink-0">
        <button
          id="enable-grid-resize-button"
          onClick="${() => {
            this.toggleGridDragEditing();
            gainFocus();
          }}"
        >
          <img class="h-6 w-6" src="split-horizontal.png" />
        </button>
      </div>
    </div>`;
  }
}
export default UtilityBar;
