const express = require('express');

const router = express.Router();

const { historyController } = require('../controllers');

router.get('/listsIBorrowed', historyController.listsIBorrowed.get);

export default router;
