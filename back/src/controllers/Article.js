const fs = require('fs');
const path = require('path');
const NewArticle = require('../repositories/NewArticle');

class Article {
  async postArticle(req, res) {
    try {
      const article = req.body;
      // Validation du titre
      if (
        !article.title ||
        typeof article.title !== 'string' ||
        article.title.trim() === ''
      ) {
        return res.status(400).send({
          message: 'Le titre est requis et doit être une chaîne non vide.',
        });
      }

      // Validation de l'image
      if (
        !article.imageName ||
        typeof article.imageName !== 'string' ||
        article.imageName.trim() === ''
      ) {
        return res.status(400).send({
          message: 'Une image est requise',
        });
      }

      // Validation du contenu
      if (article.content.length === 0) {
        return res.status(400).send({
          message:
            "L'article doit contenir au moins un sous-titre et un paragraphe.",
        });
      }

      // Enregistrement de l'image au format WEBP
      const base64Image = article.imageName.replace(
        /^data:image\/(png|jpeg|webp);base64,/,
        ''
      );

      const filename = `image-${Date.now()}.webp`;
      const imagePath = path.join(__dirname, '../../public/images', filename);

      if (base64Image) {
        fs.writeFileSync(imagePath, base64Image, 'base64');
      }

      // Enregistrement de l'article en BDD

      const newArticle = new NewArticle();
      newArticle.title = article.title;
      newArticle.imageName = filename;
      newArticle.date = new Date();
      newArticle.content = article.content;
      newArticle.likes = 0;
      newArticle.views = 0;
      await newArticle.save();

      res.status(201).send('Article posted successfully');
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

  async addDislike(req, res) {
    try {
      const { articleId } = req.params;
      const article = await NewArticle.findById(articleId);
      if (!article) {
        return res.status(404).send('Article non trouvé');
      }
      article.likes--;
      await article.save();
      res.status(200).send('Un dislike ajouté');
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .send(`Une erreur est survenue lors de l'ajout du dislike`);
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

  async modifyArticle(req, res) {
    try {
      const newArticle = req.body.article;
      const { articleId } = req.params;

      // Validation du titre
      if (
        !newArticle.title ||
        typeof newArticle.title !== 'string' ||
        newArticle.title.trim() === ''
      ) {
        return res.status(400).send({
          message: 'Le titre est requis et doit être une chaîne non vide.',
        });
      }

      // Validation de l'image
      if (
        !newArticle.imageName ||
        typeof newArticle.imageName !== 'string' ||
        newArticle.imageName.trim() === ''
      ) {
        return res.status(400).send({
          message: 'Une image est requise',
        });
      }

      // Validation du contenu
      if (newArticle.content.length === 0) {
        return res.status(400).send({
          message:
            "L'article doit contenir au moins un sous-titre et un paragraphe.",
        });
      }

      // Si l'image est en base64 on l'enregistre au format WEBP
      if (newArticle.imageName.startsWith('data:image/')) {
        // Enregistrement de l'image au format WEBP
        const base64Image = newArticle.imageName.replace(
          /^data:image\/(png|jpeg|webp);base64,/,
          ''
        );

        // Renommer l'image au format WEBP
        const filename = `image-${Date.now()}.webp`;
        const imagePath = path.join(__dirname, '../../public/images', filename);

        // Enregistrement de l'image
        if (base64Image) {
          fs.writeFileSync(imagePath, base64Image, 'base64');
        }

        // La propriété 'imageName' prend le nom de l'image avec le format WEBP
        newArticle.imageName = filename;
      }

      // Remplacement de l'article en BDD
      const article = await NewArticle.findByIdAndUpdate(articleId, newArticle);
      if (!article) {
        return res.status(404).send('Article non trouvé');
      }
      res.status(200).send('Article modifié');
    } catch (error) {
      console.error(error);
      res.status(500).send(`Une erreur est survenue lors de la modification`);
    }
  }
}

module.exports = Article;
