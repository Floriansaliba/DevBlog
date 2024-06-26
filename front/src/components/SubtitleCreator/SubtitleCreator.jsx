/* eslint-disable react/prop-types */
import { useDispatch } from 'react-redux';
import { addElement, modifyElement } from '../../store/slices/NewArticleSlice';
import { useState } from 'react';

/*
Affiche le bloc de création d'un sous-titre d'article pour l'administrateur
*/
const SubtitleCreator = ({ setContents, contents, modify, index, type }) => {
  const dispatch = useDispatch();
  const [modifiedTitle, setModifiedTitle] = useState(null);
  return (
    <>
      {modify ? (
        <div className='editor-bloc'>
          <input
            id='input-subtitle'
            aria-label='sous-titre'
            onChange={(e) =>
              setModifiedTitle({
                index: index,
                type: type,
                content: e.target.value,
              })
            }
            type='text'
            name='subtitle'
            placeholder='Ajouter un sous-titre'
          />
          <br />
          <button
            className='article-form__button'
            onClick={(e) => {
              e.preventDefault();
              dispatch(modifyElement(modifiedTitle));
            }}
          >
            Modifier sous-titre
          </button>
        </div>
      ) : (
        <div className='editor-bloc'>
          <h2 className='article-form__title'>SOUS-TITRE</h2>
          <input
            id='input-subtitle'
            onChange={(e) =>
              setContents({
                ...contents,
                subtitle: { type: 'subtitle', content: e.target.value },
              })
            }
            type='text'
            name='subtitle'
            aria-label='sous-titre'
            placeholder='Ajouter un sous-titre'
          />
          <br />
          <button
            className='article-form__button'
            onClick={(e) => {
              e.preventDefault();
              dispatch(addElement(contents.subtitle));
            }}
          >
            Ajouter sous-titre{' '}
          </button>
        </div>
      )}
    </>
  );
};

export default SubtitleCreator;
