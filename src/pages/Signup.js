

import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const Signup = () => {
  const handleSubmit = async (values, { resetForm }) => {
    try {
      const response = await axios.post('http://localhost:8000/user/signupuser', values);

      if (response.data.status === 'Failed') {
        console.log(response.data.message);
      } else if (response.data.status === 'Success') {
        console.log('Signup successful');
        console.log('Verification email sent');
        toast.success('Registered successfully!');

        // Clear form fields
        resetForm();
      }
    } catch (error) {
      console.log('An error occurred while signing up:', error);
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('* Full Name is required'),
    email: Yup.string().email('* Invalid email address').required('* Email Address is required'),
    dateOfBirth: Yup.date().required('* Date of Birth is required'),
    password: Yup.string().required('* Password is required'),
    repeatPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], '* Passwords must match')
      .required('* Repeat Password is required'),
  });

  return (
    <div className="Signup-container">
      <div className="card">
        <h3>Signup</h3>
        <Formik
          initialValues={{
            name: '',
            email: '',
            dateOfBirth: '',
            password: '',
            repeatPassword: '',
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="login-form">
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <Field type="text" name="name" id="name" placeholder="Username" />
              <ErrorMessage name="name" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <Field type="email" name="email" id="email" placeholder="abc@test.com" />
              <ErrorMessage name="email" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="dateOfBirth">Date of Birth</label>
              <Field type="date" name="dateOfBirth" id="dateOfBirth" />
              <ErrorMessage name="dateOfBirth" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <Field type="password" name="password" id="password" placeholder="Password" />
              <ErrorMessage name="password" component="div" className="error-message" />
            </div>
            <div className="form-group">
              <label htmlFor="repeatPassword">Repeat Password</label>
              <Field
                type="password"
                name="repeatPassword"
                id="repeatPassword"
                placeholder="Repeat Password"
              />
              <ErrorMessage name="repeatPassword" component="div" className="error-message" />
            </div>
            <button className="button" type="submit">
              Signup
            </button>
          </Form>
        </Formik>
        <div>
          <Link to="/login" className="linklogin">
            <p>Go to login if account exists</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;

