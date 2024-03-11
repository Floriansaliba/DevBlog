import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './NewArticleForm.scss';
import {
  addTitle,
  addElement,
  addImage,
} from '../../store/slices/NewArticleSlice';
import ArticleView from '../ArticleView/ArticleView';
import { v4 as uuidv4 } from 'uuid';
import { selectNewArticle } from '../../store/Selectors/newArticleSelector';

const NewArticleForm = () => {
  const article = useSelector(selectNewArticle);
  const dispatch = useDispatch();

  const [editorBlocsDisplay, setEditorBlocs] = useState({
    subtitle: true,
    paragraph: true,
    code: true,
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
            <button>AJOUTER SOUS-TITRE</button>
            <button>AJOUTER PARAGRAPHE</button>
            <button>AJOUTER CODE</button>
          </section>
          <div
            className='editor-bloc'
            style={{ display: editorBlocsDisplay.paragraph ? 'block' : 'none' }}
          >
            {' '}
            <h2 className='article-form__title'>PARAGRAPHE</h2>
            <textarea
              onChange={(e) =>
                setContents({
                  ...contents,
                  paragraph: { type: 'paragraph', content: e.target.value },
                })
              }
              type='text'
              name='paragraph'
              rows='4'
              cols='50'
              placeholder='Entrez votre paragraphe ici'
            ></textarea>
            <br />
            <button
              id='new-paragraph'
              onClick={(e) => {
                e.preventDefault();
                dispatch(addElement(contents.paragraph));
              }}
            >
              Ajouter Paragraphe{' '}
            </button>
          </div>
          <div
            className='editor-bloc'
            style={{ display: editorBlocsDisplay.subtitle ? 'block' : 'none' }}
          >
            {' '}
            <h2 className='article-form__title'>SOUS-TITRE</h2>
            <input
              onChange={(e) =>
                setContents({
                  ...contents,
                  subtitle: { type: 'subtitle', content: e.target.value },
                })
              }
              type='text'
              name='subtitle'
              placeholder='Ajouter un sous-titre'
            />
            <br />
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addElement(contents.subtitle));
              }}
            >
              Ajouter sous-titre{' '}
            </button>
          </div>
          <div
            className='editor-bloc'
            style={{ display: editorBlocsDisplay.code ? 'block' : 'none' }}
          >
            {' '}
            <h2 className='article-form__title'>CODE</h2>
            <textarea
              onChange={(e) =>
                setContents({
                  ...contents,
                  code: { type: 'code', content: e.target.value },
                })
              }
              name='code'
              rows='8'
              cols='50'
              placeholder='Insérez votre code ici'
            ></textarea>
            <br />
            <button
              onClick={(e) => {
                e.preventDefault();
                dispatch(addElement(contents.code));
              }}
            >
              Ajouter code{' '}
            </button>
          </div>
        </div>
        <ArticleView />
        <input
          type='submit'
          value={'Publier'}
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        />
      </form>
    </>
  );
};

export default NewArticleForm;
