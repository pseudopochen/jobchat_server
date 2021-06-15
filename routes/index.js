import express from "express";

import {
  userRegister,
  userDelete,
  userLogin,
  userUpdate,
  userGetById,
  userList,
} from "../controllers/user-controller.js";

import { msgList, readMsg } from "../controllers/msg-controller.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/deleteUser", userDelete);
router.post("/login", userLogin);
router.post("/updateUser", userUpdate);
router.get("/user", userGetById);
router.get("/userlist", userList);

//

router.get("/msglist", msgList);
router.post("/readmsg", readMsg);


export default router;
