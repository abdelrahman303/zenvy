import { useContext, useEffect } from 'react';
import { motion } from 'framer-motion'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';

export default function ConfirmEmail() {

    const { setToken, convertToken } = useContext(UserContext)

    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Confirm Email'
        window.scrollTo(0, 0)
    }, [])

    // Yup validation schema
    const schema = Yup.object().shape({
        otp: Yup.string()
            .required('OTP is required')
            .matches(/^\d{4}$/, 'OTP must be exactly 4 digits'),
    });

    const formik = useFormik({
        initialValues: {
            otp: '',
            verificationToken: localStorage.getItem('verificationToken') || '',
        },
        onSubmit: submitForm,
        validationSchema: schema,
    })

    // Function to handle form submission
    async function submitForm(values) {
        try {
            const { data } = await axios.patch('https://sheshop.salis.app/auth/confirm-email', values);
            if (data?.message === 'Email confirmed successfully') {
                console.log('Email confirmed successfully');
                localStorage.removeItem('verificationToken');
                navigate('/home');
                setToken(data?.accessToken); // Set the token in UserContext
                convertToken(); // Convert token to userId
            }
        } catch (error) {
            console.log(error.response?.data?.message || 'Something went wrong');
        }
    }


    return (
        <div className="h-screen w-screen flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-3xl shadow-xl p-8 w-full max-w-md"
            >
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Confirm Your Email</h2>
                <p className="text-center text-gray-500 mb-6">
                    We've sent a code to your email address
                </p>

                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">

                    <input
                        {...formik.getFieldProps("otp")}
                        type="text"
                        name="otp"
                        id="otp"
                        placeholder='Enter OTP'
                        className="px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-black transition tracking-widest text-center"
                    />

                    {formik.touched.otp && formik.errors.otp && (
                        <div className="text-red-600 text-sm mt-1">
                            {formik.errors.otp}
                        </div>
                    )}


                    <button
                        type="submit"
                        className="bg-black text-white py-3 rounded-xl hover:bg-gray-900 transition font-medium"
                    >
                        Confirm Email
                    </button>
                </form>

                {/* <p className="mt-6 text-sm text-center text-gray-400">
                    Didn’t receive the code?{' '}
                    <button
                        onClick={() => alert('Resend OTP logic here')}
                        className="text-black font-medium hover:underline"
                    >
                        Resend
                    </button>
                </p> */}
            </motion.div>
        </div>
    )
}
