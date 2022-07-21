const cookieImport = require("cookie");
const Storage = require("../storage");
const { getDomain } = require("../utils");

const Cookie = {
  setCookie: (response) => {
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
  getCookie: (domain) => {
    const cookie = Storage.getAllCookieOnDomain(domain);
    return cookie;
  },
};

module.exports = Cookie;
