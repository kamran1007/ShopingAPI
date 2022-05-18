const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        require: true
    },
    products: [
        {
            // productId: {
            //     type: String,
            // },
            // quantity: {
            //     type: Number,
            //     default: 1,
            // },
        },
    ],

},
    { timesStamps: true }
);
module.exports = mongoose.model('Cart', CartSchema)