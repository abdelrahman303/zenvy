import { motion } from 'framer-motion'
import heroImage from '../../../assets/imgs/heroImage.jpeg' // Make sure this path is correct
import { Link } from 'react-router-dom'

export default function HeroSection() {

    return (
        <div className="relative h-screen w-screen overflow-hidden pt-36">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center z-0"
                style={{ backgroundImage: `url(${heroImage})` }}
            ></div>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50 z-10"></div>

            {/* Content */}
            <div className="relative z-20 flex items-center justify-center h-full px-6">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                    className="text-center text-white max-w-2xl"
                >
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 leading-tight">
                        Discover the Future of Fashion
                    </h1>
                    <p className="text-lg md:text-xl mb-8 text-gray-200">
                        Elevate your wardrobe with bold, sustainable, and trend-forward pieces crafted for every lifestyle.
                    </p>
                    <Link to={'/collections'} className="px-6 py-3 text-lg font-semibold bg-white text-black rounded-full hover:bg-gray-100 transition duration-300 shadow-lg">
                        Shop Now
                    </Link>
                </motion.div>
            </div>
        </div>
    )
}
