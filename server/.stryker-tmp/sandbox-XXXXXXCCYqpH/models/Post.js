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
const PostSchema = new mongoose.Schema(
  stryMutAct_9fa48('167')
    ? {}
    : (stryCov_9fa48('167'),
      {
        username: stryMutAct_9fa48('168')
          ? {}
          : (stryCov_9fa48('168'),
            {
              type: String,
            }),
        title: stryMutAct_9fa48('169')
          ? {}
          : (stryCov_9fa48('169'),
            {
              type: String,
              required: stryMutAct_9fa48('170') ? false : (stryCov_9fa48('170'), true),
            }),
        text: stryMutAct_9fa48('171')
          ? {}
          : (stryCov_9fa48('171'),
            {
              type: String,
              required: stryMutAct_9fa48('172') ? false : (stryCov_9fa48('172'), true),
            }),
        imgUrl: stryMutAct_9fa48('173')
          ? {}
          : (stryCov_9fa48('173'),
            {
              type: String,
              default: stryMutAct_9fa48('174') ? 'Stryker was here!' : (stryCov_9fa48('174'), ''),
            }),
        views: stryMutAct_9fa48('175')
          ? {}
          : (stryCov_9fa48('175'),
            {
              type: Number,
              default: 0,
            }),
        author: stryMutAct_9fa48('176')
          ? {}
          : (stryCov_9fa48('176'),
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: stryMutAct_9fa48('177') ? '' : (stryCov_9fa48('177'), 'User'),
            }),
        comments: stryMutAct_9fa48('178')
          ? []
          : (stryCov_9fa48('178'),
            [
              stryMutAct_9fa48('179')
                ? {}
                : (stryCov_9fa48('179'),
                  {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: stryMutAct_9fa48('180') ? '' : (stryCov_9fa48('180'), 'Comment'),
                  }),
            ]),
      }),
  stryMutAct_9fa48('181')
    ? {}
    : (stryCov_9fa48('181'),
      {
        timestamps: stryMutAct_9fa48('182') ? false : (stryCov_9fa48('182'), true),
      })
);
export default mongoose.model(
  stryMutAct_9fa48('183') ? '' : (stryCov_9fa48('183'), 'Post'),
  PostSchema
);
