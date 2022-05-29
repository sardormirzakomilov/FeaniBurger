const { Schema, model } = require('mongoose')


const shopping = new Schema({
    name: {
        type: String,
        required: true
    },
  
    price: {
        type: String,
        required: true,
    },
    userId:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
})

module.exports = model('shop', shopping)