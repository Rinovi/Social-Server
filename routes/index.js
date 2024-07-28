const express = require('express');
const router = express.Router();

// Import controllers for user and thought operations
const userController = require('../controllers/userController.js');
const thoughtController = require('../controllers/thoughtController.js');

// User Routes
router.get('/users', userController.getAllUsers);
router.get('/users/:id', userController.getSingleUser);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.post('/users/:userId/friends/:friendId', userController.addFriend);
router.delete('/users/:userId/friends/:friendId', userController.removeFriend);

// Thought Routes
router.get('/thoughts', thoughtController.getAllThoughts);
router.get('/thoughts/:id', thoughtController.getSingleThought);
router.post('/thoughts', thoughtController.createThought);
router.put('/thoughts/:id', thoughtController.updateThought);
router.delete('/thoughts/:id', thoughtController.deleteThought);

router.post('/thoughts/:thoughtId/reactions', thoughtController.createReaction);
router.delete('/thoughts/:thoughtId/reactions/:reactionId', thoughtController.deleteReaction);

module.exports = router;