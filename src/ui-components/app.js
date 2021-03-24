import { h, Component } from "preact";
import htm from "htm";
import SideBar from "./side-bar.js";
import Modal from "./modal.js";
import SettingsForm from "./settings-form.js";
import BackgroundsForm from "./backgrounds-form.js";
import DragDrop from "../drag-drop.js";

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
    this.dragDrop = new DragDrop(this.tokenDrop.bind(this));
  }

  tokenDrop({ x, y }) {
    if (this.state.selectedToken) {
      this.props.dropToken({
        x,
        y,
        src: this.state.selectedToken,
      });
    }
  }

  selectBackground(background) {
    this.props.worldState.background = { src: background };
    this.setState({ show: false });
  }

  componentDidMount() {
    this.props.worldState.on("state:settings:update", (settings) => {
      this.setState({ settings });
    });
    this.dragDrop.enable();
  }

  componentWillUnmount() {
    this.props.worldState.off("state:settings:update");
    this.dragDrop.disable();
  }

  callToAction() {}

  closeModal() {
    this.setState({ show: false });
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
      <${Modal} show=${state.show}>
        ${state.showSettings
          ? html`<${SettingsForm}
              submit="${(settings) => (props.worldState.settings = settings)}"
              initialSettings="${state.settings}"
              close=${this.closeModal.bind(this)}
            ><//>`
          : html``}
        ${state.showBackgrounds
          ? html`<${BackgroundsForm}
              select="${this.selectBackground.bind(this)}"
              backgrounds="${props.assets.backgrounds}"
              close=${this.closeModal.bind(this)}
            ><//>`
          : html``}
      <//>
    `;
  }
}
export default App;
