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
      showBackgrounds: false,
      settings: props.worldState.settings,
      showSettings: false,
      modalTitle: "",
    };
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
    const { dropToken } = props;
    return html`
      <${SideBar}
        tokens="${props.assets.tokens}"
        dropToken="${dropToken}"
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
