import { h, Component } from "preact";
import htm from "htm";
import SideBar from "./side-bar.js";
import Modal from "./modal.js";
import SettingsForm from "./settings-form.js";
import BackgroundsForm from "./backgrounds-form.js";

const html = htm.bind(h);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectedToken: null,
      showBackgrounds: false,
      settings: props.worldState.settings,
      showSettings: false,
      modalTitle: "",
    };

    let dragging = false;
    let dragTarget = null;
    let srcElement = null;
    document.addEventListener("pointerdown", (e) => {
      if (e.target.classList.contains("token")) {
        dragging = true;
        srcElement = e.target;
        srcElement.classList.add("opacity-70");

        dragTarget = e.target.cloneNode();
        document.body.appendChild(dragTarget);
        dragTarget.classList.add("fixed");
        dragTarget.classList.add("w-16");
        dragTarget.classList.add("h-16");
      }
    });
    document.addEventListener("pointermove", (e) => {
      if (dragging && dragTarget) {
        dragTarget.style.left = e.clientX - 25 + "px";
        dragTarget.style.top = e.clientY - 25 + "px";
      }
    });
    document.addEventListener("pointerup", (e) => {
      if (dragging && dragTarget) {
        document.body.removeChild(dragTarget);
        dragging = false;
        dragTarget = null;
        srcElement.classList.remove("opacity-70");
        srcElement = null;
        if (this.state.selectedToken) {
          props.dropToken({
            x: e.clientX,
            y: e.clientY,
            src: this.state.selectedToken,
          });
        }
      }
    });
  }

  selectBackground(background) {
    this.props.worldState.background = { src: background };
    this.setState({ show: false });
  }

  componentDidMount() {
    this.props.worldState.on("state:settings:update", (settings) => {
      this.setState({ settings });
    });
  }

  componentWillUnmount() {
    this.props.worldState.off("state:settings:update");
  }

  render(props, state) {
    return html`
      <${SideBar}
        tokens="${props.assets.tokens}"
        selectToken="${(token) => {
          this.setState({ selectedToken: token });
        }}"
        openSettings="${() =>
          this.setState({
            show: true,
            showBackgrounds: false,
            showSettings: true,
            modalTitle: "Settings",
          })}"
        openBackgrounds="${() =>
          this.setState({
            show: true,
            showBackgrounds: true,
            showSettings: false,
            modalTitle: "Backgrounds",
          })}"
      ><//>
      <${Modal}
        title=${state.modalTitle}
        show=${state.show}
        close=${() => this.setState({ show: false })}
      >
        ${state.showSettings
          ? html`<${SettingsForm}
              submit="${(settings) => (props.worldState.settings = settings)}"
              initialSettings="${state.settings}"
            ><//>`
          : html``}
        ${state.showBackgrounds
          ? html`<${BackgroundsForm}
              select="${this.selectBackground.bind(this)}"
              backgrounds="${props.assets.backgrounds}"
            ><//>`
          : html``}
      <//>
    `;
  }
}
export default App;
