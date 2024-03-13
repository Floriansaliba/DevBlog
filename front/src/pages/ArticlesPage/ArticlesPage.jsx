import { useEffect } from 'react';
import './ArticlesPage.scss';
import SortArticles from '../../components/FilterArticles/SortArticles';
import MiniatureArticle from '../../components/MiniatureArticle/MiniatureArticle';
import Paging from '../../components/Paging/Paging';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/slices/ArticlesSlice';
import { selectArticles } from '../../store/Selectors/articlesSelector';

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);

  const numberOfArticlesPerPage = 14;
  const totalArticles = articles.length;
  const totalOfPages = Math.ceil(totalArticles / numberOfArticlesPerPage);
  console.log(totalOfPages);

  useEffect(() => {
    dispatch(fetchArticles());
  }, []);

  return (
    <>
      <SortArticles />
      <section id='articles'>
        {articles.length > 0 &&
          articles.map((article) => {
            console.log(article.imageName);
            return <MiniatureArticle key={article._id} article={article} />;
          })}
      </section>
      <Paging totalOfPages={totalOfPages} />
    </>
  );
};

export default ArticlesPage;
