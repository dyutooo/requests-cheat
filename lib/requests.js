const setProxy = require("./proxy");
const axios = require("axios");
const Cookie = require("./cookie");
const { getDomain, sleep } = require("./utils");
const { TIME_OUT, HEADERS_DEFAULT } = require("../config/config");

const requests = {
  getCookie: (name, domain) => {
    var cookie = Cookie.getCookie(name, domain);
    return cookie;
  },
  setCookie: (name, value, domain) => {
    Cookie.setCookie(name, value, domain);
  },
  GET: async (url, headers, proxie = null) => {
    if (proxie) {
      var dataHttpAgent = setProxy(proxie);
    } else {
      var dataHttpAgent = {};
    }
    const domain = getDomain(url);
    if (headers.cookie) {
      var cookie = headers.cookie;
    } else {
      var cookie = Cookie.getCookieDomain(domain);
    }
    return await axios({
      method: "GET",
      url: url,
      headers: {
        ...HEADERS_DEFAULT,
        ...headers,
        cookie: cookie ? cookie : "",
      },
      timeout: TIME_OUT,
      ...dataHttpAgent,
    })
      .then(function (res) {
        Cookie.setCookieResponse(res);
        return res;
      })
      .catch(async function (error) {
        if (error.code == "ENOTFOUND") {
          console.error("GET =>", error);
          return;
        }
        console.error("ERROR GET ", error.code, url);
        await sleep(2);
        return await requests.GET(url, headers);
      });
  },
  POST: async (url, headers = {}, data = {}, proxie = null) => {
    if (proxie) {
      var dataHttpAgent = setProxy(proxie);
    } else {
      var dataHttpAgent = {};
    }
    const domain = getDomain(url);
    if (headers.cookie) {
      var cookie = headers.cookie;
    } else {
      var cookie = Cookie.getCookieDomain(domain);
    }
    return await axios({
      method: "POST",
      url: url,
      headers: {
        ...HEADERS_DEFAULT,
        ...headers,
        cookie: cookie ? cookie : "",
      },
      data: data,
      timeout: TIME_OUT,
      ...dataHttpAgent,
    })
      .then(function (res) {
        Cookie.setCookieResponse(res);
        return res;
      })
      .catch(async function (error) {
        if (error.code == "ENOTFOUND") {
          console.error("POST => ", error);
          return;
        }
        console.error("ERROR POST ", error.code, url);
        await sleep(2);
        return await requests.POST(url, headers, data, proxie);
      });
  },
  PUT: async (url, headers = {}, data = {}, proxie = null) => {
    if (proxie) {
      var dataHttpAgent = setProxy(proxie);
    } else {
      var dataHttpAgent = {};
    }
    const domain = getDomain(url);
    if (headers.cookie) {
      var cookie = headers.cookie;
    } else {
      var cookie = Cookie.getCookieDomain(domain);
    }
    return await axios({
      method: "PUT",
      url: url,
      headers: {
        ...HEADERS_DEFAULT,
        ...headers,
        cookie: cookie ? cookie : "",
      },
      data: data,
      timeout: TIME_OUT,
      ...dataHttpAgent,
    })
      .then(function (res) {
        Cookie.setCookieResponse(res);
        return res;
      })
      .catch(async function (error) {
        if (error.code == "ENOTFOUND") {
          console.error("PUT => ", error);
          return;
        }
        console.error("ERROR PUT ", error.code, url);
        await sleep(2);
        return await requests.PUT(url, headers, data, proxie);
      });
  },
};

module.exports = requests;
