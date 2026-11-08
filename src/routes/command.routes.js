
import express from 'express';

import {
    createCommand,
    getAllCommands,
    findMatchingCommand
} from '../controllers/command.controller.js';

const router = express.Router();

router.post('/', createCommand);

router.get('/', getAllCommands);

router.post('/match', findMatchingCommand);

export default router;
