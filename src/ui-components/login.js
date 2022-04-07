import { h } from "preact";
import htm from "htm";
import Logo from "./svg-components/logo";
import { login } from "../utils";

const html = htm.bind(h);

export default () => {
  return html`
    <div class="bg-black absolute inset-0 bg-grid bg-center">
      <div class="justify-center grid content-center h-5/6 gap-12">
        <${Logo} />
        <div class="text-white text-center">
          All Patreon backers get free access to the designer so please consider
          <br />
          <a class="text-blue-600" href="https://www.patreon.com/otfbm">
            backing us on Patreon
          </a>
        </div>
        <div class="grid justify-center">
          <div class="text-white grid grid-flow-col gap-4">
            <button
              onClick=${() => login()}
              class="rounded-full bg-primary px-6 py-2"
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div class="text-white text-center h-1/6 grid content-center">Alpha</div>
    </div>
  `;
};
