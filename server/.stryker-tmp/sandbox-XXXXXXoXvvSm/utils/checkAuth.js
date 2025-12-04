// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import jwt from 'jsonwebtoken';
export const checkAuth = (req, res, next) => {
  if (stryMutAct_9fa48("207")) {
    {}
  } else {
    stryCov_9fa48("207");
    const token = (stryMutAct_9fa48("210") ? req.headers.authorization && '' : stryMutAct_9fa48("209") ? false : stryMutAct_9fa48("208") ? true : (stryCov_9fa48("208", "209", "210"), req.headers.authorization || (stryMutAct_9fa48("211") ? "Stryker was here!" : (stryCov_9fa48("211"), '')))).replace(stryMutAct_9fa48("213") ? /Bearer\S?/ : stryMutAct_9fa48("212") ? /Bearer\s/ : (stryCov_9fa48("212", "213"), /Bearer\s?/), stryMutAct_9fa48("214") ? "Stryker was here!" : (stryCov_9fa48("214"), ''));
    if (stryMutAct_9fa48("216") ? false : stryMutAct_9fa48("215") ? true : (stryCov_9fa48("215", "216"), token)) {
      if (stryMutAct_9fa48("217")) {
        {}
      } else {
        stryCov_9fa48("217");
        try {
          if (stryMutAct_9fa48("218")) {
            {}
          } else {
            stryCov_9fa48("218");
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.userId = decoded.id;
            next();
          }
        } catch (error) {
          if (stryMutAct_9fa48("219")) {
            {}
          } else {
            stryCov_9fa48("219");
            return res.json(stryMutAct_9fa48("220") ? {} : (stryCov_9fa48("220"), {
              message: stryMutAct_9fa48("221") ? "" : (stryCov_9fa48("221"), 'Немає доступу.')
            }));
          }
        }
      }
    } else {
      if (stryMutAct_9fa48("222")) {
        {}
      } else {
        stryCov_9fa48("222");
        return res.json(stryMutAct_9fa48("223") ? {} : (stryCov_9fa48("223"), {
          message: stryMutAct_9fa48("224") ? "" : (stryCov_9fa48("224"), 'Немає доступу.')
        }));
      }
    }
  }
};