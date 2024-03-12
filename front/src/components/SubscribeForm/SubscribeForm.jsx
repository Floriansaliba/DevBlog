import { useState } from 'react';
import './SubscribeForm.scss';
import axios from 'axios';

const SubscribeForm = () => {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:3000/subscribe', formData);
    console.log(formData);
  };

  return (
    <>
      <h1 className='title'>Inscrivez-vous</h1>
      <form id='subscribe-form' onSubmit={handleSubmit}>
        <input
          type='text'
          name='firstName'
          placeholder='First Name'
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type='text'
          name='lastName'
          placeholder='Last Name'
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
          placeholder='Password'
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
