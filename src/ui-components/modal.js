import { h } from "preact";
import htm from "htm";

const html = htm.bind(h);

const Modal = ({ title = "", show, close, children }) =>
  show
    ? html`
        <div
          class="flex items-center justify-center fixed left-0 top-0 w-full h-full bg-gray-800 bg-opacity-75"
        >
          <div
            class="flex flex-col bg-white rounded-lg md:w-1/2 md:w-1/2 h-3/4 overflow-hidden"
          >
            <div class="flex items-center p-8">
              <div class="text-gray-900 font-medium text-lg">${title}</div>
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
            <div class="p-8 overflow-auto">
              <div class="">${children}</div>
            </div>
          </div>
        </div>
      `
    : html``;

export default Modal;
