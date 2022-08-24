const STORAGE = {};

const Storage = {
  set: (domain, key, value) => {
    if (domain.startsWith(".")) {
      domain = domain.slice(1);
    }
    if (STORAGE[domain]) {
      STORAGE[domain][key] = value;
    } else {
      STORAGE[domain] = {};
      STORAGE[domain][key] = value;
    }
    return true;
  },
  get: (domain, key) => {
    if (domain.startsWith(".")) {
      domain = domain.slice(1);
    }
    if (STORAGE[domain] && STORAGE[domain][key]) {
      return STORAGE[domain][key];
    } else {
      return null;
    }
  },
  getAllCookieOnDomain: (domain, typeDomain = "all") => {
    if (STORAGE[domain]) {
      var cookieReturn = "";
      console.log(STORAGE[domain]);
      for (const [key, value] of Object.entries(STORAGE[domain])) {
        var domainCookie = "";
        if (typeDomain == "all") {
          domainCookie = "." + domain;
        } else {
          domainCookie = domain;
        }
        if (value.domain == domainCookie) {
          const timeNow = Date.now();
          const timeExpries = new Date(value.expires).getTime();
          if (timeNow <= timeExpries)
            cookieReturn += key + "=" + value[key] + "; ";
        }
      }
      return cookieReturn;
    }
  },
};
module.exports = Storage;
