import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import UpdateProductQuantity from "./UpdateProductQuantity/UpdateProductQuantity";

const CartPage = () => {
    const [userCart, setUserCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(null);
    const { getCart, deleteProductFromCart } = useContext(CartContext);

    useEffect(() => {
        getUserCart();
    }, []);

    async function getUserCart() {
        setLoading(true);
        try {
            const res = await getCart();
            setUserCart(res.data?.results || null);
            console.log("User cart fetched:", res.data?.results);
            
        } catch (error) {
            if (error.response?.status === 404) {
                setUserCart(null);
            } else {
                console.error("Failed to fetch cart", error);
            }
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteProduct(productId) {
        setDeleting(productId);
        try {
            await deleteProductFromCart(productId);
            await getUserCart();

        } catch (err) {
            console.error("Failed to delete item from cart", err);
        } finally {
            setDeleting(null);
        }
    }

    return (
        <div className="min-h-screen bg-gray-50 px-4 pt-36 pb-20">
            <h1 className="text-4xl font-bold text-center text-mainBlue mb-10 flex items-center justify-center gap-2">
                <FiShoppingCart className="text-4xl" /> Your Cart
            </h1>

            {loading ? (
                <p className="text-center text-gray-500 text-lg">Loading cart...</p>
            ) : !userCart || !userCart.products || userCart.products.length === 0 ? (
                <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
            ) : (
                <div className="max-w-5xl mx-auto grid gap-6">
                    {userCart.products.map((item) => (
                        <div
                            key={item.product._id}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col md:flex-row items-center md:items-start p-5 gap-6"
                        >
                            <div className="w-full md:w-40 h-40 overflow-hidden rounded-xl">
                                <img
                                    src={item.product?.images?.[0]}
                                    alt={item.product?.title || "Product"}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex-1 w-full">
                                <div className="flex justify-between items-start flex-col sm:flex-row">
                                    <div className="w-full sm:w-auto">
                                        <h2 className="text-xl font-semibold text-gray-800">{item.product?.title}</h2>
                                        <p className="text-gray-600 mt-1">
                                            Price per unit: <span className="font-medium">LE {item.product?.finalPrice}</span>
                                        </p>

                                        {/* Quantity Control */}
                                        <UpdateProductQuantity productId={item.product._id} currentQty={item.quantity} getUserCart={getUserCart} />


                                        <p className="text-mainBlue font-bold mt-3 text-lg">
                                            Total: LE {item.total}
                                        </p>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteProduct(item.product._id)}
                                        disabled={deleting === item.product._id}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full transition self-start sm:self-center mt-4 sm:mt-0"
                                        title="Remove from cart"
                                    >
                                        {deleting === item.product._id ? (
                                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                            </svg>
                                        ) : (
                                            <FiTrash2 className="text-2xl" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Cart Summary */}
                    <div className="bg-mainBlue text-white p-6 rounded-2xl shadow-lg text-center mt-6">
                        <h2 className="text-2xl font-bold">Cart Summary</h2>
                        <p className="mt-2 text-lg">Total Items: {userCart.totalItems}</p>
                        <p className="text-xl font-bold mt-1">Grand Total: LE {userCart.grandTotal}</p>

                        <Link
                            to='/create-order'
                            className="mt-10 bg-white text-mainBlue font-bold py-3 px-6 rounded-xl hover:bg-gray-100 transition duration-200"
                        >
                            Check Out
                        </Link>
                    </div>

                </div>
            )}
        </div>
    );
};

export default CartPage;
