export function checkCookie() {
  let user = getCookie("user");
  if (user != "") {
    return true;
  } else {
    return false;
  }
}

export function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function login() {
  const redirect = window.location.origin;
  window.location.href = `//www.patreon.com/oauth2/authorize?response_type=code&client_id=mhlV0ooTagTjZmRkKYCacQ9zrZCR-g7aXAPgcjfIQnwKuCqeNd82z44rLf9YafHi&redirect_uri=${redirect}`;
}

export async function verifyLogin(code) {
  const url = new URL(
    `https://1ayie51vq1.execute-api.us-west-2.amazonaws.com/patreon/login/${code}`
  );
  const result = await fetch(url);
  return await result.json();
}
