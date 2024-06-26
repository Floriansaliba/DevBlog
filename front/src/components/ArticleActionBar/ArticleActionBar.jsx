/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import './ArticleActionBar.scss';
import { selectUser } from '../../store/Selectors/userSelectors';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { BASE_URL } from '../../utils/constantes';

// eslint-disable-next-line react/prop-types

/**
 * Bar d'action permettant au lecteur connecté de liker/Disliker ou enregistrer un article dans ses préférences
 */
export const ArticleActionBar = ({ id, date }) => {
  const [isLiked, setIsliked] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const user = useSelector(selectUser);
  const isAdmin = useSelector(selectUser).isAdmin;
  const connected = user.connected;
  const articleDate = new Date(date);
  const day = articleDate.getDate().toString().padStart(2, '0');
  const month = (articleDate.getMonth() + 1).toString().padStart(2, '0');
  const year = articleDate.getFullYear();

  // Gestion du like du lecteur
  const handleLikeClick = () => {
    // Ajout de l'article en préférences de l'utilisateur
    axios
      .put(
        `${BASE_URL}/user/addLike`,
        {
          articleId: id,
          userEmail: user.profil.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        if (response.data === 'Un like ajouté') {
          // Ajout d'un like dans l'article en base de données
          axios
            .get(`${BASE_URL}/articles/${id}/addLike`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                setIsliked(true);
                toast.success('Merci pour votre soutien !');
              }
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Gestion du dislike du lecteur
  const handleDislikeClick = () => {
    axios
      .put(
        `${BASE_URL}/user/dislike`,
        {
          articleId: id,
          userEmail: user.profil.email,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          axios
            .get(`${BASE_URL}/articles/${id}/addDislike`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
              },
            })
            .then((response) => {
              if (response.status === 200) {
                setIsliked(false);
              }
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Gestion de l'enregistrement d'un article dans le préférences du lecteur
  const handleBookmarkClick = () => {
    axios
      .post(
        `${BASE_URL}/saveArticle`,
        {
          email: user.profil.email,
          articleId: id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((response) => {
        if (response.data === 'Article sauvegardé') {
          toast.success(response.data);
        } else {
          toast.info(response.data);
        }
        setIsRegistered(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id='action-bar'>
      <span className='article-date'>{`${day}/${month}/${year}`}</span>
      {connected && !isAdmin && (
        <div className='user-actions'>
          {' '}
          {isLiked ? (
            <svg
              aria-label="Ne plus aimer l'article"
              onClick={handleDislikeClick}
              className='heart'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
            >
              <path d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5z' />
            </svg>
          ) : (
            <svg
              aria-label="Aimer l'article"
              onClick={handleLikeClick}
              className='heart'
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 512 512'
            >
              <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
            </svg>
          )}
          {connected && (
            <>
              {!isRegistered ? (
                <svg
                  onClick={handleBookmarkClick}
                  className='bookmark'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 384 512'
                >
                  <path d='M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z' />
                </svg>
              ) : (
                <svg
                  onClick={handleBookmarkClick}
                  className='bookmark'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 384 512'
                >
                  <path d='M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z' />
                </svg>
              )}{' '}
            </>
          )}
        </div>
      )}
    </div>
  );
};
