import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
    useEffect(() => {
        document.title = 'Page Not Found'
        window.scrollTo(0, 0)
    }, [])

    return (
        <div className="h-screen w-screen flex items-center justify-center bg-gray-100 px-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="text-center"
            >
                <h1 className="text-7xl font-extrabold text-gray-800 mb-6">404</h1>
                <p className="text-2xl md:text-3xl text-gray-600 mb-4">Oops! Page not found</p>
                <p className="text-md text-gray-500 mb-8">
                    The page you’re looking for doesn’t exist or has been moved.
                </p>
                <Link to="/">
                    <button className="px-6 py-3 bg-black text-white rounded-full font-medium hover:bg-gray-800 transition duration-300 shadow-md">
                        Go Home
                    </button>
                </Link>
            </motion.div>
        </div>
    )
}
