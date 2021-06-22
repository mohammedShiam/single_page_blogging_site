const express = require('express')
const Article = require('./models/article')
const mongoose = require('mongoose')
const app = express()
const articleRoute = require('./routes/articleRoutes')
const methodOverride = require('method-override') 


// View Engine Setup
app.set('view engine', 'ejs')
app.set('views', 'views')

// Middleware Used Here
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
// Routers Imported


app.use('/articles',articleRoute )


app.get('/', async(req, res, next)=>{
    let articles = await Article.find().sort({createdAt:'desc'})
    res.render('./homepage.ejs', {articles:articles})
})

// MongoString

const monogURI = 'mongodb+srv://User01:user01@cluster0.snr3u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
const PORT = process.env.PORT || '2003'

mongoose.connect(monogURI, {
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(e=>{

    app.listen(PORT, (e=>{
        console.log('SERVER CONNECTION IS OKAY')
    }))
    
})
.catch(e=>{
    console.log(e)
})
// TODO: Last Video was 32 min.