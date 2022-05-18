const mongoose = require('mongoose')
const BrandSchema = new mongoose.Schema({
    TokuyamaDental: {
        type: String,
        require: true,
    },
    Faro: {
        type: String,
        require: true

    },

},
    {
        timestamps: true


    })
module.exports = mongoose.model('Brand', BrandSchema)