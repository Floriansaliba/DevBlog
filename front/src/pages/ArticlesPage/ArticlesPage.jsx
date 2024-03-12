import { useEffect, useState } from 'react';
import SortArticles from '../../components/FilterArticles/SortArticles';
import MiniatureArticle from '../../components/MiniatureArticle/MiniatureArticle';
import Paging from '../../components/Paging/Paging';
import axios from 'axios';

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  useEffect(() => {
    axios
      .get('http://localhost:3000/articles')
      .then((response) => {
        const fetchedArticles = response.data.articles;
        console.log(fetchedArticles);
        setArticles(fetchedArticles);
      })
      .catch((error) => {
        console.error('Erreur lors de la requête:', error);
      });
  }, []);
  return (
    <>
      <SortArticles />
      {articles.length > 0 &&
        articles.map((article, index) => {
          console.log(article.imageName);
          return (
            <MiniatureArticle
              key={index}
              title={article.title}
              imageName={article.imageName}
              likes={article.likes}
              views={article.views}
              id={article.id}
            />
          );
        })}
      <Paging />
    </>
  );
};

export default ArticlesPage;
