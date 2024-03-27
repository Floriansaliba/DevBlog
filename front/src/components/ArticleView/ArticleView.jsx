import { useDispatch, useSelector } from 'react-redux';
import { selectNewArticle } from '../../store/Selectors/newArticleSelector';
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

// eslint-disable-next-line react/prop-types
const ArticleView = ({ id }) => {
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingIndex, setEditingIndex] = useState(null);

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
          console.log(response.data.article);
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

  const renderArticleElement = (element, index) => {
    switch (element.type) {
      case 'subtitle':
        return (
          <div key={index}>
            <h2 id={element.id} className='article__subtitle'>
              {element.content}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteElement({ index: index, type: element.type }));
                }}
              >
                delete
              </button>
              <button onClick={(e) => handleEditClick(e, index)}>modify</button>
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
          <div key={index}>
            <p id={element.id} className='article__paragraph'>
              {element.content}
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteElement({ index: index, type: element.type }));
                }}
              >
                delete
              </button>
              <button onClick={(e) => handleEditClick(e, index)}>modify</button>
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
          <div key={index}>
            <pre id={element.id}>
              <code>{element.content}</code>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(deleteElement({ index: index, type: element.type }));
                }}
              >
                delete
              </button>
              <button onClick={(e) => handleEditClick(e, index)}>modify</button>
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
                  : newArticle.image
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
          </article>
          {id && (
            <ArticleActionBar
              id={id}
              date={selectedArticle && selectedArticle.date}
            />
          )}
        </>
      ) : (
        <p>Chargement...</p>
      )}
    </>
  );
};

export default ArticleView;
