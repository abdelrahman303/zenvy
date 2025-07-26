import { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import { UserContext } from '../../Context/UserContext';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {
    const navigate = useNavigate();
    const { token } = useContext(UserContext);
    const [user, setUser] = useState(null);

    useEffect(() => {
        document.title = 'Profile';
        window.scrollTo(0, 0);
        if (token) {
            GetUserProfile();
        }
    }, [token]);

    async function GetUserProfile() {
        try {
            const response = await axios.get('https://sheshop.salis.app/auth/profile', {
                headers: { authorization: token },
            });
            setUser(response.data.results);
        } catch (error) {
            console.error("Error fetching user profile:", error.response?.data?.message || error.message);
        }
    }
    function handleLogout() {
        localStorage.removeItem('accessToken');
        navigate('/login');
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-gray-100">
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white shadow-xl rounded-3xl p-6 sm:p-8 w-full max-w-7xl"
            >
                {/* Responsive container */}
                <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-8">

                    {/* Left section (email + edit) */}
                    <div className="flex flex-col gap-6 w-full lg:w-2/3">

                        <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 shadow-sm hover:shadow-md transition duration-300 w-full">
                            <p className="text-sm text-gray-500 mb-1">Your Email</p>
                            <p className="text-base font-medium text-gray-800 break-words">{user?.email || "Zenvy@example.com"}</p>
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-max bg-black text-white py-2 px-6 rounded-full flex items-center gap-2 shadow-md hover:bg-gray-900 transition duration-300"
                        >
                            <FiEdit2 className="text-base" />
                            Edit Profile
                        </motion.button>
                    </div>

                    {/* Right section (logout) */}
                    <div className="flex lg:justify-end w-full lg:w-1/3">
                        <button
                            onClick={handleLogout}
                            className="w-full lg:w-auto mt-4 lg:mt-0 bg-red-600 hover:bg-red-700 text-white py-2 px-6 text-base rounded-xl transition-all duration-300 shadow-md"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
