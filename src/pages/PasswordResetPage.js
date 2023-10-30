


import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PasswordResetPage = () => {
  const { userId, resetString } = useParams();
  const [newPassword, setNewPassword] = useState('');

  

  const validationSchema = Yup.object({
    newPassword: Yup.string().required('* New Password is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('https://gold-rate-convertor.onrender.com/user/resetPassword', {
        userId,
        resetString,
        newPassword: values.newPassword,
      });

      if (response.status === 200) {
        // Password reset was successful
        toast.success(response.data.message);
        console.log('Password reset successfully');
        formik.resetForm();
        // Redirect to the login page or perform any other necessary actions
        // ...
      } else {
        // Password reset failed
        toast.error(response.data.message);
        console.log('An error occurred while resetting the password:');
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occurred during password reset');
    }
  };

  const formik = useFormik({
    initialValues: {
      newPassword: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  const { errors } = formik;

  return (
    <div className="password-container">
      <div className="card">
        <h3>Password Reset</h3>
      
        <form onSubmit={formik.handleSubmit}>
        <div className='form-group'>
          <label htmlFor='newPassword'></label>
            <h6>New Password</h6>
            <input
              type="password"
              name="newPassword"
              id="newPassword"
              value={formik.values.newPassword}
              onChange={formik.handleChange}
              className={errors.newPassword ? 'error' : ''}
            />
            {errors.newPassword && (
              <div className="error-message">{errors.newPassword}</div>
            )}
          
          <button className='button mt-3' type="submit">Reset Password</button>
          </div>
        </form>
       
      
      </div>
    </div>
  );
};

export default PasswordResetPage;

