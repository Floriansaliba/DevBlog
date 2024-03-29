import { useDispatch, useSelector } from 'react-redux';
import { selectArticles } from '../../store/Selectors/articlesSelector';
import { useEffect } from 'react';
import { fetchArticles } from '../../store/slices/ArticlesSlice';
import MiniatureArticle from '../../components/MiniatureArticle/MiniatureArticle';

export const HomePage = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const mostPopularArticles = [...articles]
    .slice(0, 5)
    .sort((a, b) => b.likes - a.likes);

  const newestArticles = [...articles].slice(0, 5).sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  useEffect(() => {
    dispatch(fetchArticles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(articles);

  return (
    <>
      <h2>A la une</h2>
      {newestArticles.length > 0 &&
        newestArticles.map((article) => {
          console.log(article.imageName);
          return <MiniatureArticle key={article._id} article={article} />;
        })}
      <h2>Les plus populaires</h2>
      {mostPopularArticles.length > 0 &&
        mostPopularArticles.map((article) => {
          console.log(article.imageName);
          return <MiniatureArticle key={article._id} article={article} />;
        })}
    </>
  );
};
