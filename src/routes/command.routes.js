
import express from 'express';
import { createCommand } from '../controllers/command.controller.js';

const router = express.Router();

router.post('/', createCommand);

export default router;
