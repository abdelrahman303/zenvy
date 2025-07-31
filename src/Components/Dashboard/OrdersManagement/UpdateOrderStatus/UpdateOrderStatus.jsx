import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../Context/UserContext";
import axios from "axios";

export default function UpdateOrderStatus() {
    const { token } = useContext(UserContext);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [updatingId, setUpdatingId] = useState(null);

    const statuses = [
        "pending", "paid", "placed",
        "shipped", "delivered", "cancelled", "refunded"
    ];

    useEffect(() => {
        document.title = "All Orders";
        window.scrollTo(0, 0);
        fetchOrders();
    }, []);

    async function fetchOrders() {
        try {
            const res = await axios.get("https://sheshop.salis.app/admin/dashboard/all-orders", {
                headers: { authorization: token }
            });
            setOrders(res.data.orders);
        } catch (err) {
            console.error("Failed to fetch orders:", err);
        } finally {
            setLoading(false);
        }
    }

    async function handleStatusChange(orderId, newStatus) {
        setUpdatingId(orderId);
        try {
            const res = await axios.post(
                `https://sheshop.salis.app/admin/update-status/${orderId}`,
                { status: newStatus },
                { headers: { authorization: token } }
            );
            if (res.data.message === "Status updated") {
                fetchOrders();
            }
        } catch (err) {
            console.error("Error updating status:", err);
        } finally {
            setUpdatingId(null);
        }
    }

    return (
        <div className="min-h-screen w-full px-4 py-10 mt-24 md:mt-28 bg-gradient-to-b from-white to-gray-100">
            <h2 className="text-3xl font-bold mb-6 text-center">All Orders</h2>

            {loading ? (
                <div className="text-center text-lg">Loading orders...</div>
            ) : (
                <div className="grid gap-6">
                    {orders.map((order) => (
                        <div key={order._id} className="bg-white rounded-xl shadow p-6 space-y-2">
                            <div className="text-xl font-semibold">{order.firstName} {order.lastName}</div>
                            <div>Email: {order.email}</div>
                            <div>Phone: {order.phone}</div>
                            <div>City: {order.city} — {order.governorate}</div>
                            <div>Payment: {order.paymentMethod}</div>
                            <div className="flex items-center gap-4">
                                <span className="font-medium">Status:</span>
                                <select
                                    value={order.status}
                                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    disabled={updatingId === order._id}
                                    className="border px-3 py-1 rounded-md"
                                >
                                    {statuses.map((status) => (
                                        <option key={status} value={status}>
                                            {status.charAt(0).toUpperCase() + status.slice(1)}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {updatingId === order._id && (
                                <div className="text-sm text-blue-500 mt-1">Updating...</div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
