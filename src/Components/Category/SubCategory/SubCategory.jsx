import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import AddToCartButton from "../../AddToCart/AddToCart";
import { motion } from "framer-motion";

export default function SubCategory() {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = "Sub Category";
        window.scrollTo(0, 0);
        getCategoryProducts();
    }, [categoryId]);

    async function getCategoryProducts() {
        try {
            const res = await axios.get(`https://sheshop.salis.app/category/with-products`);
            const category = res.data.categories.find(cat => cat._id === categoryId);
            if (!category) {
                setError("Category not found");
                return;
            }

            setCategoryName(category.name);
            setProducts(category.products || []);
        } catch (err) {
            setError("Failed to fetch products.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-100">
                <p className="text-xl text-red-600">{error}</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-36 pb-16 px-6 md:px-12   bg-gradient-to-b from-[#f6f4f2] to-[#e7e6e4]">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-extrabold text-center mb-12 text-mainBlue tracking-tight">
                    {categoryName}
                </h1>

                {products.length === 0 ? (
                    <p className="text-center text-gray-500 text-lg">No products found in this category.</p>
                ) : (
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                        {products.map((product) => (
                            <motion.div
                                key={product._id}
                                whileHover={{ scale: 1.02 }}
                                transition={{ type: "spring", stiffness: 200, damping: 18 }}
                                className="bg-white group p-4 rounded-2xl shadow hover:shadow-xl transition-shadow"
                            >
                                <div
                                    className="relative w-full h-80 sm:h-96 rounded-xl overflow-hidden cursor-pointer"
                                    onClick={() => navigate(`/productDetails/${product._id}`)}
                                >
                                    <img
                                        src={product.images?.[0]?.secure_url}
                                        alt={product.title}
                                        className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-300"
                                    />
                                    {product.discount > 0 && (
                                        <span className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-semibold px-2 py-1 rounded-full shadow">
                                            -{product.discount}%
                                        </span>
                                    )}
                                </div>

                                <div className="pt-4">
                                    <h2 className="text-base md:text-lg font-medium text-gray-900 line-clamp-1">
                                        {product.title}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1 mb-2">
                                        <span className="text-mainBlue font-bold text-lg">
                                            LE {product.finalPrice}
                                        </span>
                                        {product.price > product.finalPrice && (
                                            <span className="text-gray-400 line-through text-sm">
                                                LE {product.price}
                                            </span>
                                        )}
                                    </div>
                                    <AddToCartButton productId={product._id} />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
