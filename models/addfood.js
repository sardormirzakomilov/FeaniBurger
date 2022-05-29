const { Schema , model } = require('mongoose')


const addfoodSchema = new Schema ({
    name: {
        type:String,
        required: true
    },
    textarea: {
        type:String,
        required: true,

    },
    img: {
        type:String,
        required: true,
  
    },
    price: {
        type:String,
        required: true,
  
    },
    categoryId: {
        ref:'category',
        type: Schema.Types.ObjectId,
        required: true,
  
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required:true

    }

})

module.exports = model('food' , addfoodSchema)