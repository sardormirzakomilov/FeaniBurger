const { Schema , model } = require('mongoose')


const adminSchema = new Schema ({
    name: {
        type:String,
        required: true
    },
    number: {
        type:Number,
        required: true,

    },
    adminType: {
        type:String,
        required: true,
    },
    password: {
        type:String,
        required: true,
        minlength:6
    }

})

module.exports = model('admin' , adminSchema)