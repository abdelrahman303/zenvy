import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Category() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        getAllCategories();
    }, []);

    async function getAllCategories() {
        try {
            const response = await axios.get('https://sheshop.salis.app/category/with-products');
            setCategories(response.data.categories || []);
        } catch (err) {
            setError("Failed to fetch categories.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#f6f4f2]">
                <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading categories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#f6f4f2]">
                <p className="text-xl text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#fefcf9] to-[#e7e6e4] px-6 py-20">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center text-[#3a3a3a] mb-16">🛍️ Our Categories</h1>

            <div className="grid grid-cols-1  md:grid-cols-2 gap-8 max-w-7xl mx-auto">
                {categories.map((cat, index) => (
                    <motion.div
                        key={cat._id}
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="group relative overflow-hidden rounded-3xl shadow-lg bg-white"
                    >
                        <Link to={`/subCategory/${cat._id}`}>
                            <img
                                src={cat.image?.secure_url}
                                alt={cat.name}
                                className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6">
                                <h2 className="text-2xl font-bold text-white capitalize mb-3">{cat.name}</h2>
                                <Link
                                    to={`/subCategory/${cat._id}`}
                                    className="inline-block px-5 py-2 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition"
                                >
                                    Shop Now
                                </Link>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
