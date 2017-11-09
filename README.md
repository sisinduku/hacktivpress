# hacktivpress

## Setup NPM in client and server
```
npm install

then

Setup .env in client and server
```
## API Documentation
| Method | URI | Description
| :------------- | :------------- | :------------- |
| GET       | /api/auth       | Get Authentication Token |
| GET       | /api/articles/get_articles       | Get All Articles |
| GET       | /api/articles/get_article/:articleId       | Get Articles |
| GET       | /api/articles/get_author_articles/:id       | Get Articles by Author |
| GET       | /api/articles/get_category_articles/:category       | Get Articles by Category |
| POST       | /api/articles/post_article       | Post New Articles |
| PUT       | /api/articles/update_article/:articleId       | Update Articles |
| DELETE       | /api/articles/delete_article/:articleId       | Delete Articles |
