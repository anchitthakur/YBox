const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const competitionSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        unique: 'Competition name should be unique',
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    author: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Competition', competitionSchema);
