const express = require('express')
const router = express.Router()

const ArticleCtrl = require('../controllers/ArticleCtrl')

router.post('/post_article/', ArticleCtrl.postArticle);
router.get('/get_articles/', ArticleCtrl.getArticles)
router.get('/get_article/:articleId', ArticleCtrl.getArticle)
router.get('/get_author_articles/:id', ArticleCtrl.getAuthorArticle)
router.get('/get_category_articles/:category', ArticleCtrl.getCategoryArticle)
router.put('/update_article/:articleId', ArticleCtrl.updateArticle)
router.delete('/delete_article/:articleId', ArticleCtrl.deleteArticle)

module.exports = router;
