import express from "express";
const router = express.Router();

import { signin, signup, getUsers } from "../controllers/user.js";

router.get("/", getUsers);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;