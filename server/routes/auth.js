import {Router} from 'express'
import { register, login, getMe } from '.../controllers/auth.js'
import { get } from 'http'

const router = new Router()

// Register
router.post('/register', register )

// Login
router.post('/login', login)

// Get me
router.get('/me', getMe)

export default router