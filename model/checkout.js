const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const CheckoutSchema = new mongoose.Schema({
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
            //     default: 1
            // },
        },
    ],
    amount: {type: Object, require: true},
    address : {type :Object, require: true},
    status: {type : String, default: "pending"}

},
    { timesStamps: true }
);
module.exports = mongoose.model('Checkout', CheckoutSchema)