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
          // On vérifie si le user est admin ou non afin de mettre à jour la variable isAdmin de Redux
          // On enregistrer
          console.log(res.data.user);
          toast.success('Connexion réussie');
          navigate('/');
        }
        console.log(res);
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          error.response.data.errors.forEach((errorMessage) => {
            toast.error(errorMessage);
          });
        } else {
          toast.error('Une erreur est survenue lors de la connexion.');
        }
        console.log(error);
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
