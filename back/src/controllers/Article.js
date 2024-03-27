const fs = require('fs');
const path = require('path');
const NewArticle = require('../repositories/NewArticle');

class Article {
  async postArticle(req, res) {
    try {
      const article = req.body;
      console.log(article);

      const base64Image = article.imageName.replace(
        /^data:image\/(png|jpeg|webp);base64,/,
        ''
      );

      const filename = `image-${Date.now()}.webp`;
      console.log(__dirname);
      const imagePath = path.join(__dirname, '../../public/images', filename);

      if (base64Image) {
        fs.writeFileSync(imagePath, base64Image, 'base64');
      }

      const newArticle = new NewArticle();
      newArticle.title = article.title;
      newArticle.imageName = filename;
      newArticle.date = new Date();
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

  async getArticle(req, res) {
    try {
      const { articleId } = req.params;
      const article = await NewArticle.findById(articleId);
      if (!article) {
        return res.status(404).send('Article non trouvé');
      }
      res.status(200).send({ article });
    } catch (error) {
      console.error(error);
      res.status(500).send('Une erreur est survenue');
    }
  }

  async addView(req, res) {
    try {
      const { articleId } = req.params;
      const article = await NewArticle.findById(articleId);
      if (!article) {
        return res.status(404).send('Article non trouvé');
      }
      article.views++;
      await article.save();
      res.status(200).send('Une vue ajoutée');
    } catch (error) {
      console.error(error);
      res.status(500).send(`Une erreur est survenue lors de l'ajout de la vue`);
    }
  }

  async addLike(req, res) {
    try {
      const { articleId } = req.params;
      const article = await NewArticle.findById(articleId);
      if (!article) {
        return res.status(404).send('Article non trouvé');
      }
      article.likes++;
      await article.save();
      res.status(200).send('Un like ajouté');
    } catch (error) {
      console.error(error);
      res.status(500).send(`Une erreur est survenue lors de l'ajout du like`);
    }
  }

  async deleteArticle(req, res) {
    try {
      const { articleId } = req.params;
      const article = await NewArticle.findByIdAndDelete(articleId);
      if (!article) {
        return res.status(404).send('Article non trouvé');
      }
      res.status(200).send('Article supprimé');
    } catch (error) {
      console.error(error);
      res.status(500).send(`Une erreur est survenue lors de la suppression`);
    }
  }
}

module.exports = Article;
