import express from "express";
const router = express.Router();
import {
  authUser,
  deleteUser,
  getUserById,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile); // pass protect to whichever route needs to be protected ..
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect.apply, admin, getUserById)
  .put(protect, admin, updateUser);

export default router;
