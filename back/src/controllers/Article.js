const fs = require('fs');
const path = require('path');
const NewArticle = require('../repositories/NewArticle');

class Article {
  async postArticle(req, res) {
    try {
      const article = req.body;
      console.log(article);

      const base64Image = article.image.replace(
        /^data:image\/(png|jpeg);base64,/,
        ''
      );

      const filename = `image-${Date.now()}.png`;
      console.log(__dirname);
      const imagePath = path.join(__dirname, '../../public/images', filename);

      if (base64Image) {
        fs.writeFileSync(imagePath, base64Image, 'base64');
      }

      const newArticle = new NewArticle();
      newArticle.title = article.title;
      newArticle.imageName = filename;
      newArticle.date = Date.now();
      newArticle.content = article.elements;
      newArticle.likes = 0;
      newArticle.views = 0;
      await newArticle.save();

      res.status(200).send('Article posted successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while posting the article');
    }
  }
  async getArticles(req, res) {
    try {
      const articles = await NewArticle.find();

      res.status(200).send({ articles });
    } catch (error) {
      console.error(error);
      res.status(500).send('An error occurred while getting the articles');
    }
  }
}

module.exports = Article;
