const mongoose = require('mongoose');
// const { boolean} = require('webidl-conversions');
const addressSchema = new mongoose.Schema({
    HouseNumber: {
        type: String,
        require: true,
        unique: true
    },
    street: {
        type: String,
        require: true,
        
    },
    landmark: {
        type: String,
        require: true,
        
    },
    city: {
        type: String,
        required: true,
        

    },
    state:{
        type: String,
        require: true
    },
},
    {
        timestamps: true


    })
module.exports = mongoose.model('Address', addressSchema)