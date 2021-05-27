import { h, Component } from "preact";
import htm from "htm";
import SVGController from "./svg-components/controller";
import SVGImage from "./svg-components/image";
import SVGDragout from "./svg-components/dragout";
import SVGDownload from "./svg-components/download";
import SVGOptions from "./svg-components/options";
import SVGUndo from "./svg-components/undo";

const html = htm.bind(h);

const ToolTip = ({ text }) =>
  html`
    <div
      class="bg-black text-white text-xs rounded py-1 px-4 right-0 bottom-full"
    >
      ${text}
      <!-- <svg
        class="absolute text-black h-2 w-full left-0 top-full"
        x="0px"
        y="0px"
        viewBox="0 0 255 255"
        xml:space="preserve"
      >
        <polygon class="fill-current" points="0,0 127.5,127.5 255,0" />
      </svg> -->
    </div>
  `;

class UtilityBar extends Component {
  constructor() {
    super();
    this.state = {
      editingBackgroundPosition: false,
      editingGridDrag: false,
      selected: "",
      tooltip: "",
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
      class="absolute top-0 left-0 right-0 flex items-center justify-center"
    >
      <div
        id="utility-bar"
        class="flex items-center justify-center gap-2 max-w-sm h-10 bg-black bg-opacity-75 shadow p-2 rounded-md"
        onClick="${gainFocus}"
      >
        <div class="absolute top-11 ${!this.state.tooltip && "hidden"}">
          <${ToolTip} text="${this.state.tooltip}" />
        </div>
        <div class="flex items-justify">
          <button
            id="backgrounds-button"
            onClick="${() => {
              gainFocus();
              openBackgrounds();
            }}"
            onMouseEnter=${() => {
              this.setState({ tooltip: "Choose background" });
            }}
            onMouseLeave=${() => {
              this.setState({ tooltip: "" });
            }}
          >
            <${SVGImage} selected=${this.state.selected === "bg-select"} />
          </button>
        </div>
        <div class="flex items-justify">
          <button
            id="enable-grid-resize-button"
            onClick=${() => {
              this.toggleGridDragEditing();
              gainFocus();
            }}
            onMouseEnter=${() => {
              this.setState({ tooltip: "Adjust grid" });
            }}
            onMouseLeave=${() => {
              this.setState({ tooltip: "" });
            }}
          >
            <${SVGDragout} selected=${this.state.selected === "grid-drag"} />
          </button>
        </div>
        <div class="flex items-justify">
          <button
            id="enable-offset-map-button"
            onClick="${() => {
              this.toggleBackgroundPositionEditing();
              gainFocus();
            }}"
            onMouseEnter=${() => {
              this.setState({ tooltip: "Adjust background offset" });
            }}
            onMouseLeave=${() => {
              this.setState({ tooltip: "" });
            }}
          >
            <${SVGController}
              selected=${this.state.selected === "bg-position-drag"}
            />
          </button>
        </div>
        <!-- <div class="flex items-justify">
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
        <div class="flex items-justify">
          <button
            id="OTFBM-info-button"
            onClick="${() => {
              gainFocus();
              openOTFBMInfo();
            }}"
            onMouseEnter=${() => {
              this.setState({ tooltip: "Export map" });
            }}
            onMouseLeave=${() => {
              this.setState({ tooltip: "" });
            }}
          >
            <${SVGDownload} selected=${this.state.selected === "download"} />
          </button>
        </div>
        <div class="flex items-justify">
          <button
            id="settings-button"
            onClick="${() => {
              gainFocus();
              openSettings();
            }}"
            onMouseEnter=${() => {
              this.setState({ tooltip: "Adjust settings" });
            }}
            onMouseLeave=${() => {
              this.setState({ tooltip: "" });
            }}
          >
            <${SVGOptions} selected=${this.state.selected === "settings"} />
          </button>
        </div>
      </div>
    </div>`;
  }
}
export default UtilityBar;
