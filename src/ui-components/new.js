import { h } from "preact";
import { useEffect, useState } from "preact/hooks";
import htm from "htm";
import IndexDBAdapter from "../state/adapters/index-db.js";

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
    <div class="bg-black absolute inset-0 flex justify-center items-center">
      <div class="text-white">
        <button
          onClick=${() => createNewMap(boards)}
          class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
        >
          Create a Map
        </button>
      </div>
    </div>
  `;
};
