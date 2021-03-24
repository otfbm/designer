import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

const ModalHeader = ({ children, close }) =>
  html`
    <div class="flex items-center p-8">
      <div class="text-gray-900 font-medium text-lg">${children}</div>
      <svg
        onClick="${close}"
        class="ml-auto fill-current text-gray-700 w-6 h-6 cursor-pointer"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 18 18"
      >
        <path
          d="M14.53 4.53l-1.06-1.06L9 7.94 4.53 3.47 3.47 4.53 7.94 9l-4.47 4.47 1.06 1.06L9 10.06l4.47 4.47 1.06-1.06L10.06 9z"
        />
      </svg>
    </div>
    <hr />
  `;

export default ModalHeader;
