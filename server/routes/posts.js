import {Router} from 'express'
import { checkAuth } from '../utils/checkAuth.js'
import { createPost, getAll, getById, getMyPosts } from '../controllers/posts.js'

const router = new Router()

// Create post
router.post('/', checkAuth, createPost )

// Get All Posts
router.get('/', getAll )

// Get Post By Id
router.get('/:id', getById )

// Get My Posts
router.get('/user/me', checkAuth, getMyPosts )


export default router
