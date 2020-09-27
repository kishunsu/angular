const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;
// const HeadingSchema = new Schema({
//     name:String,
//     description: String
// })

const ProductScnema = new Schema({
    coverImage: String,
    name: { type: String, required: true, max: [60, '最大60文字までです'] },
    price: Number,
    description: String,
    // heading1 : String,
    heading: [{
        name: String,
        description: String,
    }],
});

module.exports = mongoose.model('Product', ProductScnema)
