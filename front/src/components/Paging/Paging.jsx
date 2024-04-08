import { useDispatch, useSelector } from 'react-redux';
import './Paging.scss';
import {
  currentPage,
  numberOfArticlesPerPage,
  selectArticles,
} from '../../store/Selectors/articlesSelector';
import { goToPage } from '../../store/slices/ArticlesSlice';
// eslint-disable-next-line react/prop-types

/*
 * Affiche la pagination en fonction du nombre d'articles à afficher
 */
const Paging = () => {
  const dispatch = useDispatch();
  const totalOfArticles = useSelector(selectArticles).length;
  const articlesPerPages = useSelector(numberOfArticlesPerPage);
  const pageNumber = useSelector(currentPage);
  const numberOfPages = Math.ceil(totalOfArticles / articlesPerPages);

  return (
    <div id='paging'>
      <ul className='pages-list'>
        {Array.from({ length: numberOfPages }).map((_, i) => (
          <li
            onClick={() => {
              dispatch(goToPage(i + 1));
            }}
            className={`page-number ${pageNumber === i + 1 ? 'active' : ''}`}
            key={i}
            role='button'
            tabIndex='0'
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Paging;
