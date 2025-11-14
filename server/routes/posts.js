import {Router} from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { createPost, getAll } from '../controllers/posts.js'

const router = new Router()

// Create post
router.post('/', checkAuth, createPost )

// Get All Posts
router.get('/', getAll )

export default router
