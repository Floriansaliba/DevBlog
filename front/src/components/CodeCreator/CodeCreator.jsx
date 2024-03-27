import { useDispatch } from 'react-redux';
import { addElement, modifyElement } from '../../store/slices/NewArticleSlice';
import { useState } from 'react';

// eslint-disable-next-line react/prop-types
const CodeCreator = ({ setContents, contents, modify, index, type }) => {
  const dispatch = useDispatch();
  const [modifiedCode, setModifiedCode] = useState(null);
  return (
    <>
      {modify ? (
        <div className='editor-bloc'>
          <h2 className='article-form__title'>CODE</h2>
          <textarea
            id='input-code'
            onChange={(e) =>
              setModifiedCode({
                index: index,
                type: type,
                content: e.target.value,
              })
            }
            name='code'
            rows='8'
            cols='50'
            placeholder='Insérez votre code ici'
          ></textarea>
          <br />
          <button
            className='article-form__button'
            onClick={(e) => {
              e.preventDefault();
              dispatch(modifyElement(modifiedCode));
            }}
          >
            Modifier code
          </button>
        </div>
      ) : (
        <div className='editor-bloc'>
          <h2 className='article-form__title'>CODE</h2>
          <textarea
            id='input-code'
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
            className='article-form__button'
            onClick={(e) => {
              e.preventDefault();
              // eslint-disable-next-line react/prop-types
              dispatch(addElement(contents.code));
            }}
          >
            Ajouter code{' '}
          </button>
        </div>
      )}
    </>
  );
};

export default CodeCreator;
