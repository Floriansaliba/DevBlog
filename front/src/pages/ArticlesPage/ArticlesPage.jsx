import { useEffect } from 'react';
import './ArticlesPage.scss';
import SortArticles from '../../components/FilterArticles/SortArticles';
import MiniatureArticle from '../../components/MiniatureArticle/MiniatureArticle';
import Paging from '../../components/Paging/Paging';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArticles } from '../../store/slices/ArticlesSlice';
import {
  currentPage,
  numberOfArticlesPerPage,
  selectArticles,
  selectLoading,
} from '../../store/Selectors/articlesSelector';

const ArticlesPage = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const loading = useSelector(selectLoading);
  const pageNumber = useSelector(currentPage);
  const articlesPerPage = useSelector(numberOfArticlesPerPage);

  useEffect(() => {
    dispatch(fetchArticles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  // Calcul des indices pour le slicing des articles
  const indexOfFirstArticle = (pageNumber - 1) * articlesPerPage;
  const indexOfLastArticle = indexOfFirstArticle + articlesPerPage;
  const articlesToShow = articles.slice(
    indexOfFirstArticle,
    indexOfLastArticle
  );

  return (
    <>
      <SortArticles />
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          <section id='articles'>
            <div className='display-frame'>
              {articlesToShow.length > 0 &&
                articlesToShow.map((article) => {
                  return (
                    <MiniatureArticle key={article._id} article={article} />
                  );
                })}
            </div>
          </section>
          <Paging />
        </>
      )}
    </>
  );
};

export default ArticlesPage;
