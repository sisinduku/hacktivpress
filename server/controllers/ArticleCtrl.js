const Article = require('../models/Article')
const mongoose = require('mongoose')

class ArticleCtrl {
  static postArticle (req, res, next) {
    console.log(req.body);
    Article.create(req.body, function (err, inserted) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(inserted)
      }
    })
  }

  static getArticles (req, res, next) {
    Article.find({})
      .populate(['author'])
      .then((articles) => {
        res.status(200).json(articles)
      })
  }

  static getArticle (req, res, next) {
    Article.findOne({
        _id: req.params.articleId
      })
      .populate(['author'])
      .then((article) => {
        res.status(200).json(article);
      })
  }

  static getAuthorArticle (req, res, next) {
    Article.find({
        author: req.params.id
      })
      .populate(['author'])
      .then((articles) => {
        res.status(200).json(articles);
      })
  }

  static getCategoryArticle (req, res, next) {
    Article.find({
        category: req.params.category
      })
      .populate(['author'])
      .then((articles) => {
        res.status(200).json(articles);
      })
  }

  static updateArticle (req, res, next) {
    Article.findOneAndUpdate({
        _id: new mongoose.Types.ObjectId(req.params.articleId)
      }, req.body, {
        new: true
      })
      .populate(['author'])
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
        _id: new mongoose.Types.ObjectId(req.params.articleId)
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
