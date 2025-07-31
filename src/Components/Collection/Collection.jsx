import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../Context/UserContext';
import axios from 'axios';
import AddToCartButton from '../AddToCart/AddToCart';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Collections() {
    const { token } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = 'Summer Collection';
        window.scrollTo(0, 0);
        getAllProducts();
    }, []);

    async function getAllProducts() {
        try {
            const response = await axios.get(`https://sheshop.salis.app/product/all`, {
                headers: { authorization: token }
            });

            if (response.data.message === 'All products fetched successfully') {
                setProducts(response.data.products);
            }
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full px-4 py-10  bg-gradient-to-b from-[#f6f4f2] to-[#e7e6e4]">
            <div className="max-w-7xl mx-auto">
                <motion.h1 
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-4xl md:text-5xl font-extrabold text-center mb-12 text-[#3a3a3a]"
                >
                    ☀️ Summer Collection
                </motion.h1>

                {loading ? (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#c4a484]"></div>
                    </div>
                ) : (
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: {},
                            visible: {
                                transition: {
                                    staggerChildren: 0.1
                                }
                            }
                        }}
                    >
                        {products.map(product => (
                            <motion.div 
                                key={product._id}
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0 }
                                }}
                                className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300"
                            >
                                <Link to={`/productDetails/${product._id}`}>
                                    <img
                                        src={product.images[0]?.secure_url}
                                        alt={product.title}
                                        className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105"
                                    />
                                    <div className="p-6">
                                        <h2 className="text-xl font-bold text-[#333] mb-2">{product.title}</h2>
                                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-[#b48b62]">{product.finalPrice} EGP</span>
                                            {product.discount > 0 && (
                                                <span className="text-sm text-gray-400 line-through">
                                                    {product.price} EGP
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                                <div className="p-4 border-t border-gray-100 bg-[#fdfcfb]">
                                    <AddToCartButton productId={product._id} />
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
