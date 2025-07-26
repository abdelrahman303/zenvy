import { useContext, useEffect } from 'react';
import { useFormik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { UserContext } from '../../../../Context/UserContext';
import axios from 'axios';
import { FiX } from 'react-icons/fi';

export default function UpdateProduct({ product, onClose, onSuccess }) {
    const { token } = useContext(UserContext);

    const formik = useFormik({
        initialValues: {
            title: product.title,
            description: product.description,
            price: product.price,
            discount: product.discount,
            stock: product.stock,
            images: [], // New for image upload
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Title is required'),
            description: Yup.string().required('Description is required'),
            price: Yup.number().required('Price is required'),
            discount: Yup.number().min(0).max(100),
            stock: Yup.number().required('Stock is required'),
        }),
        onSubmit: async (values) => {
            try {
                const formData = new FormData();
                formData.append("title", values.title);
                formData.append("description", values.description);
                formData.append("price", values.price);
                formData.append("discount", values.discount);
                formData.append("stock", values.stock);

                if (values.images?.[0]) {
                    formData.append("images", values.images[0]); // single image
                }

                const { data } = await axios.patch(
                    `https://sheshop.salis.app/admin/updateProduct/${product._id}?categoryId=${product.categoryId}`,
                    formData,
                    {
                        headers: {
                            authorization: token,
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );

                if (data.message === 'Product updated') {
                    onSuccess(); // Refresh product list
                }
            } catch (err) {
                console.error('Update failed', err);
            }
        },
    });

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEscape);
        return () => window.removeEventListener('keydown', handleEscape);
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-2xl relative"
            >
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-xl"
                >
                    <FiX />
                </button>

                <h2 className="text-2xl font-bold mb-6 text-center">Update Product</h2>

                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formik.values.title}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded-xl"
                        />
                        {formik.errors.title && <p className="text-red-500 text-sm">{formik.errors.title}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Description</label>
                        <textarea
                            name="description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded-xl"
                        />
                        {formik.errors.description && <p className="text-red-500 text-sm">{formik.errors.description}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={formik.values.price}
                                onChange={formik.handleChange}
                                className="w-full p-2 border rounded-xl"
                            />
                            {formik.errors.price && <p className="text-red-500 text-sm">{formik.errors.price}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-medium">Discount (%)</label>
                            <input
                                type="number"
                                name="discount"
                                value={formik.values.discount}
                                onChange={formik.handleChange}
                                className="w-full p-2 border rounded-xl"
                            />
                            {formik.errors.discount && <p className="text-red-500 text-sm">{formik.errors.discount}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium">Stock</label>
                        <input
                            type="number"
                            name="stock"
                            value={formik.values.stock}
                            onChange={formik.handleChange}
                            className="w-full p-2 border rounded-xl"
                        />
                        {formik.errors.stock && <p className="text-red-500 text-sm">{formik.errors.stock}</p>}
                    </div>

                    <div className="flex items-center justify-between">
                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Current Image</label>
                            {product.images?.[0]?.secure_url && (
                                <img
                                    src={product.images[0].secure_url}
                                    alt="Product"
                                    className="w-32 h-32 object-cover rounded-xl border"
                                />
                            )}
                        </div>

                        <div className="mt-4">
                            <label className="block text-sm font-medium mb-2">Update Image</label>
                            <input
                                type="file"
                                name="images"
                                accept="image/*"
                                onChange={(e) => {
                                    formik.setFieldValue("images", e.currentTarget.files);
                                }}
                                className="block w-full text-sm text-gray-500
                                file:mr-4 file:py-2 file:px-4
                                file:rounded-xl file:border-0
                                file:text-sm file:font-semibold
                                file:bg-blue-50 file:text-blue-700
                                hover:file:bg-blue-100"
                            />
                            {formik.values.images?.[0] && (
                                <img
                                    src={URL.createObjectURL(formik.values.images[0])}
                                    alt="Preview"
                                    className="w-32 h-32 object-cover rounded-xl border mt-2"
                                />
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
