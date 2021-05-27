import { h, Component } from "preact";
import htm from "htm";
import ModalHeader from "./modal-header.js";

const html = htm.bind(h);

function buildURL(settings, background) {
  const {
    width,
    height,
    cellsize,
    backgroundOffsetX,
    backgroundOffsetY,
  } = settings;
  const segments = [];
  if (width && height) segments.push(`${width}x${height}`);

  const options = [];
  if (cellsize) options.push(`c${cellsize}`);
  if (
    backgroundOffsetX &&
    backgroundOffsetX !== 0 &&
    backgroundOffsetY &&
    backgroundOffsetY !== 0
  ) {
    options.push(
      `o${settings.backgroundOffsetX * -1}:${settings.backgroundOffsetY * -1}`
    );
  }
  segments.push(`@${options.join("")}`);

  const url = new URL(segments.join("/"), "https://otfbm.io");

  if (background.src) url.search = `?bg=${background.src}`;

  return url.href;
}

function buildJSON(settings, background) {
  const {
    width,
    height,
    cellsize,
    backgroundOffsetX,
    backgroundOffsetY,
  } = settings;
  const config = {};

  const options = [];
  if (cellsize) options.push(`c${cellsize}`);
  if (
    backgroundOffsetX &&
    backgroundOffsetX !== 0 &&
    backgroundOffsetY &&
    backgroundOffsetY !== 0
  ) {
    options.push(
      `o${settings.backgroundOffsetX * -1}:${settings.backgroundOffsetY * -1}`
    );
  }
  config.options = `@${options.join("")}`;

  if (width && height) config.view = `${width}x${height}`;

  if (background.src) config.background = background.src;

  return JSON.stringify(config, null, 2);
}

class OTFBMInfo extends Component {
  copyToClipboard() {
    const field = document.querySelector("#otfbm-url");
    field.focus();
    field.select();
    document.execCommand("copy");
  }

  copyJSONToClipboard() {
    const field = document.querySelector("#otfbm-json-config");
    field.focus();
    field.select();
    document.execCommand("copy");
  }

  render(props) {
    const url = buildURL(props.settings, props.background);
    const json = buildJSON(props.settings, props.background);

    return html`<${ModalHeader} close=${props.close}>OTFBM Details<//>
      <div class="p-8 overflow-auto h-full">
        <div class="h-full">
          <div class="flex items-center h-full w-full bg-teal-lighter">
            <div class="w-full h-full">
              <form class="mb-4 h-full">
                <div class="flex flex-col mb-4 h-full">
                  <div class="flex flex-col mb-3">
                    <label
                      class="mb-2 uppercase font-bold text-sm text-grey-darkest"
                      for="otfbm-url"
                      >OTFBM URL</label
                    >
                    <div class="flex flex-row">
                      <input
                        class="border py-2 px-3 text-grey-darkest w-3/4"
                        name="otfbm-url"
                        id="otfbm-url"
                        type="text"
                        value=${url}
                      />
                      <div class="flex flex-col ml-2">
                        <a
                          class="text-blue-700 underline cursor-pointer"
                          onClick=${() => this.copyToClipboard()}
                          >Copy</a
                        >
                        <a
                          href=${url}
                          target="_blank"
                          class="text-blue-700 underline"
                          >Open</a
                        >
                      </div>
                    </div>
                  </div>
                  <div class="flex flex-col mb-3 h-full">
                    <label
                      class="mb-2 uppercase font-bold text-sm text-grey-darkest"
                      for="otfbm-json-config"
                      >OTFBM JSON Config</label
                    >
                    <div class="flex flex-row h-full">
                      <textarea
                        id="otfbm-json-config"
                        name="otfbm-json-config"
                        class="border py-2 px-3 text-grey-darkest w-3/4 h-full"
                      >
                      ${json}
                    </textarea
                      >
                      <div class="flex flex-col ml-2 h-full">
                        <a
                          class="text-blue-700 underline cursor-pointer"
                          onClick=${() => this.copyJSONToClipboard()}
                          >Copy</a
                        >
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>`;
  }
}

export default OTFBMInfo;