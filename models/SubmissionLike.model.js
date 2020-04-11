const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionLikeSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'author\'s ID required'
    },
    submission: {
        type: Schema.Types.ObjectId,
        ref: 'Submission',
        required: 'submission\'s ID required'
    },
});

module.exports = mongoose.model('SubmissionLike', submissionLikeSchema);
