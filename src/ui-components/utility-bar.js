import { h, Component } from "preact";
import htm from "htm";
import SVGController from "./svg-components/controller";
import SVGImage from "./svg-components/image";
import SVGDragout from "./svg-components/dragout";
import SVGDownload from "./svg-components/download";
import SVGOptions from "./svg-components/options";
import SVGUndo from "./svg-components/undo";

const html = htm.bind(h);

class UtilityBar extends Component {
  constructor() {
    super();
    this.state = {
      editingBackgroundPosition: false,
      editingGridDrag: false,
      selected: "",
    };
  }

  toggleBackgroundPositionEditing() {
    const newState = !this.state.editingBackgroundPosition;
    this.setState({
      editingGridDrag: false,
      editingBackgroundPosition: newState,
      selected: newState ? "bg-position-drag" : "",
    });
    this.props.offsetEditingToggled(newState);
    this.props.gridEditingToggled(false);
  }

  toggleGridDragEditing() {
    const newState = !this.state.editingGridDrag;
    this.setState({
      editingGridDrag: newState,
      editingBackgroundPosition: false,
      selected: newState ? "grid-drag" : "",
    });
    this.props.gridEditingToggled(newState);
    this.props.offsetEditingToggled(false);
  }

  render({
    resetOffset,
    gainFocus,
    openBackgrounds,
    openOTFBMInfo,
    openSettings,
  }) {
    return html`<div
      id="utility-bar"
      class="left-auto right-auto flex items-left space-x-2 max-w-sm h-10 bg-black bg-opacity-75 shadow p-2 rounded-md"
      onClick="${gainFocus}"
    >
      <div class="flex-shrink-0">
        <button
          id="backgrounds-button"
          onClick="${() => {
            gainFocus();
            openBackgrounds();
          }}"
        >
          <${SVGImage} selected=${this.state.selected === "bg-select"} />
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
          <${SVGDragout} selected=${this.state.selected === "grid-drag"} />
        </button>
      </div>
      <div class="flex-shrink-0">
        <button
          id="enable-offset-map-button"
          onClick="${() => {
            this.toggleBackgroundPositionEditing();
            gainFocus();
          }}"
        >
          <${SVGController}
            selected=${this.state.selected === "bg-position-drag"}
          />
        </button>
      </div>
      <!-- <div class="flex-shrink-0">
        <button
          id="enable-offset-map-button"
          onClick="${() => {
        resetOffset();
        gainFocus();
      }}"
        >
          <${SVGUndo} selected=${this.state.selected === "undo"} />
        </button>
      </div> -->
      <div class="flex-shrink-0">
        <button
          id="OTFBM-info-button"
          onClick="${() => {
            gainFocus();
            openOTFBMInfo();
          }}"
        >
          <${SVGDownload} selected=${this.state.selected === "download"} />
        </button>
      </div>
      <div class="flex-shrink-0">
        <button
          id="settings-button"
          onClick="${() => {
            gainFocus();
            openSettings();
          }}"
        >
          <${SVGOptions} selected=${this.state.selected === "settings"} />
        </button>
      </div>
    </div>`;
  }
}
export default UtilityBar;
