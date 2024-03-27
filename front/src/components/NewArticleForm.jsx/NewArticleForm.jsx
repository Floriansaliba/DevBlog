import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './NewArticleForm.scss';
import {
  addTitle,
  addImage,
  copyArticleToModifyAsNewArticle,
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

// Formulaire permettant de créer un nouvel article, ou de modifier un article existant

const NewArticleForm = () => {
  const dispatch = useDispatch();
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
    try {
      const response = await axios.post(
        'http://localhost:3000/new-article',
        article
      );
      console.log(response.data);
    } catch (err) {
      console.error('Erreur lors de l envoi de la requête:', err.response);
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
            value={article.title}
          />
          <h2 className='article-form__title'>IMAGE :</h2>
          <input
            className='article-form__button'
            id='fileInput'
            onChange={handleImageChange}
            type='file'
            accept='image/*'
            name='image'
          />

          {image && (
            <img
              src={image}
              alt='Uploaded image'
              style={{ width: '100px', height: 'auto' }}
            />
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
