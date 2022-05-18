const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    composite: {
        type: String,
        require: true
    },
    BondingAgents: {
        type: String,
        require: true
    },
    Desensitiser: {
        type: String,
        require: true
    },
    cementsAndLusting: {
        type: String,
        require: true
    },
    DentalAndReliners: {
        type: String,
        require: true
    },
    Accessories: {
        type: String,
        require: true
    },
    
},
    {
        timestamps: true


    })
module.exports = mongoose.model('Product', ProductSchema)