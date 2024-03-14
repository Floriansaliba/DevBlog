import { useParams } from 'react-router-dom';
import ArticleView from '../../components/ArticleView/ArticleView';

const SingleArticlePage = () => {
  const { id } = useParams();
  return (
    <>
      <ArticleView id={id} />
    </>
  );
};

export default SingleArticlePage;
