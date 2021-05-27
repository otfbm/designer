import { h, render } from "preact";
import htm from "htm";
import TableTop from "./table-top.js";
import App from "./ui-components/app.js";
import New from "./ui-components/new.js";
import State from "./state/state.js";
// import ServiceWorkerManager from "./service-worker-manager.js";

const html = htm.bind(h);

const main = async () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  if (!id || !/^[a-z0-9]{6}$/.test(id)) {
    render(html`<${New} />`, document.getElementById("app"));
    return;
  }

  const state = new State(id);
  const tabletop = new TableTop({ state });

  // ServiceWorkerManager.registerServiceWorker();

  render(
    html`<${App}
      worldState="${state}"
      dropToken="${tabletop.createTokenAtCoords.bind(tabletop)}"
    />`,
    document.getElementById("app")
  );

  await tabletop.run();
  await state.load();
};

main().catch((err) => {
  console.error(err);
});
