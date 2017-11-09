const Article = require('../models/Article')

class ArticleCtrl {
  static postArticle (req, res, next) {
    Article.create(req.body)
      .then((inserted) => {
        res.status(201).json(inserted);
      })
      .catch((err) => {
        res.status(400).json(err);
      })
  }

  static getArticles (req, res, next) {
    Article.find({})
      .populate(['User'])
      .then((articles) => {
        res.status(200).json(articles)
      })
  }

  static getArticle (req, res, next) {
    Article.findOne({
        _id: req.params.articleId
      })
      .populate(['User'])
      .then((article) => {
        res.status(200).json(article);
      })
  }

  static getAuthorArticle (req, res, next) {
    Article.find({
        author: req.params.id
      })
      .populate(['User'])
      .then((articles) => {
        res.status(200).json(articles);
      })
  }

  static getCategoryArticle (req, res, next) {
    Article.find({
        category: req.params.category
      })
      .populate(['User'])
      .then((articles) => {
        res.status(200).json(articles);
      })
  }

  static updateArticle (req, res, next) {
    Article.findOneAndUpdate({
        _id: new ObjectId(req.params.articleId)
      }, req.body)
      .then((updated) => {
        res.status(200).json(updated);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }

  static deleteArticle (req, res, next) {
    Article.findOneAndRemove({
        _id: new ObjectId(req.params.articleId)
      })
      .then((value) => {
        res.status(200).json(value);
      })
      .catch((err) => {
        console.error(err);
        res.status(400).json(err);
      })
  }

}

module.exports = ArticleCtrl;
