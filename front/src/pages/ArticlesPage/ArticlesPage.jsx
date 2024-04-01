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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SortArticles />

      <section id='articles'>
        <div className='display-frame'>
          {articles.length > 0 &&
            articles.map((article) => {
              return <MiniatureArticle key={article._id} article={article} />;
            })}
        </div>
      </section>
      <Paging totalOfPages={totalOfPages} />
    </>
  );
};

export default ArticlesPage;
