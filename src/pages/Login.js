

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email('* Invalid email address').required('* Email Address is required'),
    password: Yup.string().required('* Password is required'),
  });

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:8000/user/signin', values);

      if (response.data.status === 'Success') {
        const { token } = response.data.data;
      
        // Store the token in local storage
        localStorage.setItem('token', token);
        console.log('Login successful');
        toast.success('Login successful!');
        navigate('/home');
        // Redirect to the main page or perform other actions
      } else {
        console.log(response.data.message);
        toast.error('Invalid credentials entered!');
      }
    } catch (error) {
      console.log('An error occurred while logging in:', error);
      toast.error('An error occurred while logging in');
    }
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  const { errors, handleChange, handleSubmit } = formik;

  return (
    <div className="login-container">
      <div className="card">
        <h3>MEMBER LOGIN</h3>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              id="email"
              name="email"
              placeholder="Username"
              value={formik.values.email}
              onChange={handleChange}
              className={errors.email ? 'error' : ''}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              value={formik.values.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>
          <button className="button" type="submit">
            Login
          </button>
        </form>
        <div>
          <Link to="/Signup" className="linkRegister">
            <p>Register to login if the account does not exist</p>
          </Link>
        </div>
        <div>
          <Link to="/request-password-reset" className='text-center'><p>Forgot Password?</p></Link>
        </div>
      </div>
    </div>
  );
};

export default Login;

