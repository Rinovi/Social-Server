const { User, Thought } = require('../models');

const thoughtController = {
    getAllThoughts: async (req, res) => {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    getSingleThought: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.id);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    createThought: async (req, res) => {
        try {
            const newThought = await Thought.create(req.body);
            // Push the created thought's _id to the associated user's thoughts array field
            const user = await User.findById(req.body.userId);
            user.thoughts.push(newThought._id);
            await user.save();
            res.json(newThought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    updateThought: async (req, res) => {
        try {
            const updatedThought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
            res.json(updatedThought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteThought: async (req, res) => {
        try {
            const deletedThought = await Thought.findByIdAndDelete(req.params.id);
            res.json(deletedThought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    createReaction: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            thought.reactions.push(req.body);
            await thought.save();
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    },

    deleteReaction: async (req, res) => {
        try {
            const thought = await Thought.findById(req.params.thoughtId);
            thought.reactions.id(req.params.reactionId).remove();
            await thought.save();
            res.json(thought);
        } catch (err) {
            res.status(400).json(err);
        }
    }
};

module.exports = thoughtController;