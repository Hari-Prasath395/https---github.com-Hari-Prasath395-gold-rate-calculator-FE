

import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RequestPasswordReset = () => {
  const initialValues = {
    email: '',
  };

  const validationSchema = Yup.object({
    email: Yup.string().email('* Invalid email address').required('* Email is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://gold-rate-convertor.onrender.com/user/requestpasswordreset', {
        email: values.email,
        redirectUrl: 'http://localhost:3000/password-reset-success',
      });

      if (response.data.status === 'Failed') {
        console.log(response.data.message);
        toast.error(response.data.message);
      } else {
        console.log('Password reset email sent');
        toast.success('Password reset email sent! Please check your inbox');
        formik.resetForm();
      }
    } catch (error) {
      console.log('An error occurred while requesting password reset:', error);
      toast.error('An error occurred while requesting password reset');
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: handleSubmit,
  });

  const { errors } = formik;

  return (
    <div className="Reset-container">
      <div className="card">
        <h3 className="title mt-3">Request Password Reset</h3>
        <form className="Reset-form" onSubmit={formik.handleSubmit}>
          <div className="form-group mt-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>
          <button className="button mt-3" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestPasswordReset;

