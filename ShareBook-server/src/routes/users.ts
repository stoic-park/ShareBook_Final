const express = require('express');

const router = express.Router();

const { usersController } = require('../controllers');

//localhost:4000/users/

router.post('/signin', usersController.signin.post);
router.post('/signup', usersController.signup.post);

export default router;
