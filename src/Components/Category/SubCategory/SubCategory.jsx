import { useParams } from "react-router-dom";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../../Context/CartContext";

export default function SubCategory() {
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [categoryName, setCategoryName] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { addProductToCart } = useContext(CartContext)
    useEffect(() => {
        document.title = "Sub Category";
        window.scrollTo(0, 0);
        getCategoryProducts();
    }, [categoryId]);

    // get products related to category
    async function getCategoryProducts() {
        try {
            const res = await axios.get(`https://sheshop.salis.app/category/with-products`);
            const category = res.data.categories.find(cat => cat._id === categoryId);
            if (!category) {
                setError("Category not found");
                return;
            }

            setCategoryName(category.name);
            const productsWithImages = category.products.map(p => {
                return p;
            });

            setProducts(productsWithImages);
        } catch (err) {
            setError("Failed to fetch products.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    // add to cart function 
    async function handleAddToCart(productId, quantity = 1) {
        setLoading(true);
        try {
            const res = await addProductToCart(productId, quantity);
            console.log("Product added to cart:", res.results);
        } catch (error) {
            console.error("Failed to add product to cart:", error?.response?.data?.message || error.message || error);
            alert("Failed to add product to cart. Please try again.");
        } finally {
            setLoading(false);
        }
    }


    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center bg-gray-50">
                <p className="text-xl font-semibold text-gray-600 animate-pulse">Loading products...</p>
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
        <div className="min-h-screen px-4 sm:px-8 py-10 pt-36 bg-gradient-to-b from-white via-gray-50 to-white">
            <h1 className="text-4xl font-extrabold text-center mb-12 text-mainBlue tracking-tight">
                {categoryName} Products
            </h1>

            {products.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">No products found in this category.</p>
            ) : (
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 ">
                    {products.map((product) => (
                        <div
                            key={product._id}
                            className="bg-white transition-all duration-300  group "
                        >
                            <div className="relative w-full h-96 rounded-xl overflow-hidden">
                                <img
                                    src={product.images?.[0]?.secure_url}
                                    alt={product.title}
                                    className="w-full h-full object-cover rounded-xl transform group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>

                            <div className="pt-2 ">
                                <h2 className="text-lg font-bold text-gray-800 transition-colors">
                                    {product.title}
                                </h2>
                                <p className="text-mainBlue font-extrabold text-lg mb-2">LE {product.finalPrice}</p>

                                <button
                                    className="w-full  py-2 bg-mainBlue text-white font-medium rounded-md hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
                                    onClick={() => handleAddToCart(product._id)}
                                >
                                    Add to Cart
                                </button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </div>

    );
}
