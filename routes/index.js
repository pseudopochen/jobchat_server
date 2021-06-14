import express from "express";

import {
  userRegister,
  userDelete,
  userLogin,
  userUpdate,
  userGetById,
  userList
} from "../controllers/user-controller.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/deleteUser", userDelete);
router.post("/login", userLogin);
router.post("/updateUser", userUpdate);
router.get("/user", userGetById);
router.get("/userlist", userList);

export default router;
