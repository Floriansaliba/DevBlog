import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import { selectUser } from '../../store/Selectors/userSelectors';
import { useState } from 'react';

const ProfilePage = () => {
  const user = useSelector(selectUser).profil;
  const [modifiedUser, setModifiedUser] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setModifiedUser({ ...modifiedUser, [name]: value });
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
    // Arrêt si des erreurs son détéctées
    if (hasErrors) return;

    // Tentative de mise à jour du profil en l'absence d'erreurs
    try {
      const response = await axios.put('http://localhost:3000/user/update', {
        ...modifiedUser,
        currentEmail: user.email,
      });

      const successMessage =
        response.data.message || 'Profil mis à jour avec succès';
      toast.success(successMessage);
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
        await axios.delete('http://localhost:3000/api/user/delete');
        toast.success('Profil supprimé avec succès');
      } catch (error) {
        toast.error('Erreur lors de la suppression du profil');
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <h1>Profil</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prénom :
          <input
            type='text'
            name='firstName'
            placeholder={user.firstName}
            onChange={handleChange}
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
        <button type='submit'>Mettre à jour</button>
      </form>
      <button onClick={handleDelete}>Se désinscire</button>
    </>
  );
};

export default ProfilePage;
