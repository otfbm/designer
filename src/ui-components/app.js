import { h, Component } from "preact";
import htm from "htm";
import SideBar from "./side-bar.js";
import Modal from "./modal.js";
import TokenMenu from "./token-menu.js";
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

  adjustToken(id, key, value) {
    this.props.worldState.tokens.update({ id, [key]: value });
  }

  componentDidMount() {
    this.props.worldState.on("state:settings:update", (settings) => {
      this.setState({ settings });
    });
    this.props.worldState.on("state:tokens:select", (token) => {
      this.setState({ selectedToken: token, showTokenMenu: true });
    });
    this.props.worldState.on("state:tokens:deselect", () => {
      this.setState({ selectedToken: null, showTokenMenu: false });
    });
    this.dragDrop.enable();
  }

  componentWillUnmount() {
    this.props.worldState.off("state:settings:update");
    this.props.worldState.off("state:tokens:select");
    this.props.worldState.off("state:tokens:deselect");
    this.dragDrop.disable();
  }

  closeModal() {
    this.setState({ show: false });
  }

  render(props, state) {
    const { selectedToken } = this.state;
    const { id, label, size, rotation } = selectedToken || {};
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
      <${TokenMenu}
        show=${this.state.showTokenMenu}
        tokenId="${id}"
        label="${label}"
        size="${size}"
        rotation="${rotation}"
        change=${(id, key, value) => this.adjustToken(id, key, value)}
      ><//>
    `;
  }
}
export default App;
