import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connectUser } from '../../store/slices/UserSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

/*
 * Formulaire permettant la connexion d'un lecteur (ou administrateur) ayant déjà créé son compte
 */
const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/login', formData)
      .then((res) => {
        if (res.status === 200) {
          // On enregistre le jwt token dans le localStorage
          const token = res.data.token;
          localStorage.setItem('token', token);
          // On déclenche l'action connectUser de Redux afin de connecter le user, de vérifier si il est admin ou non, et d'enregistrer ses informations
          dispatch(connectUser(res.data.user));
          // Un message de succès est affiché
          toast.success('Connexion réussie');
          // On déclenche une navigation vers la page d'accueil
          navigate('/');
        }
      })
      .catch((error) => {
        if (
          // On récupère le tableau des erreurs du back-end
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          error.response.data.errors.forEach((errorMessage) => {
            // On affiche les erreurs dans le toast message
            toast.error(errorMessage);
          });
        } else {
          // On affiche un message d'erreur par defaut
          toast.error('Une erreur est survenue lors de la connexion.');
        }
      });
  };
  return (
    <>
      <h1 className='title'>Connectez-vous</h1>
      <form id='subscribe-form' onSubmit={handleSubmit}>
        <input
          type='email'
          name='email'
          placeholder='Email'
          aria-label='Adresse e-mail'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Mot de passe'
          aria-label='Mot de passe'
          value={formData.password}
          onChange={handleChange}
        />
        <button className='btn' type='submit' onClick={handleSubmit}>
          SE CONNECTER
        </button>
      </form>
    </>
  );
};

export default LoginForm;
