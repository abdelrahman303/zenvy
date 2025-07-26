import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import axios from 'axios';

export default function LowStockProducts() {
    const { token } = useContext(UserContext);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    async function getLowStockProducts() {
        try {
            const response = await axios.get(
                `https://sheshop.salis.app/admin/dashboard/product-stats/low-stock?threshold=5`,
                { headers: { authorization: token } }
            );

            if (response.data && response.data.products) {
                setProducts(response.data.products);
            } else {
                setProducts([]);
            }
        } catch (err) {
            console.error('Error fetching low stock products:', err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getLowStockProducts();
    }, []);

    return (
        <div className="p-6">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">⚠️ Low Stock Products</h2>

            {loading ? (
                <p className="text-gray-500 text-center">Loading...</p>
            ) : products.length === 0 ? (
                <p className="text-gray-500 text-center">No products with low stock.</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white shadow-md rounded-lg p-4 relative">
                            {product.images?.[0]?.secure_url ? (
                                <img
                                    src={product.images[0].secure_url}
                                    alt={product.title}
                                    className="w-full h-40 object-cover rounded mb-3"
                                />
                            ) : (
                                <div className="w-full h-40 bg-gray-200 flex items-center justify-center mb-3 rounded">
                                    <span className="text-gray-400">No image</span>
                                </div>
                            )}
                            <h3 className="font-semibold text-lg">{product.title}</h3>
                            <p className="text-sm text-gray-600">{product.description}</p>
                            <p className="mt-2 text-sm">
                                <span className="font-bold">Stock:</span>{' '}
                                <span className="text-red-600">{product.stock}</span>
                            </p>
                            <p className="text-sm text-green-700 font-medium">EGP {product.price}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
