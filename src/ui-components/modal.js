import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

const Modal = ({ show, children }) =>
  show
    ? html`
        <div
          class="flex items-center justify-center fixed left-0 top-0 w-full h-full bg-gray-800 bg-opacity-75"
        >
          <div
            class="flex flex-col bg-white rounded-lg md:w-1/2 md:w-1/2 h-3/4 overflow-hidden"
          >
            ${children}
          </div>
        </div>
      `
    : html``;

export default Modal;
