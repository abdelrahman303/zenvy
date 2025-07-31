// src/components/AddToCartButton.jsx
import { useContext, useState } from "react";
import { FaCartPlus } from "react-icons/fa";
import { CartContext } from "../../Context/CartContext";

export default function AddToCartButton({ productId, quantity = 1 }) {
    const [loading, setLoading] = useState(false);
    const { addProductToCart } = useContext(CartContext);
    async function handleClick() {
        setLoading(true);
        try {
            await addProductToCart(productId, quantity);
            console.log("✅ Added to cart!");
        } catch (error) {
            console.log("❌ Failed to add to cart.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleClick}
            disabled={loading}
            className={`flex items-center gap-2 w-full justify-center px-4 py-2 mt-2 rounded-lg text-white font-semibold transition-all duration-300 ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-black hover:bg-gray-800"
                }`}
        >
            {loading ? (
                <svg
                    className="w-5 h-5 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
                    />
                </svg>
            ) : (
                <>
                    <FaCartPlus className="text-lg" />
                    Add to Cart
                </>
            )}
        </button>
    );
}
