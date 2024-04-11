import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './NewArticleForm.scss';
import {
  addTitle,
  addImage,
  copyArticleToModifyAsNewArticle,
  clearNewArticle,
  modifyImage,
} from '../../store/slices/NewArticleSlice';
import ArticleView from '../ArticleView/ArticleView';
import { v4 as uuidv4 } from 'uuid';
import {
  selectArticleToModify,
  selectNewArticle,
} from '../../store/Selectors/newArticleSelector';
import ParagraphCreator from '../ParagraphCreator/ParagraphCreator';
import SubtitleCreator from '../SubtitleCreator/SubtitleCreator';
import CodeCreator from '../CodeCreator/CodeCreator';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../../utils/constantes';

// Composant permettant de créer un nouvel article, ou de modifier un article existant ainsi que de prévisualiser ce dernier.
// Déclenche des 'toast messages' afin de notifier l'administrateur en cas d'erreur ou de succès lors de l'envoi du formulaire
const NewArticleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const articleToModify = useSelector(selectArticleToModify);
  const article = useSelector(selectNewArticle);

  if (articleToModify) {
    dispatch(copyArticleToModifyAsNewArticle());
  }

  const [editorBlocsDisplay, setEditorBlocs] = useState({
    subtitle: true,
    paragraph: false,
    code: false,
  });
  const [contents, setContents] = useState({
    subtitle: { id: uuidv4(), type: 'subtitle', content: '' },
    paragraph: { id: uuidv4(), type: 'paragraph', content: '' },
    code: { id: uuidv4(), type: 'code', content: '' },
  });
  const [image, setImage] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // Lors de la modification d'un article existant
    if (articleToModify !== null) {
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          dispatch(modifyImage(base64String));
          setImage(base64String);
        };
        reader.readAsDataURL(file);
      }
      return;
    }
    // Lors de la création d'un nouvel article

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result;
        dispatch(addImage(base64String));
        setImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    // Si l'article est un article à modifier, on le modifie en BDD :
    if (articleToModify !== null) {
      // Vérification du titre
      if (!article.title) {
        toast.error('Veuillez ajouter un titre');
        return;
      }
      // Vérification de l'image
      if (!article.imageName) {
        toast.error('Veuillez ajouter une image');
        return;
      }
      // Vérification du contenu de l'article
      let subtitles = 0;
      let paragraphs = 0;

      article.content.forEach((el) => {
        if (el.type === 'subtitle') {
          subtitles++;
        }
        if (el.type === 'paragraph') {
          paragraphs++;
        }
      });

      if (subtitles < 1 || paragraphs < 1) {
        toast.error('Veuillez ajouter au moins un sous-titre et un paragraphe');
        return;
      }
      // Envoi de la requête
      try {
        const response = await axios.put(
          `${BASE_URL}/articles/${article._id}/modify`,
          { article },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
          }
        );
        if (response.status === 200) {
          toast.success('Modification enregistrée !');
          dispatch(clearNewArticle());
          navigate('/dashboard');
        }
      } catch (err) {
        toast.error(err.message);
      }

      return;
    }

    // Si l'article est un nouvel article:
    try {
      // Vérification du titre
      if (!article.title) {
        toast.error('Veuillez ajouter un titre');
        return;
      }
      // Vérification de l'image
      if (!article.imageName) {
        toast.error('Veuillez ajouter une image');
        return;
      }
      // Vérification du contenu de l'article
      let subtitles = 0;
      let paragraphs = 0;
      article.content.forEach((el) => {
        if (el.type === 'subtitle') {
          subtitles++;
        }
        if (el.type === 'paragraph') {
          paragraphs++;
        }
      });

      if (subtitles < 1 || paragraphs < 1) {
        toast.error('Veuillez ajouter au moins un sous-titre et un paragraphe');
        return;
      }

      // Envoi de la requête
      const response = await axios.post(`${BASE_URL}/new-article`, article, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      if (response.status === 400) {
        toast.error(response.data.message);
        return;
      }
      if (response.status === 201) {
        toast.success('Nouvel article enregistré !');
        dispatch(clearNewArticle());
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  const handleBlocsDisplay = (e, type) => {
    e.preventDefault();
    switch (type) {
      case 'subtitle':
        setEditorBlocs({
          subtitle: true,
          paragraph: false,
          code: false,
        });
        break;
      case 'paragraph':
        setEditorBlocs({
          subtitle: false,
          paragraph: true,
          code: false,
        });
        break;
      case 'code':
        setEditorBlocs({
          subtitle: false,
          paragraph: false,
          code: true,
        });
        break;
      default:
        console.error('Error : executing action');
    }
  };

  return (
    <>
      <form className='article-form' action='post'>
        <div id='editor-bloc'>
          <h2 className='article-form__title'>TITRE :</h2>
          <input
            className='article-form__title-input'
            onChange={(e) => dispatch(addTitle(e.target.value))}
            type='text'
            name='title'
            aria-label="Titre de l'article"
            value={article.title}
          />
          <h2 className='article-form__title'>IMAGE :</h2>
          <input
            className='article-form__button'
            id='fileInput'
            onChange={handleImageChange}
            type='file'
            aria-label='Ajouter une image'
            accept='image/*'
            name='image'
          />
          <br />

          {image && (
            <img id='fileInput-image' src={image} alt='Uploaded image' />
          )}
          <section id='action-buttons'>
            <button
              className={
                editorBlocsDisplay.subtitle
                  ? 'article-form__button--active'
                  : 'article-form__button'
              }
              onClick={(e) => handleBlocsDisplay(e, 'subtitle')}
            >
              AJOUTER SOUS-TITRE
            </button>
            <button
              className={
                editorBlocsDisplay.paragraph
                  ? 'article-form__button--active'
                  : 'article-form__button'
              }
              onClick={(e) => handleBlocsDisplay(e, 'paragraph')}
            >
              AJOUTER PARAGRAPHE
            </button>
            <button
              className={
                editorBlocsDisplay.code
                  ? 'article-form__button--active'
                  : 'article-form__button'
              }
              onClick={(e) => handleBlocsDisplay(e, 'code')}
            >
              AJOUTER CODE
            </button>
          </section>
          {editorBlocsDisplay.paragraph && (
            <ParagraphCreator setContents={setContents} contents={contents} />
          )}
          {editorBlocsDisplay.subtitle && (
            <SubtitleCreator setContents={setContents} contents={contents} />
          )}

          {editorBlocsDisplay.code && (
            <CodeCreator setContents={setContents} contents={contents} />
          )}
        </div>
        <ArticleView />
        <div id='publish-bloc'>
          <input
            id='publish-button'
            type='submit'
            value={articleToModify ? 'Modifier' : 'Publier'}
            onClick={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          />
        </div>
      </form>
    </>
  );
};

export default NewArticleForm;
