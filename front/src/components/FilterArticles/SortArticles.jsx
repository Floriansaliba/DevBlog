import { useDispatch, useSelector } from 'react-redux';
import './SortArticles.scss';
import {
  sortByMostLiked,
  sortByMostSeen,
  sortByNewest,
} from '../../store/slices/ArticlesSlice';
import { sortArticlesBy } from '../../store/Selectors/articlesSelector';

// Affiche la barre de trie des articles, et dispatch les actions de trie des articles en fonction du choix du lecteur
const SortArticles = () => {
  const sortBy = useSelector(sortArticlesBy);
  const dispatch = useDispatch();
  const getNewestArticles = () => {
    dispatch(sortByNewest());
  };
  const getMostLikedArticles = () => {
    dispatch(sortByMostLiked());
  };
  const getMostSeenArticles = () => {
    dispatch(sortByMostSeen());
  };

  return (
    <div id='filter-articles'>
      <button
        onClick={getNewestArticles}
        className={
          sortBy === 'newest' ? 'btn-sort btn-sort--active' : 'btn-sort'
        }
      >
        Les plus récents
      </button>
      <button
        onClick={getMostLikedArticles}
        className={
          sortBy === 'likes' ? 'btn-sort btn-sort--active' : 'btn-sort'
        }
      >
        Les plus likés
      </button>
      <button
        onClick={getMostSeenArticles}
        className={
          sortBy === 'views' ? 'btn-sort btn-sort--active' : 'btn-sort'
        }
      >
        Les plus vus
      </button>
    </div>
  );
};

export default SortArticles;
