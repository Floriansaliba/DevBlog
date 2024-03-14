import { useSelector } from 'react-redux';
import { selectNewArticle } from '../../store/Selectors/newArticleSelector';
import './ArticleView.scss';
import hljs from 'highlight.js';
import 'highlight.js/styles/default.css';
import { useEffect } from 'react';

const ArticleView = () => {
  const article = useSelector(selectNewArticle);

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
        <h1 className='article__title'>{article.title}</h1>
        <img
          className='article__image'
          src={article.image}
          alt={article.title}
        />
        {article.elements.map((element, index) =>
          renderArticleElement(element, index)
        )}
      </article>
    </>
  );
};

export default ArticleView;
