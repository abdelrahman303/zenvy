import { useContext } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import axios from 'axios';
import { FiTrash2 } from 'react-icons/fi';

export default function DeleteCategory({ categoryId, onClick }) {
    const { token } = useContext(UserContext);

    async function handleDelete(id) {
        try {
            await axios.delete(`https://sheshop.salis.app/admin/deleteCategory/${id}`, {
                headers: { authorization: token },
            });

            if (onClick) onClick(); // 🔥 Trigger re-fetch passed from parent
        } catch (err) {
            console.error('Error deleting category:', err);
        }
    }

    return (
        <button
            onClick={() => handleDelete(categoryId)}
            className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900 text-red-600 dark:text-red-400"
        >
            <FiTrash2 className="text-lg" />
        </button>
    );
}
