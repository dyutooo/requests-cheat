const setProxy = require("./proxy");
const axios = require("axios");
const Cookie = require("./cookie");
const { getDomain } = require("./utils");

// process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
const TIME_OUT = 10000; //time out = 10s
const HEADERS_DEFAULT = {
  accept: "*/*",
  "accept-encoding": "gzip, deflate",
  "user-agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36",
};

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
