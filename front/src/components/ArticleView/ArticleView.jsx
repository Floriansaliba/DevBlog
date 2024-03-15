import { useSelector } from 'react-redux';
import { selectNewArticle } from '../../store/Selectors/newArticleSelector';
import './ArticleView.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { useEffect } from 'react';
import { selectArticles } from '../../store/Selectors/articlesSelector';
import { ArticleActionBar } from '../ArticleActionBar/ArticleActionBar';

// eslint-disable-next-line react/prop-types
const ArticleView = ({ id }) => {
  const articles = useSelector(selectArticles);
  const selectedArticle = articles.find((article) => article._id === id);
  console.log(articles, selectedArticle);

  const newArticle = useSelector(selectNewArticle);

  useEffect(() => {
    const highlightCode = () => {
      const nodes = document.querySelectorAll('pre code');
      nodes.forEach((node) => hljs.highlightBlock(node));
    };
    highlightCode();
  });

  const renderArticleElement = (element, index) => {
    switch (element.type) {
      case 'subtitle':
        return (
          <h2 id={element.id} className='article__subtitle' key={index}>
            {element.content}
          </h2>
        );
      case 'paragraph':
        return (
          <p id={element.id} className='article__paragraph' key={index}>
            {element.content}
          </p>
        );
      case 'code':
        return (
          <pre id={element.id} key={index}>
            <code>{element.content}</code>
          </pre>
        );
      default:
        return null;
    }
  };
  return (
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
          : newArticle.elements.map((element, index) =>
              renderArticleElement(element, index)
            )}
      </article>
      {id && <ArticleActionBar id={id} />}
    </>
  );
};

export default ArticleView;
