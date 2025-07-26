import { useContext, useEffect, useState } from 'react';
import { FiX, FiUploadCloud } from 'react-icons/fi';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserContext } from '../../../../Context/UserContext';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function UpdateCategory({ show, onClose, category }) {
    const { token } = useContext(UserContext);
    const [preview, setPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: category?.name || '',
            image: null,
        },
        enableReinitialize: true,
        validationSchema: Yup.object({
            name: Yup.string().required('Category name is required'),
        }),
        onSubmit: handleUpdateCategory
    });

    async function handleUpdateCategory(values) {
        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            if (values.image) {
                formData.append('image', values.image);
            }

            const response = await axios.patch(
                `https://sheshop.salis.app/admin/updateCategory/${category._id}`,
                formData,
                {
                    headers: {
                        authorization: token,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );

            const newImageUrl = response?.data?.data?.image?.secure_url;

            if (newImageUrl) {
                setPreview(newImageUrl); // Update preview image
              
            } else {
                onClose();
            }
        } catch (error) {
            console.error('Failed to update category:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (category?.image?.secure_url) {
            setPreview(category.image.secure_url);
        }
    }, [category]);

    useEffect(() => {
        if (!show) {
            setPreview(null);
            formik.resetForm();
        }
    }, [show]);

    if (!show || !category) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="relative w-full max-w-md bg-white dark:bg-gray-900 p-6 rounded-xl shadow-xl"
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
                >
                    <FiX size={20} />
                </button>

                <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white text-center">
                    Update Category
                </h2>

                <form onSubmit={formik.handleSubmit} className="space-y-5">
                    {/* Category Name */}
                    <div>
                        <label className="block mb-1 font-medium text-sm text-gray-700 dark:text-gray-300">
                            Category Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            placeholder="e.g. Electronics"
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-lg px-4 py-2 text-sm bg-white dark:bg-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {formik.touched.name && formik.errors.name && (
                            <p className="text-sm text-red-500 mt-1">{formik.errors.name}</p>
                        )}
                    </div>

                    {/* Image Upload */}
                    <div>
                        <label className="block mb-1 font-medium text-sm text-gray-700 dark:text-gray-300">
                            Category Image (optional)
                        </label>

                        <div
                            className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 cursor-pointer hover:border-blue-400"
                            onClick={() => document.getElementById('image-upload').click()}
                        >
                            {preview ? (
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="w-full h-36 object-contain rounded-md mb-2"
                                />
                            ) : (
                                <div className="text-center text-gray-500 dark:text-gray-400 text-sm flex flex-col items-center gap-2">
                                    <FiUploadCloud size={24} />
                                    Click or drag to upload
                                </div>
                            )}
                        </div>

                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(event) => {
                                const file = event.currentTarget.files[0];
                                if (file) {
                                    formik.setFieldValue('image', file);

                                    const reader = new FileReader();
                                    reader.onloadend = () => setPreview(reader.result);
                                    reader.readAsDataURL(file);
                                }
                            }}
                        />
                    </div>

                    {/* Submit */}
                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-mainBlue hover:bg-blue-700 transition-all text-white font-medium py-2 rounded-lg text-sm"
                        >
                            {loading ? 'Updating...' : 'Update Category'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
