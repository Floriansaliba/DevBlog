import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/Selectors/userSelectors';
import { fetchArticles } from '../../store/slices/ArticlesSlice';
import { selectArticles } from '../../store/Selectors/articlesSelector';
import MiniatureArticle from '../../components/MiniatureArticle/MiniatureArticle';
import { BASE_URL } from '../../utils/constantes';

const MySelectionPage = () => {
  const dispatch = useDispatch();
  const userEmail = useSelector(selectUser).profil.email;
  const articles = useSelector(selectArticles);
  const [userPreferences, setUserPreferences] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);

  useEffect(() => {
    dispatch(fetchArticles());
    axios
      .post(
        `${BASE_URL}/user/preferences`,
        { email: userEmail },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          setUserPreferences(res.data.preferences);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userEmail]);

  // Utilisation de useEffect pour filtrer les articles chaque fois que articles ou userPreferences change
  useEffect(() => {
    const filtered = articles.filter((article) =>
      userPreferences.includes(article._id)
    );
    setFilteredArticles(filtered);
  }, [articles, userPreferences]);

  return (
    <>
      <section id='articles'>
        {filteredArticles.length > 0 ? (
          filteredArticles.map((article) => {
            return (
              <MiniatureArticle
                key={article._id}
                article={article}
                deleteOption={true}
              />
            );
          })
        ) : (
          <p className='no-data'>
            Aucun article dans votre sélection actuellement
          </p>
        )}
      </section>
    </>
  );
};

export default MySelectionPage;
