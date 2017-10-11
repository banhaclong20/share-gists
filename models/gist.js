const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GistSchema = new Schema({
    description: {
        type: String,
        required: true
    },
    contents: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'public'
    },
    comments: [{
        commentBody: {
            type: String,
            required: true
        },
        commentDate: {
            type: Date,
            default: Date.now
        },
        commentUser: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Create collection and add Schema
mongoose.model('gists', GistSchema);