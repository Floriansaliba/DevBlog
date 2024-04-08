/* eslint-disable react/prop-types */
import './MiniatureArticle.scss';
import defaultImage from './../../assets/images/default_image.png';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/Selectors/userSelectors';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { saveArticleToModify } from '../../store/slices/NewArticleSlice';
import { useEffect } from 'react';

// Gère l'affichage de la miniature d'un article
const MiniatureArticle = ({
  article,
  adminView = false,
  deleteFromPreferencesButton = false,
  articleKey,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const pathName = useLocation().pathname;
  const isAdmin = useSelector(selectUser).isAdmin;
  const userEmail = useSelector(selectUser)?.profil?.email;

  // Si nous sommes sur la page Dashboard, le composant prendra la vue de l'admin
  if (pathName === '/dashboard') {
    adminView = true;
  }

  // Si nous sommes sur la page Preferences, le boutton de suppression sera affiché
  // Il permettra de supprimer un article de ses préférences
  if (pathName === '/selection') {
    deleteFromPreferencesButton = true;
  }

  const { title, imageName, likes, views, _id } = article;

  const handleClick = (e) => {
    e.stopPropagation();
    navigate(`/articles/${_id}`);
  };

  const deleteArticleFromArticles = (e) => {
    e.stopPropagation();
    axios
      .delete(`http://localhost:3000/articles/${_id}/delete`)
      .then((res) => {
        if (res.status === 200) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteArticleFromUserPreferences = (e) => {
    e.stopPropagation();
    if (window.confirm('Validez-vous la suppression de cet article?')) {
      axios
        .delete('http://localhost:3000/user/preferences/deleteArticle', {
          data: {
            email: userEmail,
            articleId: _id,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const modifyArticle = (e) => {
    e.stopPropagation();
    dispatch(saveArticleToModify(article));
    navigate('/nouvel-article');
  };

  return (
    <div
      className='miniature-article'
      id={articleKey}
      onClick={handleClick}
      role='button'
      tabIndex='0'
    >
      {deleteFromPreferencesButton && (
        <button
          className='delete-button'
          onClick={(e) => deleteArticleFromUserPreferences(e)}
        >
          X
        </button>
      )}
      <div className='image-and-title'>
        <div className='miniature-article__image-frame'>
          <img
            className='miniature-article__image-frame__img'
            src={
              imageName
                ? `http://localhost:3000/images/${imageName}`
                : defaultImage
            }
            alt={title}
          />
        </div>
        <div className='miniature-article__title-frame'>
          <h2>{title}</h2>
        </div>
      </div>
      {pathName === '/dashboard' && isAdmin && (
        <div className='admin-bloc'>
          <div className='miniature-infos'>
            <div className='miniature-info'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 576 512'>
                <path d='M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z' />
              </svg>{' '}
              <span className='view-number'>{views}</span>
            </div>
            <div className='miniature-info'>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'>
                <path d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z' />
              </svg>{' '}
              <span className='like-number'>{likes}</span>
            </div>
          </div>
          <div className='miniature-actions'>
            <button
              className='miniature-action-modify'
              onClick={(e) => {
                modifyArticle(e);
              }}
            >
              Modifier
            </button>
            <button
              className='miniature-action-delete'
              onClick={(e) => {
                deleteArticleFromArticles(e);
              }}
            >
              Supprimer
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MiniatureArticle;
