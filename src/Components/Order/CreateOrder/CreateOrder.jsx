import { useContext, useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { UserContext } from "../../../Context/UserContext";
import { CartContext } from "../../../Context/CartContext";

const governorates = [
    "Cairo", "Alexandria", "Giza", "Qalyubia", "Dakahlia", "Sharqia", "Gharbia",
    "Minya", "Assiut", "Fayoum", "Beni Suef", "Sohag", "Qena", "Aswan", "Luxor",
    "Red Sea", "New Valley", "North Sinai", "South Sinai", "Matruh", "Beheira", "Ismailia", "Suez", "Port Said", "Damietta", "Kafr El Sheikh", "Monufia"
];

export default function CreateOrder() {
    const { token } = useContext(UserContext);
    const { getCart } = useContext(CartContext);

    const [userCart, setUserCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        getUserCart();
    }, []);

    async function getUserCart() {
        setLoading(true);
        try {
            const res = await getCart();
            setUserCart(res.data?.results || null);
        } catch (err) {
            console.error("Failed to fetch cart", err);
        } finally {
            setLoading(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            firstName: "",
            lastName: "",
            address: "",
            city: "",
            governorate: "",
            phone: "",
        },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email").required("Required"),
            firstName: Yup.string().required("Required"),
            lastName: Yup.string().required("Required"),
            address: Yup.string().required("Required"),
            city: Yup.string().required("Required"),
            governorate: Yup.string().required("Required"),
            phone: Yup.string()
                .matches(/^01[0-9]{9}$/, "Invalid phone number")
                .required("Required"),
        }),
        onSubmit: async (values) => {
            setSubmitting(true);
            setSuccessMsg("");
            setErrorMsg("");

            try {
                const res = await axios.post(
                    "https://sheshop.salis.app/order/create",
                    {
                        ...values,
                        paymentMethod: "cash",
                        shippingFee: 70,
                    },
                    {
                        headers: {
                            authorization: token,
                        },
                    }
                );
                setSuccessMsg("✅ Order placed successfully!");
            } catch (err) {
                console.error(err);
                setErrorMsg("❌ Failed to place order.");
            } finally {
                setSubmitting(false);
            }
        },
    });

    return (
        <div className="min-h-screen pt-28 pb-20 px-4 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <div>
                    <h2 className="text-3xl font-bold text-mainBlue mb-6">Shipping Info</h2>
                    <form onSubmit={formik.handleSubmit} className="space-y-4">
                        {[
                            { label: "Email", name: "email", type: "email" },
                            { label: "First Name", name: "firstName" },
                            { label: "Last Name", name: "lastName" },
                            { label: "Address", name: "address" },
                            { label: "City", name: "city" },
                            { label: "Phone", name: "phone" },
                        ].map(({ label, name, type = "text" }) => (
                            <div key={name}>
                                <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                    {label}
                                </label>
                                <input
                                    type={type}
                                    name={name}
                                    value={formik.values[name]}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                                {formik.touched[name] && formik.errors[name] && (
                                    <div className="text-red-600 text-sm mt-1">{formik.errors[name]}</div>
                                )}
                            </div>
                        ))}

                        {/* Governorate Dropdown */}
                        <div>
                            <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
                                Governorate
                            </label>
                            <select
                                name="governorate"
                                value={formik.values.governorate}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                            >
                                <option value="">Select Governorate</option>
                                {governorates.map((gov) => (
                                    <option key={gov} value={gov}>{gov}</option>
                                ))}
                            </select>
                            {formik.touched.governorate && formik.errors.governorate && (
                                <div className="text-red-600 text-sm mt-1">{formik.errors.governorate}</div>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-full bg-mainBlue text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition font-semibold"
                        >
                            {submitting ? "Placing Order..." : "Place Order (Cash Only)"}
                        </button>

                        {successMsg && <p className="text-green-600 mt-3 font-medium">{successMsg}</p>}
                        {errorMsg && <p className="text-red-600 mt-3 font-medium">{errorMsg}</p>}
                    </form>
                </div>

                {/* Cart Summary */}
                <div className="bg-gray-100 dark:bg-gray-700 rounded-xl p-6 h-fit sticky top-28">

                    <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">Cart Summary</h3>

                    {loading ? (
                        <p className="text-gray-500">Loading cart...</p>
                    ) : !userCart || userCart.products.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty.</p>
                    ) : (
                        <ul className="space-y-4">
                            {userCart.products.map((item) => (
                                <li
                                    key={item.product._id}
                                    className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                                >
                                    <span>{item.product.title} (x{item.quantity})</span>
                                    <span>LE {item.total}</span>
                                </li>
                            ))}
                            <li className="flex justify-between font-semibold border-t pt-4 text-gray-800 dark:text-white">
                                <span>Cart Total:</span>
                                <span>LE {userCart.grandTotal}</span>
                            </li>
                            <li className="flex justify-between font-semibold text-gray-800 dark:text-white">
                                <span>Shipping:</span>
                                <span>LE 70</span>
                            </li>
                            <li className="flex justify-between font-bold border-t pt-4 text-mainBlue">
                                <span>Total:</span>
                                <span>LE {userCart.grandTotal + 70}</span>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
