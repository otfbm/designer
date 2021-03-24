import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

const ModalFooter = ({ close, action, children }) =>
  html`
    <hr />
    <div class="flex items-center p-8">
      <button
        class="ml-auto background-transparent px-4 py-2 outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
        onClick="${close}"
      >
        close
      </button>
      <button
        type="submit"
        onClick="${action}"
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        ${children || "Save"}
      </button>
    </div>
  `;

export default ModalFooter;
