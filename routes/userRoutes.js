const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');

// User Routes
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getSingleUser);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

router.post('/:userId/friends/:friendId', userController.addFriend);
router.delete('/:userId/friends/:friendId', userController.removeFriend);

module.exports = router

