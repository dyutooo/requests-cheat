const cookieImport = require("cookie");
const Storage = require("../storage");
const { getDomain } = require("../utils");

const Cookie = {
  setCookieResponse: (response) => {
    const newCookies = response.headers["set-cookie"];
    const host = response.request.socket._host;
    const domain = getDomain(host);
    if (!newCookies) return;
    for (let i = 0; i < newCookies.length; i++) {
      const cookieParde = cookieImport.parse(newCookies[i]);
      const key = Object.keys(cookieParde)[0];
      Storage.set(domain, key, cookieParde);
    }
  },
  setCookie: (name, value, domain) => {
    Storage.set(domain, name, value);
  },
  getCookieDomain: (domain) => {
    const cookie = Storage.getAllCookieOnDomain(domain);
    return cookie;
  },
  getCookie: (name, domain) => {
    const cookie = Storage.get(domain, name);
    return cookie;
  },
};

module.exports = Cookie;
