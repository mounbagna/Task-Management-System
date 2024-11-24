import React from 'react';
import { useState } from 'react';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {
        const result = await axios.post('http://127.0.0.1:8000/adminlogin', { email, password });
  
        if (result.data.message === 'Logged in successfully') {
          navigate('/adminpage');
          alert("Admin has sucessfully logged in. Click on 'ok' to continue.");
        }
      } catch (err) {
        console.error(err);
        alert('Incorrect credentials')
      }
    };
           
  return (
    <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
      <div className='bg-white p-3 rounded w-25'>
        <h2><strong>ADMIN LOGIN</strong></h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='email'>
              <strong>Email</strong>
            </label>
            <input
              type='text'
              placeholder='Enter Email'
              autoComplete='off'
              name='email'
              className='form-control rounded-0'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3'>
            <label htmlFor='password'>
              <strong>Password</strong>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              autoComplete='off'
              name='password'
              className='form-control rounded-0'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type='submit' className='btn btn-success w-100 rounded-0'>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;