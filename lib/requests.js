const request = require("request");
const { sleep } = require("./utils");
const { TIME_OUT, HEADERS_DEFAULT } = require("../config/config");

class Requests {
  constructor() {
    this.jar = request.jar();
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
  sessionId(length = 4, text) {
    if (!text) text = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
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
    return res.body;
  }
  async GET(url, headers, proxie = null, recursive = false, showLog = false) {
    const option = {
      headers: headers ? headers : HEADERS_DEFAULT,
      timeout: this.timeout,
      gzip: true,
      jar: this.jar,
      proxy: proxie,
    };

    try {
      const res = await new Promise(function (resolve, reject) {
        request.get(url, option, function (error, res) {
          if (!error) {
            resolve(res);
          } else {
            reject(error);
          }
        });
      });
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
      if (recursive)
        return await this.GET(url, headers, proxie, recursive, showLog);
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
    const option = {
      method: "POST",
      url: url,
      headers: headers ? headers : HEADERS_DEFAULT,
      json: typeof data == "object" ? true : false,
      body: data,
      timeout: this.timeout,
      gzip: true,
      jar: this.jar,
      proxy: proxie,
    };
    try {
      const res = await new Promise(function (resolve, reject) {
        request(option, function (error, res) {
          if (!error) {
            resolve(res);
          } else {
            reject(error);
          }
        });
      });
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
      if (recursive)
        return await this.POST(url, headers, data, proxie, recursive, showLog);
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
    const option = {
      method: "PUT",
      url: url,
      headers: headers ? headers : HEADERS_DEFAULT,
      json: typeof data == "object" ? true : false,
      body: data,
      timeout: this.timeout,
      gzip: true,
      jar: this.jar,
      proxy: proxie,
    };
    try {
      const res = await new Promise(function (resolve, reject) {
        request(option, function (error, res) {
          if (!error) {
            resolve(res);
          } else {
            reject(error);
          }
        });
      });
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
      if (recursive)
        return await this.PUT(url, headers, data, proxie, recursive, showLog);
      return error;
    }
  }
}

module.exports = Requests;
