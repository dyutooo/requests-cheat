const setProxy = require("./proxy");
const axios = require("axios");
const Cookie = require("./cookie");

axios.get("https://mbasic.facebook.com/").then((res) => {
  Cookie.getCookie(res);
});
