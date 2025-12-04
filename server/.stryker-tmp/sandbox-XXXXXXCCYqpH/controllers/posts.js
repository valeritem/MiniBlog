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
import { title } from 'process';
import Post from '../models/Post.js';
import User from '../models/User.js';
import Comment from '../models/Comment.js';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

// Create Post
export const createPost = async (req, res) => {
  if (stryMutAct_9fa48("70")) {
    {}
  } else {
    stryCov_9fa48("70");
    try {
      if (stryMutAct_9fa48("71")) {
        {}
      } else {
        stryCov_9fa48("71");
        const {
          title,
          text
        } = req.body;
        const user = await User.findById(req.userId);
        if (stryMutAct_9fa48("73") ? false : stryMutAct_9fa48("72") ? true : (stryCov_9fa48("72", "73"), req.files)) {
          if (stryMutAct_9fa48("74")) {
            {}
          } else {
            stryCov_9fa48("74");
            let fileName = stryMutAct_9fa48("75") ? Date.now().toString() - req.files.image.name : (stryCov_9fa48("75"), Date.now().toString() + req.files.image.name);
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, stryMutAct_9fa48("76") ? "" : (stryCov_9fa48("76"), '..'), stryMutAct_9fa48("77") ? "" : (stryCov_9fa48("77"), 'uploads'), fileName));
            const newPostWithImage = new Post(stryMutAct_9fa48("78") ? {} : (stryCov_9fa48("78"), {
              username: user.username,
              title,
              text,
              imgUrl: fileName,
              author: req.userId
            }));
            await newPostWithImage.save();
            await User.findByIdAndUpdate(req.userId, stryMutAct_9fa48("79") ? {} : (stryCov_9fa48("79"), {
              $push: stryMutAct_9fa48("80") ? {} : (stryCov_9fa48("80"), {
                posts: newPostWithImage
              })
            }));
            return res.json(newPostWithImage);
          }
        }
        const newPostWithoutImage = new Post(stryMutAct_9fa48("81") ? {} : (stryCov_9fa48("81"), {
          username: user.username,
          title,
          text,
          imgUrl: stryMutAct_9fa48("82") ? "Stryker was here!" : (stryCov_9fa48("82"), ''),
          author: req.userId
        }));
        await newPostWithoutImage.save();
        await User.findByIdAndUpdate(req.userId, stryMutAct_9fa48("83") ? {} : (stryCov_9fa48("83"), {
          $push: stryMutAct_9fa48("84") ? {} : (stryCov_9fa48("84"), {
            posts: newPostWithoutImage
          })
        }));
        res.json(newPostWithoutImage);
      }
    } catch (error) {
      if (stryMutAct_9fa48("85")) {
        {}
      } else {
        stryCov_9fa48("85");
        res.json(stryMutAct_9fa48("86") ? {} : (stryCov_9fa48("86"), {
          message: stryMutAct_9fa48("87") ? "" : (stryCov_9fa48("87"), 'Щось пішло не так.')
        }));
      }
    }
  }
};

// Get All Posts
export const getAll = async (req, res) => {
  if (stryMutAct_9fa48("88")) {
    {}
  } else {
    stryCov_9fa48("88");
    try {
      if (stryMutAct_9fa48("89")) {
        {}
      } else {
        stryCov_9fa48("89");
        const posts = await (stryMutAct_9fa48("90") ? Post.find() : (stryCov_9fa48("90"), Post.find().sort(stryMutAct_9fa48("91") ? "" : (stryCov_9fa48("91"), '-createdAt'))));
        const popularPosts = await (stryMutAct_9fa48("92") ? Post.find().limit(5) : (stryCov_9fa48("92"), Post.find().limit(5).sort(stryMutAct_9fa48("93") ? "" : (stryCov_9fa48("93"), '-views'))));
        if (stryMutAct_9fa48("96") ? false : stryMutAct_9fa48("95") ? true : stryMutAct_9fa48("94") ? posts : (stryCov_9fa48("94", "95", "96"), !posts)) {
          if (stryMutAct_9fa48("97")) {
            {}
          } else {
            stryCov_9fa48("97");
            return res.json(stryMutAct_9fa48("98") ? {} : (stryCov_9fa48("98"), {
              message: stryMutAct_9fa48("99") ? "" : (stryCov_9fa48("99"), 'Постів немає.')
            }));
          }
        }
        res.json(stryMutAct_9fa48("100") ? {} : (stryCov_9fa48("100"), {
          posts,
          popularPosts
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("101")) {
        {}
      } else {
        stryCov_9fa48("101");
        res.json(stryMutAct_9fa48("102") ? {} : (stryCov_9fa48("102"), {
          message: stryMutAct_9fa48("103") ? "" : (stryCov_9fa48("103"), 'Щось пішло не так.')
        }));
      }
    }
  }
};

// Get Post By Id
export const getById = async (req, res) => {
  if (stryMutAct_9fa48("104")) {
    {}
  } else {
    stryCov_9fa48("104");
    try {
      if (stryMutAct_9fa48("105")) {
        {}
      } else {
        stryCov_9fa48("105");
        const post = await Post.findByIdAndUpdate(req.params.id, stryMutAct_9fa48("106") ? {} : (stryCov_9fa48("106"), {
          $inc: stryMutAct_9fa48("107") ? {} : (stryCov_9fa48("107"), {
            views: 1
          })
        }), stryMutAct_9fa48("108") ? {} : (stryCov_9fa48("108"), {
          new: stryMutAct_9fa48("109") ? false : (stryCov_9fa48("109"), true)
        }));
        res.json(post);
      }
    } catch (error) {
      if (stryMutAct_9fa48("110")) {
        {}
      } else {
        stryCov_9fa48("110");
        res.json(stryMutAct_9fa48("111") ? {} : (stryCov_9fa48("111"), {
          message: stryMutAct_9fa48("112") ? "" : (stryCov_9fa48("112"), 'Щось пішло не так.')
        }));
      }
    }
  }
};

// Get My Posts
export const getMyPosts = async (req, res) => {
  if (stryMutAct_9fa48("113")) {
    {}
  } else {
    stryCov_9fa48("113");
    try {
      if (stryMutAct_9fa48("114")) {
        {}
      } else {
        stryCov_9fa48("114");
        const user = await User.findById(req.userId);
        const list = await Promise.all(user.posts.map(post => {
          if (stryMutAct_9fa48("115")) {
            {}
          } else {
            stryCov_9fa48("115");
            return Post.findById(post._id);
          }
        }));
        res.json(list);
      }
    } catch (error) {
      if (stryMutAct_9fa48("116")) {
        {}
      } else {
        stryCov_9fa48("116");
        res.json(stryMutAct_9fa48("117") ? {} : (stryCov_9fa48("117"), {
          message: stryMutAct_9fa48("118") ? "" : (stryCov_9fa48("118"), 'Щось пішло не так.')
        }));
      }
    }
  }
};

// Remove Post
export const removePost = async (req, res) => {
  if (stryMutAct_9fa48("119")) {
    {}
  } else {
    stryCov_9fa48("119");
    try {
      if (stryMutAct_9fa48("120")) {
        {}
      } else {
        stryCov_9fa48("120");
        const post = await Post.findByIdAndDelete(req.params.id);
        if (stryMutAct_9fa48("123") ? false : stryMutAct_9fa48("122") ? true : stryMutAct_9fa48("121") ? post : (stryCov_9fa48("121", "122", "123"), !post)) return res.json(stryMutAct_9fa48("124") ? {} : (stryCov_9fa48("124"), {
          message: stryMutAct_9fa48("125") ? "" : (stryCov_9fa48("125"), 'Такого поста не існує.')
        }));
        await User.findByIdAndUpdate(req.userId, stryMutAct_9fa48("126") ? {} : (stryCov_9fa48("126"), {
          $pull: stryMutAct_9fa48("127") ? {} : (stryCov_9fa48("127"), {
            posts: req.params.id
          })
        }));
        res.json(stryMutAct_9fa48("128") ? {} : (stryCov_9fa48("128"), {
          message: stryMutAct_9fa48("129") ? "" : (stryCov_9fa48("129"), 'Пост видалено.')
        }));
      }
    } catch (error) {
      if (stryMutAct_9fa48("130")) {
        {}
      } else {
        stryCov_9fa48("130");
        res.json(stryMutAct_9fa48("131") ? {} : (stryCov_9fa48("131"), {
          message: stryMutAct_9fa48("132") ? "" : (stryCov_9fa48("132"), 'Щось пішло не так.')
        }));
      }
    }
  }
};

// Update Post
export const updatePost = async (req, res) => {
  if (stryMutAct_9fa48("133")) {
    {}
  } else {
    stryCov_9fa48("133");
    try {
      if (stryMutAct_9fa48("134")) {
        {}
      } else {
        stryCov_9fa48("134");
        const {
          title,
          text,
          id
        } = req.body;
        const post = await Post.findById(id);
        if (stryMutAct_9fa48("136") ? false : stryMutAct_9fa48("135") ? true : (stryCov_9fa48("135", "136"), req.files)) {
          if (stryMutAct_9fa48("137")) {
            {}
          } else {
            stryCov_9fa48("137");
            let fileName = stryMutAct_9fa48("138") ? Date.now().toString() - req.files.image.name : (stryCov_9fa48("138"), Date.now().toString() + req.files.image.name);
            const __dirname = dirname(fileURLToPath(import.meta.url));
            req.files.image.mv(path.join(__dirname, stryMutAct_9fa48("139") ? "" : (stryCov_9fa48("139"), '..'), stryMutAct_9fa48("140") ? "" : (stryCov_9fa48("140"), 'uploads'), fileName));
            post.imgUrl = stryMutAct_9fa48("143") ? fileName && ' ' : stryMutAct_9fa48("142") ? false : stryMutAct_9fa48("141") ? true : (stryCov_9fa48("141", "142", "143"), fileName || (stryMutAct_9fa48("144") ? "" : (stryCov_9fa48("144"), ' ')));
          }
        }
        post.title = title;
        post.text = text;
        await post.save();
        res.json(post);
      }
    } catch (error) {
      if (stryMutAct_9fa48("145")) {
        {}
      } else {
        stryCov_9fa48("145");
        res.json(stryMutAct_9fa48("146") ? {} : (stryCov_9fa48("146"), {
          message: stryMutAct_9fa48("147") ? "" : (stryCov_9fa48("147"), 'Щось пішло не так.')
        }));
      }
    }
  }
};

// Get Post Comments
export const getPostComments = async (req, res) => {
  if (stryMutAct_9fa48("148")) {
    {}
  } else {
    stryCov_9fa48("148");
    try {
      if (stryMutAct_9fa48("149")) {
        {}
      } else {
        stryCov_9fa48("149");
        const post = await Post.findById(req.params.id);
        if (stryMutAct_9fa48("152") ? false : stryMutAct_9fa48("151") ? true : stryMutAct_9fa48("150") ? post : (stryCov_9fa48("150", "151", "152"), !post)) {
          if (stryMutAct_9fa48("153")) {
            {}
          } else {
            stryCov_9fa48("153");
            return res.status(404).json(stryMutAct_9fa48("154") ? {} : (stryCov_9fa48("154"), {
              message: stryMutAct_9fa48("155") ? "" : (stryCov_9fa48("155"), 'Пост не знайдено')
            }));
          }
        }
        const list = await Promise.all(post.comments.map(comment => {
          if (stryMutAct_9fa48("156")) {
            {}
          } else {
            stryCov_9fa48("156");
            return Comment.findById(comment);
          }
        }));
        res.json(list);
      }
    } catch (error) {
      if (stryMutAct_9fa48("157")) {
        {}
      } else {
        stryCov_9fa48("157");
        res.json(stryMutAct_9fa48("158") ? {} : (stryCov_9fa48("158"), {
          message: stryMutAct_9fa48("159") ? "" : (stryCov_9fa48("159"), 'Щось пішло не так.')
        }));
      }
    }
  }
};