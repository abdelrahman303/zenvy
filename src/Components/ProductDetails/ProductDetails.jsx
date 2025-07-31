import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/UserContext";
import axios from "axios";
import AddToCartButton from "../AddToCart/AddToCart";
import { motion } from "framer-motion";
import UpdateProductQuantity from "../Cart/UpdateProductQuantity/UpdateProductQuantity";

export default function ProductDetails() {
    const { productId } = useParams();
    const { token } = useContext(UserContext);
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        document.title = "Product Details";
        window.scrollTo(0, 0);
        fetchProductDetails();
    }, [productId]);

    async function fetchProductDetails() {
        try {
            const response = await axios.get(
                `https://sheshop.salis.app/product/by-product/${productId}`,
                {
                    headers: { authorization: token }
                }
            );
            setProduct(response.data.results);
            console.log("Product details fetched:", response.data.results);
            
        } catch (error) {
            console.error("Failed to load product:", error);
        } finally {
            setLoading(false);
        }
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#f6f4f2]">
                <p className="text-xl text-gray-600 animate-pulse">Loading Product...</p>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="h-screen flex items-center justify-center bg-[#f6f4f2]">
                <p className="text-xl text-red-600">Product not found.</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#fefcf9] to-[#e7e6e4] pt-40 px-4 pb-16">
            <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start bg-white rounded-3xl shadow-xl overflow-hidden">

                {/* Product Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-[500px] bg-[#fafafa] p-6 rounded-3xl flex justify-center items-center"
                >
                    <img
                        src={product.images?.[0]?.secure_url}
                        alt={product.title}
                        className="h-full w-full object-cover rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>

                {/* Product Details */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="p-6 pr-2 md:pr-8 space-y-6"
                >
                    <h1 className="text-3xl md:text-4xl font-extrabold text-[#3a3a3a]">{product.title}</h1>

                    <p className="text-gray-600 leading-relaxed">{product.description}</p>

                    <div className="space-y-1 text-lg text-gray-800">
                        <div>
                            <span className="font-semibold">Final Price:</span>
                            <span className="ml-2 text-[#b48b62] font-bold text-2xl">{product.finalPrice} EGP</span>
                        </div>
                        {product.discount > 0 && (
                            <div className="flex items-center gap-2 text-gray-500">
                                <span className="line-through">{product.price} EGP</span>
                                <span className="bg-green-100 text-green-700 text-sm px-2 py-0.5 rounded-full">
                                    -{product.discount}%
                                </span>
                            </div>
                        )}
                        <div>
                            <span className="font-semibold">Stock:</span>
                            <span className="ml-2">{product.stock}</span>
                        </div>
                    </div>

                    <UpdateProductQuantity currentQty={quantity} productId={product._id} getUserCart={fetchProductDetails} />

                    {/* Add to cart */}
                    <div className="pt-4">
                        <AddToCartButton productId={product._id} quantity={quantity} />
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
