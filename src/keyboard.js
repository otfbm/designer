export default function keyboard(value) {
  let key = {};
  key.value = value;
  key.isDown = false;
  key.isUp = true;
  key.press = undefined;
  key.release = undefined;
  //The `downHandler`
  key.downHandler = (event) => {
    if (event.key === key.value) {
      if (key.isUp && key.press) key.press();
      key.isDown = true;
      key.isUp = false;
    }
  };

  //The `upHandler`
  key.upHandler = (event) => {
    if (event.key === key.value) {
      if (key.isDown && key.release) key.release();
      key.isDown = false;
      key.isUp = true;
    }
  };

  //Attach event listeners
  const downListener = key.downHandler.bind(key);
  const upListener = key.upHandler.bind(key);

  window.addEventListener("load", () => {
    document.querySelector("#canvas canvas").tabIndex = -1;
    document
      .querySelector("#canvas canvas")
      .addEventListener("keydown", downListener, false);
    document
      .querySelector("#canvas canvas")
      .addEventListener("keyup", upListener, false);

    // Detach event listeners
    key.unsubscribe = () => {
      document
        .querySelector("#canvas canvas")
        .removeEventListener("keydown", downListener);
      document
        .querySelector("#canvas canvas")
        .removeEventListener("keyup", upListener);
    };
  });

  return key;
}
