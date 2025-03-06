import express from "express";
import {LoginController,RegisterController} from '../controllers/userController.js'

const router = express.Router()


// Login Route
router.post('/login',LoginController)

// Register Route
router.post('/register',RegisterController)
