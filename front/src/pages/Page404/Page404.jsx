import { useNavigate } from 'react-router-dom';
import './Page404.scss';

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <>
      <div id='error-404'>
        <h1 className='title'>Erreur 404</h1>
        <p className='article__paragraph'>
          {
            "        Oups ! On dirait que vous vous êtes perdu dans un coin inexploré de l'univers. La page que vous cherchez n'existe pas ou a été déplacée vers une nouvelle galaxie. Pas de panique ! Utilisez notre système de navigation pour retrouver votre chemin."
          }
        </p>
        <button className='btn' onClick={() => navigate('/')}>
          {"Retour à l'accueil"}
        </button>
      </div>
    </>
  );
};

export default Page404;
