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
          // On passe le user à logged in dans Redux
          const token = res.data.token;
          localStorage.setItem('token', token);
          console.log(res.data.user);
          dispatch(connectUser());
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
