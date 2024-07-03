import express from "express";
import { login, logout, refresh, signup } from "../controllers/user";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
router.get("/refresh", refresh);

export default router;
