const setProxy = require("./proxy");
const axios = require("axios");
const Cookie = require("./cookie");
const { getDomain, sleep } = require("./utils");
const { TIME_OUT, HEADERS_DEFAULT } = require("../config/config");

class Request {
  constructor() {
    this.cookie = new Cookie();
    this.timeout = TIME_OUT;
  }
  setTimeout(timeout) {
    this.timeout = timeout;
  }
  getCookie(name, domain) {
    var cookie = this.cookie.getCookie(name, domain);
    return cookie;
  }
  setCookie(name, value, domain) {
    this.cookie.setCookie(name, value, domain);
  }
  sessionId(length = 4) {
    const text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    var sessionId = "";
    for (let index = 0; index < length; index++) {
      sessionId += text[Math.floor(Math.random() * text.length)];
    }
    return sessionId;
  }
  async getInfoProxy(proxy) {
    const url =
      "http://ip-api.com/json?fields=country,countryCode,region,regionName,city,query";
    const res = await this.GET(url, {}, proxy);
    return res.data;
  }
  async GET(url, headers, proxie = null, recursive = false, showLog = false) {
    if (proxie) {
      var dataHttpAgent = setProxy(proxie);
    } else {
      var dataHttpAgent = {};
    }
    const domain = getDomain(url);
    if (headers.cookie) {
      var cookie = headers.cookie;
    } else {
      var cookie = this.cookie.getCookieDomain(domain);
    }
    try {
      const res = await axios({
        method: "GET",
        url: url,
        headers: {
          ...HEADERS_DEFAULT,
          ...headers,
          cookie: cookie ? cookie : "",
        },
        timeout: this.timeout,
        ...dataHttpAgent,
      });
      this.cookie.setCookieResponse(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status) {
        return error.response;
      } else {
        showLog && console.error(error);
      }
      if (error.code == "ENOTFOUND") {
        console.error("GET =>", error);
        return;
      }
      console.error("ERROR GET ", error.code, url);
      await sleep(2);
      if (recursive) return await this.GET(url, headers);
      return error;
    }
  }
  async POST(
    url,
    headers = {},
    data = {},
    proxie = null,
    recursive = false,
    showLog = false
  ) {
    if (proxie) {
      var dataHttpAgent = setProxy(proxie);
    } else {
      var dataHttpAgent = {};
    }
    const domain = getDomain(url);
    if (headers.cookie) {
      var cookie = headers.cookie;
    } else {
      var cookie = this.cookie.getCookieDomain(domain);
    }
    try {
      const res = await axios({
        method: "POST",
        url: url,
        headers: {
          ...HEADERS_DEFAULT,
          ...headers,
          cookie: cookie ? cookie : "",
        },
        data: data,
        timeout: this.timeout,
        ...dataHttpAgent,
      });
      this.cookie.setCookieResponse(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status) {
        return error.response;
      } else {
        showLog && console.error(error);
      }
      if (error.code == "ENOTFOUND") {
        console.error("POST => ", error);
        return;
      }
      console.error("ERROR POST ", error.code, url);
      await sleep(2);
      if (recursive) return await this.POST(url, headers, data, proxie);
      return error;
    }
  }
  async PUT(
    url,
    headers = {},
    data = {},
    proxie = null,
    recursive = false,
    showLog = false
  ) {
    if (proxie) {
      var dataHttpAgent = setProxy(proxie);
    } else {
      var dataHttpAgent = {};
    }
    const domain = getDomain(url);
    if (headers.cookie) {
      var cookie = headers.cookie;
    } else {
      var cookie = this.cookie.getCookieDomain(domain);
    }
    try {
      const res = await axios({
        method: "PUT",
        url: url,
        headers: {
          ...HEADERS_DEFAULT,
          ...headers,
          cookie: cookie ? cookie : "",
        },
        data: data,
        timeout: this.timeout,
        ...dataHttpAgent,
      });
      this.cookie.setCookieResponse(res);
      return res;
    } catch (error) {
      if (error.response && error.response.status) {
        return error.response;
      } else {
        showLog && console.error(error);
      }
      if (error.code == "ENOTFOUND") {
        console.error("PUT => ", error);
        return;
      }
      console.error("ERROR PUT ", error.code, url);
      await sleep(2);
      if (recursive) return await this.PUT(url, headers, data, proxie);
      return error;
    }
  }
}

module.exports = Request;
