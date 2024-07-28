const { User } = require('../models');

const userController = {
    getAllUsers: async (req, res) => {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const user = await User.findById(req.params.id).populate('thoughts').populate('friends');
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createUser: async (req, res) => {
        try {
            const newUser = await User.create(req.body);
            res.json(newUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    updateUser: async (req, res) => {
        try {
            const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteUser: async (req, res) => {
        try {
            const deletedUser = await User.findByIdAndDelete(req.params.id);
            // BONUS: Remove user's associated thoughts
            await Thought.deleteMany({ _id: { $in: deletedUser.thoughts } });
            res.json(deletedUser);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    addFriend: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            user.friends.push(req.params.friendId);
            await user.save();
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    removeFriend: async (req, res) => {
        try {
            const user = await User.findById(req.params.userId);
            user.friends.pull(req.params.friendId);
            await user.save();
            res.json(user);
        } catch (err) {
            res.status(400).json(err);
        }
    }
};

module.exports = userController;