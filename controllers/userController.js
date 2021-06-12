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
          password: md5(password || "123"),
        });
      }
    })
    .then((user) => {
      res.send({ code: 0, data: user });
    })
    .catch((e) => {
      console.log(e);
      res.send({ code: 1, msg: "create user error" });
    });
};
