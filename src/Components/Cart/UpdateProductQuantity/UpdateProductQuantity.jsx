import { useContext, useState } from "react";
import { CartContext } from "../../../Context/CartContext";
import { FiMinus, FiPlus } from "react-icons/fi";



export default function UpdateProductQuantity({productId, currentQty , getUserCart}) {
    const [updatingQtyId, setUpdatingQtyId] = useState(null);

    const { updateProductQuantity } = useContext(CartContext);



    async function handleUpdateQuantity(pId, current_Qty, typeOfQty) {
        const newQty = typeOfQty === "inc" ? current_Qty + 1 : current_Qty - 1;
        if (newQty < 1) return;
        setUpdatingQtyId(pId);
        try {
            await updateProductQuantity(pId, newQty);
            await getUserCart();
        } catch (err) {
            console.error("Failed to update quantity", err);
        } finally {
            setUpdatingQtyId(null);
        }
    }


    return (
        <div className="" >

            {/* Quantity Control */}
            <div className="flex items-center gap-3 mt-3">
                <button
                    onClick={() =>
                        handleUpdateQuantity(productId, currentQty, "dec")
                    }
                    disabled={currentQty === 1 || updatingQtyId === productId}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-1.5 transition disabled:opacity-40"
                >
                    <FiMinus />
                </button>
                <span className="font-medium text-lg">{currentQty}</span>
                <button
                    onClick={() =>
                        handleUpdateQuantity(productId, currentQty, "inc")
                    }
                    disabled={updatingQtyId === productId}
                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-full p-1.5 transition disabled:opacity-40"
                >
                    <FiPlus />
                </button>
            </div>

        </div>
    )
}