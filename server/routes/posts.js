import express  from "express";
import {getposts,createPost,updatePost} from "../controllers/posts.js"

const router=express.Router();

router.get('/',getposts);
router.post('/',createPost);
router.patch('/:id', updatePost);
export default router;