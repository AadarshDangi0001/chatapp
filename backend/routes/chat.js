import express from 'express';
import { getUsers, getMessages, getGroupMessages } from '../controllers/chatController.js';
import { auth } from '../middlewares/auth.js';

const router = express.Router();

router.get('/users', auth, getUsers);
router.get('/messages/:userId', auth, getMessages);
router.get('/group-messages', auth, getGroupMessages);

export default router;