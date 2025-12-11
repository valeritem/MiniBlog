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
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//  Register user
export const register = async (req, res) => {
  if (stryMutAct_9fa48('0')) {
    {
    }
  } else {
    stryCov_9fa48('0');
    try {
      if (stryMutAct_9fa48('1')) {
        {
        }
      } else {
        stryCov_9fa48('1');
        const { username, password } = req.body;
        const isUsed = await User.findOne(
          stryMutAct_9fa48('2')
            ? {}
            : (stryCov_9fa48('2'),
              {
                username,
              })
        );
        if (
          stryMutAct_9fa48('4')
            ? false
            : stryMutAct_9fa48('3')
              ? true
              : (stryCov_9fa48('3', '4'), isUsed)
        ) {
          if (stryMutAct_9fa48('5')) {
            {
            }
          } else {
            stryCov_9fa48('5');
            return res.status(409).json(
              stryMutAct_9fa48('6')
                ? {}
                : (stryCov_9fa48('6'),
                  {
                    message: stryMutAct_9fa48('7')
                      ? ''
                      : (stryCov_9fa48('7'), 'Даний username вже зайнятий. '),
                  })
            );
          }
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        const newUser = new User(
          stryMutAct_9fa48('8')
            ? {}
            : (stryCov_9fa48('8'),
              {
                username,
                password: hash,
              })
        );
        await newUser.save();
        const token = jwt.sign(
          stryMutAct_9fa48('9')
            ? {}
            : (stryCov_9fa48('9'),
              {
                id: newUser._id,
              }),
          process.env.JWT_SECRET,
          stryMutAct_9fa48('10')
            ? {}
            : (stryCov_9fa48('10'),
              {
                expiresIn: stryMutAct_9fa48('11') ? '' : (stryCov_9fa48('11'), '30d'),
              })
        );
        res.status(200).json(
          stryMutAct_9fa48('12')
            ? {}
            : (stryCov_9fa48('12'),
              {
                newUser,
                token,
                message: stryMutAct_9fa48('13')
                  ? ''
                  : (stryCov_9fa48('13'), 'Реєстрація пройшла успішно.'),
              })
        );
      }
    } catch (error) {
      if (stryMutAct_9fa48('14')) {
        {
        }
      } else {
        stryCov_9fa48('14');
        res.status(500).json(
          stryMutAct_9fa48('15')
            ? {}
            : (stryCov_9fa48('15'),
              {
                message: stryMutAct_9fa48('16')
                  ? ''
                  : (stryCov_9fa48('16'), 'Помилка при створені користувача'),
              })
        );
      }
    }
  }
};

// Login user
export const login = async (req, res) => {
  if (stryMutAct_9fa48('17')) {
    {
    }
  } else {
    stryCov_9fa48('17');
    try {
      if (stryMutAct_9fa48('18')) {
        {
        }
      } else {
        stryCov_9fa48('18');
        const { username, password } = req.body;
        const user = await User.findOne(
          stryMutAct_9fa48('19')
            ? {}
            : (stryCov_9fa48('19'),
              {
                username,
              })
        );
        if (
          stryMutAct_9fa48('22')
            ? false
            : stryMutAct_9fa48('21')
              ? true
              : stryMutAct_9fa48('20')
                ? user
                : (stryCov_9fa48('20', '21', '22'), !user)
        ) {
          if (stryMutAct_9fa48('23')) {
            {
            }
          } else {
            stryCov_9fa48('23');
            return res.status(404).json(
              stryMutAct_9fa48('24')
                ? {}
                : (stryCov_9fa48('24'),
                  {
                    message: stryMutAct_9fa48('25')
                      ? ''
                      : (stryCov_9fa48('25'), 'Такого корситувача не існує.'),
                  })
            );
          }
        }
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (
          stryMutAct_9fa48('28')
            ? false
            : stryMutAct_9fa48('27')
              ? true
              : stryMutAct_9fa48('26')
                ? isPasswordCorrect
                : (stryCov_9fa48('26', '27', '28'), !isPasswordCorrect)
        ) {
          if (stryMutAct_9fa48('29')) {
            {
            }
          } else {
            stryCov_9fa48('29');
            return res.status(400).json(
              stryMutAct_9fa48('30')
                ? {}
                : (stryCov_9fa48('30'),
                  {
                    message: stryMutAct_9fa48('31')
                      ? ''
                      : (stryCov_9fa48('31'), 'Неправильний пароль.'),
                  })
            );
          }
        }
        const token = jwt.sign(
          stryMutAct_9fa48('32')
            ? {}
            : (stryCov_9fa48('32'),
              {
                id: user._id,
              }),
          process.env.JWT_SECRET,
          stryMutAct_9fa48('33')
            ? {}
            : (stryCov_9fa48('33'),
              {
                expiresIn: stryMutAct_9fa48('34') ? '' : (stryCov_9fa48('34'), '30d'),
              })
        );
        res.json(
          stryMutAct_9fa48('35')
            ? {}
            : (stryCov_9fa48('35'),
              {
                token,
                user,
                message: stryMutAct_9fa48('36')
                  ? ''
                  : (stryCov_9fa48('36'), 'Ви увійшли в систему.'),
              })
        );
      }
    } catch (error) {
      if (stryMutAct_9fa48('37')) {
        {
        }
      } else {
        stryCov_9fa48('37');
        res.status(500).json(
          stryMutAct_9fa48('38')
            ? {}
            : (stryCov_9fa48('38'),
              {
                message: stryMutAct_9fa48('39')
                  ? ''
                  : (stryCov_9fa48('39'), 'Помилка при авторизації'),
              })
        );
      }
    }
  }
};
// Get me
export const getMe = async (req, res) => {
  if (stryMutAct_9fa48('40')) {
    {
    }
  } else {
    stryCov_9fa48('40');
    try {
      if (stryMutAct_9fa48('41')) {
        {
        }
      } else {
        stryCov_9fa48('41');
        const user = await User.findById(req.userId);
        if (
          stryMutAct_9fa48('44')
            ? false
            : stryMutAct_9fa48('43')
              ? true
              : stryMutAct_9fa48('42')
                ? user
                : (stryCov_9fa48('42', '43', '44'), !user)
        ) {
          if (stryMutAct_9fa48('45')) {
            {
            }
          } else {
            stryCov_9fa48('45');
            return res.json(
              stryMutAct_9fa48('46')
                ? {}
                : (stryCov_9fa48('46'),
                  {
                    message: stryMutAct_9fa48('47')
                      ? ''
                      : (stryCov_9fa48('47'), 'Такого корситувача не існує.'),
                  })
            );
          }
        }
        const token = jwt.sign(
          stryMutAct_9fa48('48')
            ? {}
            : (stryCov_9fa48('48'),
              {
                id: user._id,
              }),
          process.env.JWT_SECRET,
          stryMutAct_9fa48('49')
            ? {}
            : (stryCov_9fa48('49'),
              {
                expiresIn: stryMutAct_9fa48('50') ? '' : (stryCov_9fa48('50'), '30d'),
              })
        );
        res.json(
          stryMutAct_9fa48('51')
            ? {}
            : (stryCov_9fa48('51'),
              {
                token,
                user,
              })
        );
      }
    } catch (error) {
      if (stryMutAct_9fa48('52')) {
        {
        }
      } else {
        stryCov_9fa48('52');
        res.json(
          stryMutAct_9fa48('53')
            ? {}
            : (stryCov_9fa48('53'),
              {
                message: stryMutAct_9fa48('54') ? '' : (stryCov_9fa48('54'), 'Немає доступу.'),
              })
        );
      }
    }
  }
};
