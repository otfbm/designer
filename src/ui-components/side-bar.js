import { h, Component } from "preact";
import htm from "htm";
import Token from "./token.js";

const html = htm.bind(h);

class SideBar extends Component {
  constructor() {
    super();
  }

  render({ tokens, dropToken, openSettings, openBackgrounds }) {
    return html`<div
      id="sidebar"
      class="absolute inset-y-0 right-0 w-16 bg-white bg-opacity-50 shadow p-1"
    >
      <button id="settings-button" onClick="${() => openSettings()}">
        <img src="/public/settings.png" />
      </button>
      <button id="backgrounds-button" onClick="${() => openBackgrounds()}">
        <img src="/public/picture.png" />
      </button>
      <div id="token-container">
        <ul>
          ${tokens.map(
            (token) => html`<${Token} src="${token}" copy="${dropToken}"><//>`
          )}
        </ul>
        <button id="new-token">
          <img src="/public/add.png" />
        </button>
      </div>
    </div>`;
  }
}
export default SideBar;
