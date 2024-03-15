import { useParams } from 'react-router-dom';
import ArticleView from '../../components/ArticleView/ArticleView';
import { useEffect } from 'react';
import axios from 'axios';
import { selectUser } from '../../store/Selectors/userSelectors';
import { useSelector } from 'react-redux';

const SingleArticlePage = () => {
  const { id } = useParams();
  const isAdmin = useSelector(selectUser).isAdmin;

  useEffect(() => {
    if (!isAdmin) {
      axios
        .get(`http://localhost:3000/articles/${id}/addView`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <ArticleView id={id} />
    </>
  );
};

export default SingleArticlePage;
