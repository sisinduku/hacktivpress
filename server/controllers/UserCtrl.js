const FB = require('fb')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const encrypt = require('../helpers/encrypt');

class UserCtrl {
  static getAuthenticated (req, res, next) {
    let fb = new FB.Facebook({
      accessToken: req.headers.accesstoken,
      appId: process.env.FBAPPID,
      appSecret: process.env.FBAPPSECRET
    })
    console.log(req.headers.userid)
    fb.api(req.headers.userid, {
      fields: ['id', 'name']
    }, function (result) {
      User.findOneAndUpdate({
        userId: req.headers.userid
      }, {
        userId: result.id,
        username: result.name,
        password: encrypt('this should be random but unused' + Math.random())
      }, {
        new: true,
        upsert: true,
        setDefaultOnInsert: true
      })
        .then((user) => {
          let token = jwt.sign({
            _id: user._id,
            userId: user.userId,
            username: user.username
          }, process.env.APPSECRET)

          res.status(200).json({
            token: token
          })
        })
    })
  }
}

module.exports = UserCtrl;
