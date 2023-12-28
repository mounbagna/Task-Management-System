import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios'
import styles from "./styles.module.css";


function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [msg, setMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://127.0.0.1:8000/register', { name, email, password })
          .then(result => {
            console.log(result);
            if (result.data && result.data.success) {
              setMsg("Registration successful. Welcome!");
              alert("Registration successful. Check your email!");
            } else {
              setMsg("Registration success.");
              alert("Registration successful. Check your email!");
            }
          })
          .catch(err => {
            console.log(err);
            if (err.response) {
              console.log(err.response.data);
              console.log(err.response.status);
              if (err.response.data.message === 'User with given email already exists') {
                setMsg("Email is already registered. Please use a different email address.");
                alert("Email is already registered. Please use a different email address.");
              } else {
                setMsg("Registration failed. Please try again.");
                alert("Registration failed. Please try again.");
              }
            }
          });
      }
      
    
    

    return (
        <div className='d-flex justify-content-center align-items-center bg-secondary vh-100'>
            <div className='bg-white p-3 rounded w-25'>
                <h2>REGISTRATION</h2>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'>
                            <strong>Name</strong>
                        </label>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            autoComplete='off'
                            name='name'
                            className='form-control rounded-0'
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                        {msg && <div className={styles.success_msg}>{msg}</div>}
                    </div>
                    <button type='submit' className='btn btn-success w-100 rounded-0'>
                        Register
                    </button>
                </form>
                <p>Already have an account?</p>
                <Link to='/login' className='btn btn-default border w-100 bg-light rounded-0 text-decoration-none'>
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;
