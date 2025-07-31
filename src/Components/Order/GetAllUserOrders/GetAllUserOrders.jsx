import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../Context/UserContext';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiXCircle } from 'react-icons/fi';

export default function GetAllUserOrders() {
    const { token } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [cancelledId, setCancelledId] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        document.title = 'My Orders';
        window.scrollTo(0, 0);
        getAllOrders();
    }, []);

    async function getAllOrders() {
        try {
            const res = await axios.get('https://sheshop.salis.app/order/my-orders', {
                headers: { authorization: token },
            });
            setOrders(res.data?.results || []);
        } catch (err) {
            console.error('Error fetching orders:', err);
            setError('Something went wrong while fetching orders.');
        } finally {
            setLoading(false);
        }
    }

    function openCancelModal(order) {
        if (order.status !== 'pending') {
            setError('Only pending orders can be cancelled.');
            setTimeout(() => setError(''), 3000);
            return;
        }
        setSelectedOrder(order);
        setShowModal(true);
    }

    async function confirmCancelOrder() {
        try {
            await axios.patch(
                `https://sheshop.salis.app/order/cancel/${selectedOrder._id}`,
                {},
                {
                    headers: { authorization: token },
                }
            );
            setCancelledId(selectedOrder._id);
            setOrders((prev) =>
                prev.map((o) =>
                    o._id === selectedOrder._id ? { ...o, status: 'cancelled' } : o
                )
            );
        } catch (err) {
            console.error('Cancel error:', err);
            setError('Failed to cancel order. Please try again later.');
            setTimeout(() => setError(''), 3000);
        } finally {
            setShowModal(false);
            setSelectedOrder(null);
        }
    }

    if (loading) {
        return (
            <div className="h-screen flex items-center justify-center text-gray-600 dark:text-gray-300">
                Loading your orders...
            </div>
        );
    }

    return (
        <div className="min-h-screen px-4 md:px-10 py-10 bg-gray-50 dark:bg-gray-900 mt-28">
            <h2 className="text-3xl font-bold mb-10 text-mainBlue dark:text-white">
                Orders
            </h2>

            {error && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg border border-red-300">
                    {error}
                </div>
            )}

            {orders.length === 0 ? (
                <div className="text-center text-gray-600 dark:text-gray-400">
                    <p>No orders yet</p>
                    <p>Go to store to place an order.</p>
                </div>
            ) : (
                <div className="space-y-8">
                    {orders.map((order, index) => (
                        <motion.div
                            key={index}
                            className={`relative bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 space-y-4 border-l-4 ${order.status === 'cancelled' ? 'border-red-500' : 'border-mainBlue'
                                }`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            {/* Header */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between">
                                <div className="mb-2 md:mb-0">
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                        {order.firstName} {order.lastName}
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-white">
                                        {order._id}
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Placed on {new Date(order.createdAt).toLocaleDateString()}
                                    </p>
                                </div>
                                <span
                                    className={`px-3 py-1 text-sm rounded-full font-medium capitalize ${order.status === 'cancelled'
                                            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                            : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300'
                                        }`}
                                >
                                    {order.status}
                                </span>
                            </div>

                            {/* Products */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                {order.products.map((product) => (
                                    <div
                                        key={product._id}
                                        className="flex items-center gap-4 bg-gray-100 dark:bg-gray-700 p-3 rounded-xl"
                                    >
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-16 h-16 rounded-lg object-cover border"
                                        />
                                        <div className="flex-1">
                                            <p className="font-semibold text-gray-700 dark:text-white">{product.title}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-300">
                                                Quantity: {product.quantity}
                                            </p>
                                            <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
                                                Total: {product.quantity * product.price} LE
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Shipping & Total */}
                            <div className="flex flex-col md:flex-row justify-between mt-4 text-sm text-gray-700 dark:text-gray-300">
                                <div>
                                    <p>
                                        <span className="font-medium">Phone:</span> {order.phone}
                                    </p>
                                    <p>
                                        <span className="font-medium">Address:</span> {order.address}, {order.city}, {order.governorate}
                                    </p>
                                    <p>
                                        <span className="font-medium">Payment:</span> {order.paymentMethod}
                                    </p>
                                </div>
                                <div className="mt-4 md:mt-0 text-right">
                                    <p className="text-base font-bold text-mainBlue dark:text-white">
                                        Total: {order.totalPrice} LE
                                    </p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Includes shipping: {order.shippingFee} LE
                                    </p>
                                </div>
                            </div>

                            {/* Cancel Button */}
                            {order.status === 'pending' && (
                                <button
                                    onClick={() => openCancelModal(order)}
                                    className="absolute top-14 right-4 flex items-center gap-1 text-sm font-medium px-3 py-1 rounded-full bg-red-100 text-red-700 hover:bg-red-200 transition dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                                >
                                    <FiXCircle className="text-base" />
                                    Cancel Order
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            )}

            {/* Confirm Cancel Modal */}
            <AnimatePresence>
                {showModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-xl w-[90%] max-w-md text-center"
                        >
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                                Are you sure you want to delete the order?
                            </h3>
                            <div className="flex justify-center gap-4">
                                <button
                                    onClick={() => {
                                        setShowModal(false);
                                        setSelectedOrder(null);
                                    }}
                                    className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-300 bg-gray-200 dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmCancelOrder}
                                    className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 transition"
                                >
                                    Yes, Delete
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
