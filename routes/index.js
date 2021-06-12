import express from "express";

import { userRegister, userDelete, userLogin } from "../controllers/userController.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/deleteUser", userDelete);
router.post("/login", userLogin);

export default router;
