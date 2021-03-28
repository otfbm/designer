const STATIC_CACHE = "eldritch-atlas-static-v28";
const IMAGES_CACHE = "eldritch-atlas-images-v28";
const ALL_CACHES = [STATIC_CACHE, IMAGES_CACHE];

self.addEventListener("install", function (event) {
  event.waitUntil(
    caches.open(STATIC_CACHE).then(function (cache) {
      return cache.addAll([
        "/index.html",
        "/scripts.js",
        "/settings.png",
        "/picture.png",
        "/add.png",
        "https://unpkg.com/tailwindcss@%5E2/dist/tailwind.min.css",
        "https://unpkg.com/tailwindcss@2.0.4/dist/tailwind.min.css",
        "/blank.jpg",
      ]);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function (cacheName) {
            return (
              cacheName.startsWith("eldritch-atlas-") &&
              !ALL_CACHES.includes(cacheName)
            );
          })
          .map(function (cacheName) {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("fetch", function (event) {
  const requestUrl = new URL(event.request.url);

  if (requestUrl.origin === location.origin) {
    if (requestUrl.pathname === "/") {
      event.respondWith(caches.match("/index.html"));
      return;
    }
    if (requestUrl.pathname.startsWith("/backgrounds/")) {
      event.respondWith(serveBackgrounds(event.request));
      return;
    }
    if (requestUrl.pathname.startsWith("/tokens/")) {
      event.respondWith(serveTokens(event.request));
      return;
    }
    // TODO: respond to avatar urls by responding with
    // the return value of serveAvatar(event.request)
  }

  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

// function serveAvatar(request) {
// Avatar urls look like:
// avatars/sam-2x.jpg
// But storageUrl has the -2x.jpg bit missing.
// Use this url to store & match the image in the cache.
// This means you only store one copy of each avatar.
// const storageUrl = request.url.replace(/-\dx\.jpg$/, "");

// TODO: return images from the "wittr-content-imgs" cache
// if they're in there. But afterwards, go to the network
// to update the entry in the cache.
//
// Note that this is slightly different to servePhoto!
// }

function serveBackgrounds(request) {
  // const storageUrl = request.url.replace(/-\d+px\.jpg$/, "");

  return caches.open(IMAGES_CACHE).then(function (cache) {
    return cache.match(request.url).then(function (response) {
      if (response) return response;

      return fetch(request).then(function (networkResponse) {
        cache.put(request.url, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}

function serveTokens(request) {
  // const storageUrl = request.url.replace(/-\d+px\.jpg$/, "");

  return caches.open(IMAGES_CACHE).then(function (cache) {
    return cache.match(request.url).then(function (response) {
      if (response) return response;

      return fetch(request).then(function (networkResponse) {
        cache.put(request.url, networkResponse.clone());
        return networkResponse;
      });
    });
  });
}

// self.addEventListener("message", function (event) {
//   if (event.data.action === "skipWaiting") {
//     self.skipWaiting();
//   }
// });

self.addEventListener("message", function (event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
