// @ts-nocheck
function stryNS_9fa48() {
  var g =
    (typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis) ||
    new Function('return this')();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (
    ns.activeMutant === undefined &&
    g.process &&
    g.process.env &&
    g.process.env.__STRYKER_ACTIVE_MUTANT__
  ) {
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
  var cov =
    ns.mutantCoverage ||
    (ns.mutantCoverage = {
      static: {},
      perTest: {},
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
import mongoose from 'mongoose';
const UserSchema = new mongoose.Schema(
  stryMutAct_9fa48('184')
    ? {}
    : (stryCov_9fa48('184'),
      {
        username: stryMutAct_9fa48('185')
          ? {}
          : (stryCov_9fa48('185'),
            {
              type: String,
              required: stryMutAct_9fa48('186') ? false : (stryCov_9fa48('186'), true),
              unigue: stryMutAct_9fa48('187') ? false : (stryCov_9fa48('187'), true),
            }),
        password: stryMutAct_9fa48('188')
          ? {}
          : (stryCov_9fa48('188'),
            {
              type: String,
              required: stryMutAct_9fa48('189') ? false : (stryCov_9fa48('189'), true),
            }),
        posts: stryMutAct_9fa48('190')
          ? []
          : (stryCov_9fa48('190'),
            [
              stryMutAct_9fa48('191')
                ? {}
                : (stryCov_9fa48('191'),
                  {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: stryMutAct_9fa48('192') ? '' : (stryCov_9fa48('192'), 'Post'),
                  }),
            ]),
      }),
  stryMutAct_9fa48('193')
    ? {}
    : (stryCov_9fa48('193'),
      {
        timestamps: stryMutAct_9fa48('194') ? false : (stryCov_9fa48('194'), true),
      })
);
export default mongoose.model(
  stryMutAct_9fa48('195') ? '' : (stryCov_9fa48('195'), 'User'),
  UserSchema
);
