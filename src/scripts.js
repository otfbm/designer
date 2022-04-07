import { h, render } from "preact";
import htm from "htm";
import TableTop from "./table-top.js";
import App from "./ui-components/app.js";
import New from "./ui-components/new.js";
import Login from "./ui-components/login.js";
import State from "./state/state.js";
import { checkCookie, verifyLogin, setCookie } from "./utils";
// import ServiceWorkerManager from "./service-worker-manager.js";

const html = htm.bind(h);

const main = async () => {
  const url = new URL(window.location.href);
  const id = url.searchParams.get("id");
  const code = url.searchParams.get("code");

  if (code) {
    const { access, user } = await verifyLogin(code);
    if (access) {
      setCookie("user", user, 30);
      url.searchParams.delete("code");
      url.searchParams.delete("state");
      window.location.href = url.href;
    }
  }

  if (!checkCookie()) {
    render(html`<${Login} />`, document.getElementById("app"));
    return;
  }

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
