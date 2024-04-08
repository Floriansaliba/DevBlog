import { useDispatch, useSelector } from 'react-redux';
import {
  selectArticles,
  selectLoading,
} from '../../store/Selectors/articlesSelector';
import { useEffect, useState } from 'react';
import { fetchArticles } from '../../store/slices/ArticlesSlice';
import MiniatureArticle from '../../components/MiniatureArticle/MiniatureArticle';
import { useNavigate } from 'react-router-dom';
import './HomePage.scss';

export const HomePage = () => {
  const dispatch = useDispatch();
  const articles = useSelector(selectArticles);
  const navigate = useNavigate();
  const loading = useSelector(selectLoading);
  const mostPopularArticles = [...articles]
    .slice(0, 6)
    .sort((a, b) => b.likes - a.likes);

  const newestArticles = [...articles].slice(0, 6).sort((a, b) => {
    return new Date(b.date) - new Date(a.date);
  });

  useEffect(() => {
    dispatch(fetchArticles());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <>
          {' '}
          <h2 className='accueil__title'>A la une</h2>
          <div className='display-frame'>
            {newestArticles.length === 0 && (
              <p>Aucun article à afficher pour le moment</p>
            )}
            {newestArticles.length > 0 &&
              newestArticles.map((article) => {
                return (
                  <MiniatureArticle
                    key={`newest-${article._id}`}
                    articleKey={`newest-${article._id}`}
                    article={article}
                  />
                );
              })}
          </div>
          <h2 className='accueil__title'>Les plus populaires</h2>
          <div className='display-frame'>
            {mostPopularArticles.length === 0 && (
              <p>Aucun article à afficher pour le moment</p>
            )}
            {mostPopularArticles.length > 0 &&
              mostPopularArticles.map((article) => {
                return (
                  <MiniatureArticle
                    key={`popular-${article._id}`}
                    articleKey={`popular-${article._id}`}
                    article={article}
                  />
                );
              })}
          </div>
          <button
            onClick={() => navigate('/articles')}
            className='btn--to-articles'
          >
            Tous nos articles
          </button>
        </>
      )}
    </>
  );
};
