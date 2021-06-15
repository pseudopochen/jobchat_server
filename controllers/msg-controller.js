import ChatModel from "../models/ChatModel";
import UserModel from "../models/UserModel";

const colFilter = { password: 0, __v: 0 };

export const msgList = (req, res) => {
  UserModel.find()
    .then((userDocs) => {
      const users = userDocs.reduce((users, doc) => {
        users[doc._id] = { username: doc.username, avatar: doc.avatar };
        return users;
      }, {});

      const userid = req.cookies.userid;
      ChatModel.find({ $or: [{ from: userid }, { to: userid }] }, colFilter)
        .then((chatMsgs) => {
          res.send({ code: 0, data: { users, chatMsgs } });
        })
        .catch((err) => {
          console.log("error getting chat msgs in msgList", err);
          res.send({ code: 1, msg: "error getting chat msg in msgList" });
        });
    })
    .catch((err) => {
      console.log("error getting all user list in msgList", err);
      res.send({ code: 1, msg: "error getting all user list in msgList" });
    });
};

export const readMsg = (req, res) => {
  const from = req.body.from;
  const to = req.cookies.userid;
  ChatModel.updateMany({ from, to, read: false }, { read: true })
    .then((wrtRes) => {
      res.send({ code: 0, data: wrtRes.nModified });
    })
    .catch((err) => {
      console.log("error updating in readMsg"),
        res.send({ code: 1, msg: "error updating in readMsg" });
    });
};
