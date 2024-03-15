import { useSelector } from 'react-redux';
import './ArticleActionBar.scss';
import { selectArticles } from '../../store/Selectors/articlesSelector';
import { selectUser } from '../../store/Selectors/userSelectors';
import axios from 'axios';

// eslint-disable-next-line react/prop-types
export const ArticleActionBar = ({ id }) => {
  const articles = useSelector(selectArticles);
  const user = useSelector(selectUser);
  const connected = user.connected;
  const selectedArticle = articles.find((article) => article._id === id);
  console.log(selectedArticle);
  const date = new Date(selectedArticle.date);

  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  const handleLikeClick = () => {
    axios
      .get(`http://localhost:3000/articles/${id}/addLike`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleBookmarkClick = () => {
    axios
      .post('http://localhost:3000/saveArticle', {
        email: user.profil.email,
        articleId: selectedArticle._id,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div id='action-bar'>
      <span>{`${day}/${month}/${year}`}</span>
      <div className='user-actions'>
        {' '}
        <svg
          onClick={handleLikeClick}
          className='heart'
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 512 512'
        >
          <path d='M225.8 468.2l-2.5-2.3L48.1 303.2C17.4 274.7 0 234.7 0 192.8v-3.3c0-70.4 50-130.8 119.2-144C158.6 37.9 198.9 47 231 69.6c9 6.4 17.4 13.8 25 22.3c4.2-4.8 8.7-9.2 13.5-13.3c3.7-3.2 7.5-6.2 11.5-9c0 0 0 0 0 0C313.1 47 353.4 37.9 392.8 45.4C462 58.6 512 119.1 512 189.5v3.3c0 41.9-17.4 81.9-48.1 110.4L288.7 465.9l-2.5 2.3c-8.2 7.6-19 11.9-30.2 11.9s-22-4.2-30.2-11.9zM239.1 145c-.4-.3-.7-.7-1-1.1l-17.8-20c0 0-.1-.1-.1-.1c0 0 0 0 0 0c-23.1-25.9-58-37.7-92-31.2C81.6 101.5 48 142.1 48 189.5v3.3c0 28.5 11.9 55.8 32.8 75.2L256 430.7 431.2 268c20.9-19.4 32.8-46.7 32.8-75.2v-3.3c0-47.3-33.6-88-80.1-96.9c-34-6.5-69 5.4-92 31.2c0 0 0 0-.1 .1s0 0-.1 .1l-17.8 20c-.3 .4-.7 .7-1 1.1c-4.5 4.5-10.6 7-16.9 7s-12.4-2.5-16.9-7z' />
        </svg>
        {connected && (
          <svg
            onClick={handleBookmarkClick}
            className='bookmark'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 384 512'
          >
            <path d='M0 48C0 21.5 21.5 0 48 0l0 48V441.4l130.1-92.9c8.3-6 19.6-6 27.9 0L336 441.4V48H48V0H336c26.5 0 48 21.5 48 48V488c0 9-5 17.2-13 21.3s-17.6 3.4-24.9-1.8L192 397.5 37.9 507.5c-7.3 5.2-16.9 5.9-24.9 1.8S0 497 0 488V48z' />
          </svg>
        )}
      </div>
    </div>
  );
};
