import { useState } from 'react';
import { addElement, modifyElement } from '../../store/slices/NewArticleSlice';
import { useDispatch } from 'react-redux';

// eslint-disable-next-line react/prop-types

/**
 *
 *Affiche le bloc de création d'un paragraphe d'article, pour l'administrateur
 */
const ParagraphCreator = ({ setContents, contents, modify, index, type }) => {
  const dispatch = useDispatch();
  const [modifiedParagraph, setModifiedParagraph] = useState(null);
  return (
    <>
      {modify ? (
        <div className='editor-bloc'>
          <h2 className='article-form__title'>PARAGRAPHE</h2>
          <textarea
            id='input-paragraph'
            onChange={(e) =>
              setModifiedParagraph({
                index: index,
                type: type,
                content: e.target.value,
              })
            }
            type='text'
            name='paragraph'
            rows='4'
            cols='50'
            placeholder='Entrez votre paragraphe ici'
          ></textarea>
          <button
            className='article-form__button'
            id='new-paragraph'
            onClick={(e) => {
              e.preventDefault();
              dispatch(modifyElement(modifiedParagraph));
            }}
          >
            Modifier paragraphe
          </button>
        </div>
      ) : (
        <div className='editor-bloc'>
          <h2 className='article-form__title'>PARAGRAPHE</h2>
          <textarea
            id='input-paragraph'
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
          <button
            className='article-form__button'
            id='new-paragraph'
            onClick={(e) => {
              e.preventDefault();
              // eslint-disable-next-line react/prop-types
              dispatch(addElement(contents.paragraph));
            }}
          >
            Ajouter Paragraphe{' '}
          </button>
        </div>
      )}
    </>
  );
};

export default ParagraphCreator;
