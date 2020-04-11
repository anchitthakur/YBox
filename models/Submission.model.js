const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const submissionSchema = new Schema({
    image: {
        type: String,
        trim: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: 'author\'s ID required'
    },
    competition: {
        type: Schema.Types.ObjectId,
        ref: 'Competition',
        required: 'competition\'s ID required'
    },
});

submissionSchema.path('image').validate((val) => {
    const urlRegex = /(ftp|http|https):\/\/(\w+:?\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
    return urlRegex.test(val);
}, 'Invalid URL.');

module.exports = mongoose.model('Submission', submissionSchema);
