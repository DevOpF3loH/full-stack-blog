import express from "express"
import { deleteUser, getUserSavedPosts, savePost } from "../controllers/user.controller.js"
import { verifyToken } from "../middleware/jwt.js"

const router = express.Router()

router.delete("/:id", verifyToken, deleteUser)
router.get("/saved", verifyToken, getUserSavedPosts)
router.patch("/save", verifyToken, savePost)

export default router