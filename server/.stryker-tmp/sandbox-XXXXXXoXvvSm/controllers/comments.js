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
import Comment from '../models/Comment.js';
import Post from '../models/Post.js';
export const createComment = async (req, res) => {
  if (stryMutAct_9fa48('55')) {
    {
    }
  } else {
    stryCov_9fa48('55');
    try {
      if (stryMutAct_9fa48('56')) {
        {
        }
      } else {
        stryCov_9fa48('56');
        //const { postId, comment } = req.body;
        const { comment } = req.body;
        const postId = req.params.id;
        if (
          stryMutAct_9fa48('59')
            ? false
            : stryMutAct_9fa48('58')
              ? true
              : stryMutAct_9fa48('57')
                ? comment
                : (stryCov_9fa48('57', '58', '59'), !comment)
        )
          return res.json(
            stryMutAct_9fa48('60')
              ? {}
              : (stryCov_9fa48('60'),
                {
                  messege: stryMutAct_9fa48('61')
                    ? ''
                    : (stryCov_9fa48('61'), 'Коментар не може бути пустим'),
                })
          );
        const newComment = new Comment(
          stryMutAct_9fa48('62')
            ? {}
            : (stryCov_9fa48('62'),
              {
                comment,
              })
        );
        await newComment.save();
        try {
          if (stryMutAct_9fa48('63')) {
            {
            }
          } else {
            stryCov_9fa48('63');
            await Post.findByIdAndUpdate(
              postId,
              stryMutAct_9fa48('64')
                ? {}
                : (stryCov_9fa48('64'),
                  {
                    $push: stryMutAct_9fa48('65')
                      ? {}
                      : (stryCov_9fa48('65'),
                        {
                          comments: newComment._id,
                        }),
                  })
            );
          }
        } catch (error) {
          if (stryMutAct_9fa48('66')) {
            {
            }
          } else {
            stryCov_9fa48('66');
            console.log(error);
          }
        }
        res.status(201).json(newComment);
      }
    } catch (error) {
      if (stryMutAct_9fa48('67')) {
        {
        }
      } else {
        stryCov_9fa48('67');
        res.json(
          stryMutAct_9fa48('68')
            ? {}
            : (stryCov_9fa48('68'),
              {
                messege: stryMutAct_9fa48('69') ? '' : (stryCov_9fa48('69'), 'Щось пішло не так.'),
              })
        );
      }
    }
  }
};
