import { useDispatch, useSelector } from 'react-redux';
import {
  selectArticleToModify,
  selectNewArticle,
} from '../../store/Selectors/newArticleSelector';
import './ArticleView.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { useEffect, useState } from 'react';
import { ArticleActionBar } from '../ArticleActionBar/ArticleActionBar';
import axios from 'axios';
import { deleteElement } from '../../store/slices/NewArticleSlice';
import ParagraphCreator from '../ParagraphCreator/ParagraphCreator';
import CodeCreator from '../CodeCreator/CodeCreator';
import SubtitleCreator from '../SubtitleCreator/SubtitleCreator';
import { useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types

/**
 *
 * Gère la vue d'un nouvel article ou d'un article existant (possédant un id)
 */
const ArticleView = ({ id }) => {
  const articleToModify = useSelector(selectArticleToModify);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);
  const pathName = useLocation().pathname;

  const dispatch = useDispatch();

  const newArticle = useSelector(selectNewArticle);

  const fetchArticle = async () => {
    if (id) {
      try {
        const response = await axios.get(
          `http://localhost:3000/articles/${id}`
        );
        if (response.status === 200) {
          setSelectedArticle(response.data.article);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    // highlight du code
    const highlightCode = () => {
      const nodes = document.querySelectorAll('pre code');
      nodes.forEach((node) => hljs.highlightElement(node));
    };
    if (!loading) {
      highlightCode();
    }
  }, [selectedArticle, newArticle, loading]);

  const handleEditClick = (e, index) => {
    console.log(e);
    e.preventDefault();
    setEditingIndex(index);
  };

  // Affiche tous le contenu de l'article (sous-titres, paragraphe, et bloc de code) en fonction du type d'élément à afficher
  const renderArticleElement = (element, index) => {
    switch (element.type) {
      case 'subtitle':
        return (
          <div className='article__subtitle-frame' key={index}>
            <h2 id={element.id} className='article__subtitle'>
              {element.content}
              {pathName === '/nouvel-article' && (
                <>
                  {' '}
                  <button
                    className='modify-element'
                    onClick={(e) => handleEditClick(e, index)}
                  >
                    modifier
                  </button>
                  <button
                    className='delete-element'
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        deleteElement({ index: index, type: element.type })
                      );
                    }}
                  >
                    Supprimer
                  </button>
                </>
              )}
            </h2>
            {editingIndex === index && (
              <SubtitleCreator
                modify={true}
                index={index}
                type={element.type}
              />
            )}
          </div>
        );
      case 'paragraph':
        return (
          <div className='article__subtitle-frame' key={index}>
            <p id={element.id} className='article__paragraph'>
              {element.content}
              {pathName === '/nouvel-article' && (
                <>
                  {' '}
                  <button
                    className='modify-element'
                    onClick={(e) => handleEditClick(e, index)}
                  >
                    modifier
                  </button>
                  <button
                    className='delete-element'
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        deleteElement({ index: index, type: element.type })
                      );
                    }}
                  >
                    Supprimer
                  </button>{' '}
                </>
              )}
            </p>
            {editingIndex === index && (
              <ParagraphCreator
                modify={true}
                index={index}
                type={element.type}
              />
            )}
          </div>
        );
      case 'code':
        return (
          <div className='article__code' key={index}>
            <pre id={element.id}>
              <code>{element.content}</code>
              {pathName === '/nouvel-article' && (
                <>
                  {' '}
                  <button
                    className='modify-element'
                    onClick={(e) => handleEditClick(e, index)}
                  >
                    modifier
                  </button>
                  <button
                    className='delete-element'
                    onClick={(e) => {
                      e.preventDefault();
                      dispatch(
                        deleteElement({ index: index, type: element.type })
                      );
                    }}
                  >
                    Supprimer
                  </button>
                </>
              )}
            </pre>
            {editingIndex === index && (
              <CodeCreator modify={true} index={index} type={element.type} />
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {!loading ? (
        <>
          <article className='article'>
            <h1 className='article__title'>
              {id ? selectedArticle.title : newArticle.title}
            </h1>

            <img
              className='article__image'
              src={
                id
                  ? `http://localhost:3000/images/${selectedArticle.imageName}`
                  : articleToModify
                  ? `http://localhost:3000/images/${articleToModify.imageName}`
                  : newArticle.imageName
              }
              alt={id ? selectedArticle.title : newArticle.title}
            />
            {id
              ? selectedArticle.content.map((element, index) =>
                  renderArticleElement(element, index)
                )
              : newArticle.content.map((element, index) =>
                  renderArticleElement(element, index)
                )}
            {id && (
              <ArticleActionBar
                id={id}
                date={selectedArticle && selectedArticle.date}
              />
            )}
          </article>
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </>
  );
};

export default ArticleView;
