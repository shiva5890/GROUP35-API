const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RevviewSchema = new Schema({
    point: {
        type: Number,
        min: 1,
        max: 5,
        required: true
    },
    message: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
    // TODO kasko lagi review
}, {
    timestamps: true
})

module.exports = mongoose.model('reviews', RevviewSchema)
