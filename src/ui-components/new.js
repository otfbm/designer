import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import htm from "htm";
import IndexDBAdapter from "../state/adapters/index-db.js";
import Logo from "./svg-components/logo";

const html = htm.bind(h);
const idb = new IndexDBAdapter(`eldritch-atlas`, 1);

const createNewMap = (boards) => {
  let newId = 100000;
  if (boards.length) {
    const latestId = boards.sort()[boards.length - 1];
    newId = parseInt(latestId, 10);
    newId = newId + 1;
  }
  window.location.search = `id=${newId}`;
};

export default () => {
  const [boards, setBoards] = useState([]);
  useEffect(async () => {
    const bs = await idb.getAllByIndex("maps", "boardId");
    setBoards(bs.map((b) => b.boardId));
  }, []);
  return html`
    <div class="bg-black absolute inset-0 bg-grid bg-center">
      <div class="justify-center grid content-center h-5/6 gap-12">
        <${Logo} />
        <div class="grid justify-center">
          <div class="text-white grid grid-flow-col gap-4">
            <button
              onClick=${() => createNewMap(boards)}
              class="rounded-full bg-primary px-6 py-2"
            >
              Create Map
            </button>
            <!-- <button class="rounded-full border-primary border-2 px-6 py-2">
              Load Map
            </button> -->
          </div>
        </div>
      </div>
      <div class="text-white text-center h-1/6 grid content-center">Alpha</div>
    </div>
  `;
};
