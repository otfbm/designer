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
      backgrounds: [],
      userTokens: [],
    };
    this.dragDrop = new DragDrop(this.tokenDrop.bind(this));
  }

  tokenDrop({ x, y, src }) {
    this.props.dropToken({
      x,
      y,
      src,
    });
  }

  addNewBackground(background) {
    this.props.worldState.addBackground(background);
  }

  selectBackground(background) {
    this.props.worldState.background = background;
    this.setState({ show: false });
  }

  deleteToken(token) {
    this.props.worldState.tokens.remove(token);
  }

  updateToken(id, key, value) {
    this.props.worldState.tokens.update({ id, [key]: value });
  }

  componentDidMount() {
    this.props.worldState.on(
      "state:load",
      ({ settings, backgrounds, userTokens }) => {
        this.setState({ backgrounds, userTokens, settings });
      }
    );
    this.props.worldState.on("state:backgrounds:update", (backgrounds) => {
      this.setState({ backgrounds });
    });
    this.props.worldState.on("state:userTokens:update", (userTokens) => {
      this.setState({ userTokens });
    });
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
    this.props.worldState.off("state:load");
    this.props.worldState.off("state:backgrounds:update");
    this.props.worldState.off("state:userTokens:update");
    this.props.worldState.off("state:settings:update");
    this.props.worldState.off("state:tokens:select");
    this.props.worldState.off("state:tokens:deselect");
    this.dragDrop.disable();
  }

  closeModal() {
    this.setState({ show: false });
  }

  render(props, state) {
    const { selectedToken = {}, userTokens } = this.state;
    return html`
      <${SideBar}
        tokens="${userTokens}"
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
        gainFocus="${() => this.setState({ showTokenMenu: false })}"
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
              newBackground="${this.addNewBackground.bind(this)}"
              select="${this.selectBackground.bind(this)}"
              backgrounds="${this.state.backgrounds}"
              close=${this.closeModal.bind(this)}
            ><//>`
          : html``}
      <//>
      <${TokenMenu}
        show=${this.state.showTokenMenu}
        token=${selectedToken}
        change=${(id, key, value) => this.updateToken(id, key, value)}
        delete=${() => this.deleteToken(selectedToken)}
      ><//>
    `;
  }
}
export default App;
