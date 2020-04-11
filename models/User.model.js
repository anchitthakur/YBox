const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
    name: {
        type: String,
        required: 'Name is required',
        trim: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: 'Email should be unique',
        required: 'Email address is required',
    }
});

personSchema.path('email').validate((val) => {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(val)
}, 'Invalid email address.');

module.exports = mongoose.model('User', personSchema);
