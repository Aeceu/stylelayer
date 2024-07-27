import express from "express";
import {
  changeUserPassword,
  login,
  logout,
  refresh,
  signup,
  updateUserInformation,
  updateUserProfilePicture,
} from "../controllers/user";

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.get("/logout", logout);
router.get("/refresh", refresh);

router.patch("/user/password/:userId", changeUserPassword);
router.patch("/user/:userId", updateUserInformation);
router.patch("/user/image/:userId", updateUserProfilePicture);
export default router;
