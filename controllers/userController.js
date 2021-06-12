import md5 from "blueimp-md5";

import UserModel from "../models/UserModel.js";

export const userRegister = function (req, res) {
  const { username, password } = req.body;
  UserModel.findOne({ username })
    .then((user) => {
      if (user) {
        res.send({ code: 1, msg: `username "${username}" already exists!` });
        return new Promise(() => {});
      } else {
        return UserModel.create({
          ...req.body,
          password: md5(password || "123"), // replace password with its MD5 encryption
        });
      }
    })
    .then((user) => { // the "user" object passed in here is a Mongoose object, not a normal javascript object, must use .toObject() to convert to normal javascript object

      //create a cookie {userid: user._id} and send it back
      //console.log("user._id: ", user._id)
      res.cookie('userid', user._id, {maxAge: 1000*60*60*24*7})

     
      //console.log("toObject: ", user.toObject())
      const { password, ...user1 } = user.toObject(); //user._doc; // exclude password from response, not supposed to touch _doc property, should use toObject() to convert Mongoose object to javascript object
      //console.log("user1: ', user1)
      res.send({ code: 0, data: user1 });
    })
    .catch((e) => {
      console.log(e);
      res.send({ code: 1, msg: "create user error" });
    });
};

export const userDelete = function (req, res) {
  const { userID } = req.body;
  // console.log(userID)
  UserModel.deleteOne({ _id: userID }).then((doc) => {
    res.send({ code: 0 });
  });
};

export const userLogin = function(req, res) {
  const filter = {password: 0, __v: 0} // exclude password and __v from query result
  const {username, password} = req.body;
  UserModel.findOne({username, password:md5(password)}, filter)
  .then(user => {
    res.send({code: 0, data: user})
  })
  .catch((e) => {
    console.log(e)
    res.send({code: 1, msg: "username or password wrong!"})
  })
}
