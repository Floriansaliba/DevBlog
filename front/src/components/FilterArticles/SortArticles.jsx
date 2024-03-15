import { useDispatch } from 'react-redux';
import './SortArticles.scss';
import {
  sortByMostLiked,
  sortByMostSeen,
  sortByNewest,
} from '../../store/slices/ArticlesSlice';

const SortArticles = () => {
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
      <span>Trier par :</span>
      <button onClick={getNewestArticles}>Date</button>
      <button onClick={getMostLikedArticles}>Likes</button>
      <button onClick={getMostSeenArticles}>Vues</button>
    </div>
  );
};

export default SortArticles;
