const setProxy = require("./proxy");
const axios = require("axios");
const Cookie = require("./cookie");
const { getDomain } = require("./utils");
const { TIME_OUT, HEADERS_DEFAULT } = require("../config/config");

const requests = {
  GET: async (url, headers, proxie = null) => {
    if (proxie) {
      var dataHttpAgent = setProxy(proxie);
    } else {
      var dataHttpAgent = {};
    }
    const domain = getDomain(url);
    const cookie = Cookie.getCookie(domain);
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
        Cookie.setCookie(res);
        return res.data;
      })
      .catch(async function (error) {
        if (error.code == "ENOTFOUND") {
          console.error("GET =>", error);
          return;
        }
        console.error("ERROR GET ", error.code, url);
        await sleep(2);
        return await GET(url, headers);
      });
  },
  POST: async (url, headers = {}, data = {}, proxie = null) => {
    if (proxie) {
      var dataHttpAgent = setProxy(proxie);
    } else {
      var dataHttpAgent = {};
    }
    const domain = getDomain(url);
    const cookie = Cookie.getCookie(domain);
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
        Cookie.setCookie(res);
        return res.data;
      })
      .catch(async function (error) {
        if (error.code == "ENOTFOUND") {
          console.error("POST => ", error);
          return;
        }
        console.error("ERROR POST ", error.code, url);
        await sleep(2);
        return await POST(url, headers, data, proxie);
      });
  },
  PUT: async (url, headers = {}, data = {}, proxie = null) => {
    if (proxie) {
      var dataHttpAgent = setProxy(proxie);
    } else {
      var dataHttpAgent = {};
    }
    const domain = getDomain(url);
    const cookie = Cookie.getCookie(domain);
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
        Cookie.setCookie(res);
        return res.data;
      })
      .catch(async function (error) {
        if (error.code == "ENOTFOUND") {
          console.error("PUT => ", error);
          return;
        }
        console.error("ERROR PUT ", error.code, url);
        await sleep(2);
        return await PUT(url, headers, data, proxie);
      });
  },
};

module.exports = requests;
