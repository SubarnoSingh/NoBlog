const { Schema, model } = require("mongoose");



const blogSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    coverImageURL :{
        type: String,
        required: true,
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        red : "user",
    },
}, {timestamps : true});


const Blog = model('blog' , blogSchema);

module.exports = Blog