import { useContext, useState } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiX, FiImage } from 'react-icons/fi';

export default function CreateProduct({ show, onClose, categoryId }) {
    const { token } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState(null);
    const formik = useFormik({
        initialValues: {
            title: '',
            images: null,
            price: '',
            categoryId: '',
            stock: '',
            description: '',
            discount: ''
        },
        validationSchema: Yup.object({
            title: Yup.string().required('Product title is required'),
            images: Yup.mixed().required('Image is required'),
            price: Yup.number().required('Price is required'),

            stock: Yup.number().required('Stock is required'),
            description: Yup.string(),
            discount: Yup.number()
        }),
        onSubmit: handleCreateProduct
    });

    async function handleCreateProduct(values) {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('title', values.title);
            formData.append('images', values.images);
            formData.append('price', values.price);

            formData.append('stock', values.stock);
            formData.append('description', values.description);
            formData.append('discount', values.discount);

            const res = await axios.post(`https://sheshop.salis.app/admin/createProduct/${categoryId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    authorization: token,
                },
            });

            if (res?.data?.message === 'Product created successfully') {
                formik.resetForm();
                setPreview(null);
                onClose();
            }
            console.log(res);

        } catch (error) {
            console.error('Failed to create Product:', error);
        } finally {
            setLoading(false);
        }
    }

    function handleImageChange(e) {
        const file = e.currentTarget.files[0];
        formik.setFieldValue('images', file);
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    }

    if (!show) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
            <div className="bg-white dark:bg-gray-900 w-full max-w-lg rounded-xl shadow-lg p-6 relative max-h-[90vh] overflow-y-auto">
                <button
                    className="absolute top-3 right-3 text-gray-500 hover:text-red-500"
                    onClick={onClose}
                >
                    <FiX size={20} />
                </button>
                <h2 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-4">
                    Create Product
                </h2>
                <form onSubmit={formik.handleSubmit} className="space-y-4">
                    {/* Title */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.title}
                            placeholder="Product title"
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white"
                        />
                        {formik.touched.title && formik.errors.title && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.title}</p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Product Image
                        </label>
                        <input
                            type="file"
                            name="images"
                            accept="image/*"
                            onChange={handleImageChange}
                            onBlur={formik.handleBlur}
                            className="w-full text-sm text-gray-500 dark:text-gray-300"
                        />
                        {formik.touched.images && formik.errors.images && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.images}</p>
                        )}
                        <div className="mt-2 w-32 h-32 bg-gray-100 dark:bg-gray-800 rounded-md overflow-hidden flex items-center justify-center">
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FiImage className="text-gray-400 text-3xl" />
                            )}
                        </div>
                    </div>

                    {/* Price */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Price
                        </label>
                        <input
                            type="number"
                            name="price"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.price}
                            placeholder="e.g. 100"
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white"
                        />
                        {formik.touched.price && formik.errors.price && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.price}</p>
                        )}
                    </div>

                    {/* Stock */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Stock
                        </label>
                        <input
                            type="number"
                            name="stock"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.stock}
                            placeholder="e.g. 50"
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white"
                        />
                        {formik.touched.stock && formik.errors.stock && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.stock}</p>
                        )}
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Description
                        </label>
                        <textarea
                            name="description"
                            rows="3"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.description}
                            placeholder="Optional description..."
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white"
                        />
                        {formik.touched.description && formik.errors.description && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.description}</p>
                        )}
                    </div>

                    {/* Discount */}
                    <div>
                        <label className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Discount (%)
                        </label>
                        <input
                            type="number"
                            name="discount"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.discount}
                            placeholder="e.g. 10"
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white"
                        />
                        {formik.touched.discount && formik.errors.discount && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.discount}</p>
                        )}
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-blue-600 hover:bg-blue-700 transition-all text-white font-medium py-2 rounded-lg text-sm"
                        >
                            {loading ? 'Creating...' : 'Create Product'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

