import { h, Component } from "preact";
import htm from "htm";
import SideBar from "./side-bar.js";
import UtilityBar from "./utility-bar.js";
import Modal from "./modal.js";
import TokenMenu from "./token-menu.js";
import SettingsForm from "./settings-form.js";
import BackgroundsForm from "./backgrounds-form.js";
import OTFBMInfo from "./otfbm-info.js";
import DragDrop from "../drag-drop.js";

const html = htm.bind(h);

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      selectedToken: null,
      selectedBackground: null,
      showBackgrounds: false,
      showOTFBMInfo: false,
      settings: props.worldState.settings,
      showSettings: false,
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
    this.setState({ show: false, selectBackground: background });
  }

  deleteBackground(background) {
    this.props.worldState.deleteBackground(background);
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
      ({ settings, backgrounds, userTokens, background }) => {
        this.setState({
          backgrounds,
          userTokens,
          settings,
          selectedBackground: background,
        });
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
    this.props.worldState.on("state:background:update", (background) => {
      this.setState({ selectedBackground: background });
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
    this.props.worldState.off("state:background:update");
    this.dragDrop.disable();
  }

  closeModal() {
    this.setState({ show: false });
  }

  render(props, state) {
    const { selectedToken = {}, userTokens, selectedBackground } = this.state;
    return html`
      <div class="absolute top-2 w-full grid justify-items-center">
        <${UtilityBar}
          offsetEditingToggled="${(state) => {
            this.props.worldState.enableMapOffsetEditing(state);
          }}"
          gridEditingToggled="${(state) => {
            this.props.worldState.enableMapGridEditing(state);
          }}"
          resetOffset="${() => {
            this.props.worldState.resetMapOffset();
          }}"
          gainFocus="${() => this.setState({ showTokenMenu: false })}"
          openSettings="${() =>
            this.setState({
              show: true,
              showBackgrounds: false,
              showOTFBMInfo: false,
              showSettings: true,
            })}"
          openBackgrounds="${() =>
            this.setState({
              show: true,
              showBackgrounds: true,
              showOTFBMInfo: false,
              showSettings: false,
            })}"
          openOTFBMInfo="${() =>
            this.setState({
              show: true,
              showBackgrounds: false,
              showOTFBMInfo: true,
              showSettings: false,
            })}"
        ><//>
      </div>
      <!-- <${SideBar}
        tokens="${userTokens}"
        openSettings="${() =>
        this.setState({
          show: true,
          showBackgrounds: false,
          showOTFBMInfo: false,
          showSettings: true,
        })}"
        openBackgrounds="${() =>
        this.setState({
          show: true,
          showBackgrounds: true,
          showOTFBMInfo: false,
          showSettings: false,
        })}"
        openOTFBMInfo="${() =>
        this.setState({
          show: true,
          showBackgrounds: false,
          showOTFBMInfo: true,
          showSettings: false,
        })}"
        gainFocus="${() => this.setState({ showTokenMenu: false })}"
      ><//> -->
      <${Modal} show=${state.show} close=${this.closeModal.bind(this)}>
        ${state.showOTFBMInfo
          ? html`<${OTFBMInfo}
              settings="${state.settings}"
              background="${selectedBackground}"
              close=${this.closeModal.bind(this)}
            ><//>`
          : html``}
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
              delete="${this.deleteBackground.bind(this)}"
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
