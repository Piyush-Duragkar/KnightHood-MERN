import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';
// import { signup } './auth.controller.js';


const router = express.Router();

router.get("/signup", signup);

router.get("/login", login);

router.get("/logout", logout);

export default router;
