const mongoose = require('mongoose');
// const { boolean} = require('webidl-conversions');
const CategoriesSchema = new mongoose.Schema({
    popular: {
        type: Array
    },
    TopBranding: {
        type: Array
    },
    Marketing: {
        type: Array
    },
    Sales: {
        type: Array
    }, 
    Business: {
        type: Array
    }, 
    Technology: {
        type: Array
    },
    Managment: {
        type: Array
    },
    personalConsultant: {
        type: Array
    },
    
    Logistic: {
        type: Array
    },
},
    {
        timestamps: true


    })
module.exports = mongoose.model('Categories', CategoriesSchema)