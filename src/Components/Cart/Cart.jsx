// import { useContext, useEffect, useState } from "react";
// import { CartContext } from "../../Context/CartContext";
// import { FiShoppingCart } from "react-icons/fi";

// const CartPage = () => {
//     const [userCart, setUserCart] = useState(null);
//     const [loading, setLoading] = useState(false);
//     const { getCart, deleteProductFromCart } = useContext(CartContext);

//     useEffect(() => {
//         getUserCart();
//     }, []);
//     {/*-------fetch user cart ---------*/ }
//     async function getUserCart() {
//         setLoading(true);
//         try {
//             const res = await getCart();
//             setUserCart(res.data.results);
//         } catch (error) {
//             console.error('Failed to fetch cart');
//         } finally {
//             setLoading(false);
//         }
//     }

//     {/*-------delete product from cart---------*/ }
//     async function handelDeleteProduct(productId) {
//         setLoading(true);
//         try {
//             const res = await deleteProductFromCart(productId);
//             setUserCart(res.data.results);
//         } catch (error) {
//             console.error('Failed to fetch cart');
//         } finally {
//             setLoading(false);
//         }
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 px-4 pt-36 pb-20">
//             <h1 className="text-4xl font-bold text-center text-mainBlue mb-10 flex items-center justify-center gap-2">
//                 <FiShoppingCart className="text-4xl" /> Your Cart
//             </h1>

//             {loading ? (
//                 <p className="text-center text-gray-500 text-lg">Loading cart...</p>
//             ) : !userCart || userCart.totalItems === 0 ? (
//                 <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
//             ) : (
//                 <div className="max-w-5xl mx-auto grid gap-6">
//                     {userCart.products.map((item, index) => (
//                         <div
//                             key={index}
//                             className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col md:flex-row items-center md:items-start p-5 gap-6"
//                         >
//                             {/* Product Image */}
//                             <div className="w-full md:w-40 h-40 overflow-hidden rounded-xl">
//                                 <img
//                                     src={item.product?.images?.[0]?.secure_url}
//                                     alt={item.product?.title || "Product"}
//                                     className="w-full h-full object-cover"
//                                 />
//                             </div>

//                             {/* Product Info */}
//                             <div className="flex-1 w-full">
//                                 <h2 className="text-xl font-semibold text-gray-800">{item.product?.title}</h2>
//                                 <p className="text-gray-600 mt-1">Price : <span className="font-medium">LE {item.price}</span></p>
//                                 <p className="text-gray-600 mt-1">Quantity: <span className="font-medium">{item.quantity}</span></p>
//                             </div>

//                             {/* delete item button */}

//                             {/* <button
//                                 // disabled={deleteLoading === p.product?.id}
//                                 onClick={() => handelDeleteProduct(item.product._id)}
//                                 className="relative disabled:bg-red-400 flex justify-center items-center p-2 w-10 md:w-24 bg-red-500 text-white font-bold text-sm leading-6 rounded-xl shadow-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 dark:focus:ring-red-800 transition ease-in-out duration-300 transform hover:scale-105"
//                             >
//                                 {deleteLoading === p.product?.id ? <ImSpinner9 className="animate-spin text-white text-xl" /> : (
//                                     <>
//                                         <svg className="w-[18px] h-[18px] fill-[#ffffff] md:mr-2" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
//                                             <path d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"></path>
//                                         </svg>
//                                         <span className="hidden md:inline">Remove</span>
//                                     </>
//                                 )}
//                             </button> */}
//                         </div>
//                     ))}

//                     {/* Summary Section */}
//                     <div className="bg-mainBlue text-white p-6 rounded-2xl shadow-lg text-center mt-6">
//                         <h2 className="text-2xl font-bold">Cart Summary</h2>
//                         <p className="mt-2 text-lg">Total Items: {userCart.totalItems}</p>
//                         <p className="text-xl font-bold mt-1">Grand Total: LE {userCart.grandTotal}</p>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default CartPage;



import { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { FiShoppingCart, FiTrash2 } from "react-icons/fi";

const CartPage = () => {
    const [userCart, setUserCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [deleting, setDeleting] = useState(null); // product ID being deleted
    const { getCart, deleteProductFromCart } = useContext(CartContext);

    useEffect(() => {
        getUserCart();
    }, []);

    async function getUserCart() {
        setLoading(true);
        try {
            const res = await getCart();
            setUserCart(res.data.results);
        } catch (error) {
            console.error("Failed to fetch cart");
        } finally {
            setLoading(false);
        }
    }

    async function handleDeleteProduct(productId) {
        setDeleting(productId);
        try {
            await deleteProductFromCart(productId);
            await getUserCart(); // refresh cart
        } catch (err) {
            console.error("Failed to delete item from cart");
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
            ) : !userCart || userCart.totalItems === 0 ? (
                <p className="text-center text-gray-500 text-lg">Your cart is empty.</p>
            ) : (
                <div className="max-w-5xl mx-auto grid gap-6">
                    {userCart.products.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden flex flex-col md:flex-row items-center md:items-start p-5 gap-6"
                        >
                            {/* Product Image */}
                            <div className="w-full md:w-40 h-40 overflow-hidden rounded-xl">
                                <img
                                    src={item.product?.images?.[0]?.secure_url}
                                    alt={item.product?.title || "Product"}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 w-full">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">{item.product?.title}</h2>
                                        <p className="text-gray-600 mt-1">Price per unit: <span className="font-medium">LE {item.price}</span></p>
                                        <p className="text-gray-600 mt-1">Quantity: <span className="font-medium">{item.quantity}</span></p>
                                        <p className="text-mainBlue font-bold mt-2 text-lg">Total: LE {item.total}</p>
                                    </div>

                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDeleteProduct(item.product._id)}
                                        disabled={deleting === item.product._id}
                                        className="text-red-500 hover:text-red-700 p-2 rounded-full transition"
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

                    {/* Summary Section */}
                    <div className="bg-mainBlue text-white p-6 rounded-2xl shadow-lg text-center mt-6">
                        <h2 className="text-2xl font-bold">Cart Summary</h2>
                        <p className="mt-2 text-lg">Total Items: {userCart.totalItems}</p>
                        <p className="text-xl font-bold mt-1">Grand Total: LE {userCart.grandTotal}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CartPage;
