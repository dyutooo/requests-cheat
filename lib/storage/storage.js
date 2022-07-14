const STORAGE = {};

const Storage = {
  set: (domain, key, value) => {
    STORAGE[domain][key] = value;
    return true;
  },
  get: (domain, key) => {
    if (STORAGE[domain] && STORAGE[domain][key]) {
      return STORAGE[domain][key];
    } else {
      return null;
    }
  },
  getAllCookieOnDomain: (domain, typeDomain = "all") => {
    if (STORAGE[domain]) {
      var cookieReturn = null;
      for (const [key, value] of STORAGE[domain]) {
        var domainCookie = "";
        if (typeDomain == "all") {
          domainCookie = "." + domain;
        } else {
          domainCookie = domain;
        }
        if (value.domain == domainCookie) {
          cookieReturn += key + ":" + value[key] + "; ";
        }
      }
      return cookieReturn;
    }
  },
};
module.exports = Storage;
