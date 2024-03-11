import { useSelector } from 'react-redux';
import { selectNewArticle } from '../../store/Selectors/newArticleSelector';
import './ArticleView.scss';

const ArticleView = () => {
  const article = useSelector(selectNewArticle);

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
          <pre id={element.id}>
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
