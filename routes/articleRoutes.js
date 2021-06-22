const Article = require('../models/article')

const router = require('express').Router()

router.get('/new', (req, res, next)=>{
    res.render('../views/newArticles.ejs', {article:new Article()})
})
router.get('/edit/:id', async(req, res, next)=>{
    const article = await Article.findById(req.params.id)
    res.render('../views/edit.ejs', {article:article})
})
router.get('/:id', async (req, res, next)=>{
    const article = await Article.findById(req.params.id)
    
    if(article == null) res.redirect('/')
    res.render('../views/show.ejs', {article:article})
    
})
router.post('/', async(req, res, next)=>{

    let {
        title,
        description,
        markdown
    } = req.body
    // console.log(req.body)
    let article =  new Article(
        {
            title,
            description,
            markdown
        }
    )
    try{
         article = await article.save()
         res.redirect(`/articles/${article.id}`)
    }catch(e){
        console.log(e)
        res.render(`../views/newArticles.ejs`, {article:article})
    }
    
})
router.post('/:id', async(req, res, next)=>{
    let {
        title,
        description,
        markdown
    } = req.body
    const updateId = req.params.id
    console.log(req.body)
    const article =  await Article.findByIdAndUpdate(
        {_id:updateId},
        {
          title,
          description,
          markdown
        },
        {new:true}
    )
//     let article = Article.findById(req.params.id)
//     article.title = title
//     article.description = description
//     article.markdown = markdown
    try{
            // article = await article.save()
        res.redirect(`/articles/${updateId}`)
    }catch(e){
        console.log(e)
        res.render(`../views/newArticles.ejs`, {article:article})
    }
})
router.delete('/:id', async(req, res, next)=>{
    await Article.findByIdAndDelete(req.params.id)
    res.redirect('/')
})
function saveArticleAndRedirect (){
    return async(path)=>{
        
    }
}
module.exports = router
