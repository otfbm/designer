import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

const click = (e, close) => {
  if (e.target.id === "modal-overlay") close();
  e.stopPropagation();
  return false;
};

const Modal = ({ show, close, children }) => {
  if (!show) return html``;
  return html`
    <div
      onClick=${(e) => click(e, close)}
      id="modal-overlay"
      class="flex items-center justify-center fixed left-0 top-0 w-full h-full bg-gray-800 bg-opacity-75"
    >
      <div
        class="flex flex-col bg-white rounded-lg md:w-1/2 h-3/4 overflow-hidden"
      >
        ${children}
      </div>
    </div>
  `;
};

export default Modal;
