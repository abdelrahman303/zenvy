import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading categories...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <p className="text-xl text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-gray-100 to-blue-50">
            <h1 className="text-4xl font-bold text-center mb-10 text-mainBlue">Our Categories</h1>

            <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">

                {categories.map((cat) => (
                    <Link  to={`/subCategory/${cat._id}`} key={cat._id} className="group relative overflow-hidden rounded-3xl shadow-lg">
                        <img
                            src={cat.image?.secure_url}
                            alt={cat.name}
                            className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-6">
                            <h2 className="text-xl font-semibold capitalize text-gray-200  mb-2">
                                {cat.name}
                            </h2>
                            <Link

                                to={`/subCategory/${cat._id}`}
                                className="px-3 md:px-5 py-1.5 md:py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
                            >
                                Shop Now
                            </Link>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
