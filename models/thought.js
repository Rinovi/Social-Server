const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Reaction subdocument schema
const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new mongoose.Types.ObjectId()
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAt => new Date(createdAt).toLocaleString()
    }
});

// Thought schema
const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAt => new Date(createdAt).toLocaleString()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [reactionSchema]
});

// Create a virtual field to get the reaction count
thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;