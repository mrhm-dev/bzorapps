const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const timestamp = require('mongoose-timestamp');

// Comment Schema
const CommentSchema = new Schema({
    comment: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// News Schema
const NewsSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        default: undefined
    },
    content: {
        type: String,
        required: true
    },
    upvote: {
        type: Number
    },
    downvote: {
        type: Number
    },
    comments: [CommentSchema],
    tags: [String],
    category: {
        type: String,
        enum: ['BUSINESS', 'TECHNOLOGY', 'POLITICS', 'SPORTS', 'ENTERTAINMENT'],
        required: true
    }
});

NewsSchema.plugin(timestamp);

const News = module.exports = mongoose.model('News', NewsSchema);