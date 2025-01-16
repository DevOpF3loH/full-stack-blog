import express from "express"
import { verifyToken } from "../middleware/jwt.js";
import { addComment, deleteComment, getPostComments } from "../controllers/comment.controller.js";

const router = express.Router()

router.get("/:postId", getPostComments)
router.post("/:postId", verifyToken, addComment)
router.delete("/:id", verifyToken, deleteComment)

export default router