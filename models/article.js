const {Schema, model} = require('mongoose')

const articleSchema = new Schema({
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true
    },
    markdown:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

const Article = model('Article', articleSchema);

module.exports = Article