const mongoose = require('mongoose');
// const { boolean} = require('webidl-conversions');
const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // Phone: {
    //     type: String,
    //     required: true,
    //     unique: true

    // },
    email: { type: String},

    yourMessage: {
        type: String,
        required: true


    },
    
},
    {
        timestamps: true


    })
module.exports = mongoose.model('Contact', ContactSchema)