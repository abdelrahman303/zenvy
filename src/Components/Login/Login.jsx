import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [errMsg, setErrMsg] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Login';
    window.scrollTo(0, 0);
  }, []);

  // Yup validation schema
  const schema = Yup.object().shape({
    email: Yup.string().required('Email is required').email('Invalid email format'),
  });

  // Formik setup
  const formik = useFormik({
    initialValues: {
      email: "",
    },
    onSubmit: submitForm,
    validationSchema: schema,
  });

  // Function to handle form submission
  async function submitForm(values) {
    try {
      const { data } = await axios.post('https://sheshop.salis.app/auth/create-user', values);

      if (data?.results?.message === 'OTP sent successfully' && data?.results?.verificationToken) {
        localStorage.setItem('verificationToken', data.results.verificationToken);
        navigate('/confirmEmail');
      }
    } catch (error) {
      setErrMsg(error.response?.data?.message || 'Something went wrong');
    }
  }

  return (
    <div className="h-screen w-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Login</h2>
        <p className="text-center text-gray-500 mb-6">
          Enter your email and we'll send you a verification code
        </p>

        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

          {/* Global error message */}
          {errMsg && (
            <div className="flex items-center p-4 text-sm text-red-800 rounded-lg bg-red-100">
              <svg
                className="w-4 h-4 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <span>{errMsg}</span>
            </div>
          )}

          {/* Email input */}
          <input
            {...formik.getFieldProps("email")}
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition"
          />

          {/* Validation error */}
          {formik.errors.email && formik.touched.email && (
            <div className="text-sm text-red-600">{formik.errors.email}</div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition font-medium"
          >
            Continue
          </button>
        </form>
      </motion.div>
    </div>
  )
}
