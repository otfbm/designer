export default class ServiceWorkerManager {
  static registerServiceWorker() {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker.register("/sw.js").then((reg) => {
          if (reg.waiting) {
            let notification = document.getElementById("notification");
            notification.classList.remove("hidden");

            notification.addEventListener("click", () => {
              reg.waiting.postMessage({ action: "skipWaiting" });
              window.location.reload();
            });
          }
          reg.addEventListener("updatefound", () => {
            console.log("update found");
            // An updated service worker has appeared in reg.installing!
            const newWorker = reg.installing;
            newWorker.addEventListener("statechange", () => {
              // Has service worker state changed?
              switch (newWorker.state) {
                case "installed":
                  // There is a new service worker available, show the notification
                  if (navigator.serviceWorker.controller) {
                    let notification = document.getElementById("notification");
                    notification.classList.remove("hidden");

                    notification.addEventListener("click", () => {
                      newWorker.postMessage({ action: "skipWaiting" });
                      window.location.reload();
                    });
                  }
                  break;
              }
            });
          });
        });
      });
    }
  }
}
