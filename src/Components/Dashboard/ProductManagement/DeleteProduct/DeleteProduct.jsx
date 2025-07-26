import { useContext } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';

export default function DeleteProduct({ productId, categoryId, onClick }) {
    const { token } = useContext(UserContext);

    async function handleDelete(productId, categoryId) {
        try {
            await axios.delete(`https://sheshop.salis.app/admin/deleteProduct/${productId}?categoryId=${categoryId}`, {
                headers: { authorization: token },
            });

            if (onClick) onClick(); // 🔥 Trigger re-fetch passed from parent
        } catch (err) {
            console.error('Error deleting Product:', err);
        }
    }

    return (
        <button
            onClick={() => handleDelete(productId, categoryId)}
            className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400 flex justify-center items-center"
        >
            <FiTrash2 className="text-lg" />
        </button>
    );
}
