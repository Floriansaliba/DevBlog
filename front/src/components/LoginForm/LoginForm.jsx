import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { connectUser } from '../../store/slices/UserSlice';

const LoginForm = () => {
  const dispatch = useDispatch();
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
        }
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
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
          value={formData.email}
          onChange={handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder='Password'
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
