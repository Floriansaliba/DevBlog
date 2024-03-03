import SortArticles from '../../components/FilterArticles/SortArticles';
import MiniatureArticle from '../../components/MiniatureArticle/MiniatureArticle';
import Paging from '../../components/Paging/Paging';

const ArticlesPage = () => {
  return (
    <>
      <SortArticles />
      <MiniatureArticle />
      <Paging />
    </>
  );
};

export default ArticlesPage;
