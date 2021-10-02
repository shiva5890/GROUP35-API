const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    brand: String,
    category: {
        type: String,
        required: true
    },
    size: String, //medium, large, small
    price: Number,
    vendor: {
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    status: {
        type: String,
        enum: ['available', 'out of stock'],
        default: 'available'
    },
    colors: [String],
    offers: [String],
    images: [String],
    tags: [String],
    quantity: Number,
    quality: String,
    viewsCount: Number,
    discount: {
        discountedItem: Boolean,
        discountType: {
            type: String,
            enum: ['percentage', 'value', 'quantity']
        },
        discountValue: String
    },
    manuDate: Date,
    expirtyDate: Date,
    purchasedDate: Date,
    salesDate: Date,
    returnedDate: Date,
    isReturnEligible: Boolean,
    warrentyStatus: Boolean,
    warrentyPeroid: String
}, {
    timestamps: true
})

module.exports = mongoose.model('product', ProductSchema);
