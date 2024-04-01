import './ProfilePage.scss';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../store/Selectors/userSelectors';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { disconnectUser } from '../../store/slices/UserSlice';

const ProfilePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser).profil;
  const [modifiedUser, setModifiedUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    role: user.role,
  });
  const [password, setPassword] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'password') {
      setPassword(value);
    } else {
      setModifiedUser({ ...modifiedUser, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Début de la validation
    let hasErrors = false;

    if (!modifiedUser.firstName.trim()) {
      toast.error('Le prénom est requis.');
      hasErrors = true;
    }
    if (!modifiedUser.lastName.trim()) {
      toast.error('Le nom est requis.');
      hasErrors = true;
    }
    if (!modifiedUser.email.trim()) {
      toast.error("L'adresse email est requise.");
      hasErrors = true;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!modifiedUser.email || !emailRegex.test(modifiedUser.email)) {
      toast.error("L'email n'est pas valide.");
      hasErrors = true;
    }
    if (!password.trim()) {
      toast.error(
        'Veuillez entrer votre mot de passe pour confirmer les changements.'
      );
      hasErrors = true;
    }
    // Arrêt si des erreurs son détéctées
    if (hasErrors) return;

    // Tentative de mise à jour du profil en l'absence d'erreurs
    const request = {
      ...modifiedUser,
      currentEmail: user.email,
      password: password,
    };
    console.log(request);
    try {
      const response = await axios.put(
        'http://localhost:3000/user/update',
        request
      );

      const successMessage =
        response.data.message || 'Profil mis à jour avec succès';
      toast.success(successMessage);
      toast.info('Veuillez-vous reconnecter');
      setPassword('');
      // dispatch(updateUser({ ...response.data.user }));

      dispatch(disconnectUser());

      // Attente de 7s avant de rediriger vers la page de connexion
      setTimeout(() => {
        navigate('/connexion');
      }, 7000);
    } catch (error) {
      if (error.response) {
        // Affichage des erreurs
        if (
          error.response.data.errors &&
          error.response.data.errors.length > 0
        ) {
          error.response.data.errors.forEach((err) => toast.error(err));
        } else {
          const errorMessage =
            error.response.data.message ||
            'Erreur lors de la mise à jour du profil';
          toast.error(errorMessage);
        }
      } else {
        // Quelque chose s'est produit lors de la configuration de la requête qui a déclenché une erreur
        console.log('Error', error.message);
        toast.error('Une erreur est survenue. Veuillez réessayer.');
      }
    }
  };

  const handleDelete = async () => {
    if (
      window.confirm(
        'Êtes-vous sûr de vouloir supprimer votre profil ? Cette action est irréversible.'
      )
    ) {
      try {
        const response = await axios.delete(
          'http://localhost:3000/user/delete',
          {
            data: {
              email: modifiedUser.email,
              password: password,
            },
          }
        );

        // La requête a réussi
        toast.success('Profil supprimé avec succès');
        navigate('/');
      } catch (error) {
        // Gestion des erreurs retournées par le serveur sous forme de tableau
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          error.response.data.errors.forEach((err) => toast.error(err));
        } else {
          // Gestion des erreurs non spécifiques
          const errorMessage =
            error.response && error.response.data && error.response.data.message
              ? error.response.data.message
              : 'Une erreur est survenue. Veuillez réessayer.';
          toast.error(errorMessage);
        }
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <h1 className='title'>Profil</h1>
      <form id='profil-form' onSubmit={handleSubmit}>
        <label>
          Prénom :
          <input
            type='text'
            name='firstName'
            placeholder={user.firstName}
            onChange={handleChange}
            value={modifiedUser.firstName}
          />
        </label>
        <label>
          Nom :
          <input
            type='text'
            name='lastName'
            placeholder={user.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Email :
          <input
            type='email'
            name='email'
            placeholder={user.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Mot de passe (pour confirmer les changements) :
          <input
            type='password'
            name='password'
            placeholder='Entrez votre mot de passe'
            onChange={handleChange}
            value={password}
          />
        </label>
        <button className='btn' type='submit'>
          Mettre à jour
        </button>
        <button className='btn--unsubscribe' onClick={handleDelete}>
          Se désinscire
        </button>
      </form>
    </>
  );
};

export default ProfilePage;
