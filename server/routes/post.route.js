import express from "express";
import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  uploadAuth,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import increaseVisit from "../middleware/increaseVisit.js";

const router = express.Router();

router.get("/upload-auth", uploadAuth);
router.get("/", increaseVisit, getPosts);
router.get("/:slug", getPost);
router.post("/", verifyToken, createPost);
router.delete("/:id", verifyToken, deletePost);

export default router;
