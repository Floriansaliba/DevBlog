import { useState } from 'react';
import './SubscribeForm.scss';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

/*
Formulaire d'inscription d'un lecteur (via son email, son nom et son mot de passe)
*/
const SubscribeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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
    try {
      const response = await axios.post(
        'http://localhost:3000/subscribe',
        formData
      );
      toast.success('Vous êtes inscrit :)');
      navigate('/connexion');
    } catch (error) {
      if (error.response && error.response.data.errors) {
        error.response.data.errors.forEach((err) => {
          toast.error(err);
        });
      } else {
        toast.error('Une erreur est survenue');
      }
    }
  };

  return (
    <>
      <h1 className='title'>Inscrivez-vous</h1>
      <form id='subscribe-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='firstName'
          placeholder='Prénom'
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type='text'
          name='lastName'
          placeholder='Nom'
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type='email'
          name='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Mot de passe'
          value={formData.password}
          onChange={handleChange}
        />
        <button className='btn' type='submit'>
          S&apos;INSCRIRE
        </button>
      </form>
    </>
  );
};

export default SubscribeForm;
