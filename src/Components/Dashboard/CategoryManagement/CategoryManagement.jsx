import { useContext, useEffect, useState } from 'react';
import { FiPlus, FiEdit2 } from 'react-icons/fi';
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';
import UpdateCategory from './UpdateCategory/UpdateCategory';
import CreateCategory from './CreateCategory/CreateCategory';
import DeleteCategory from './DeleteCategory/DeleteCategory';

export default function CategoryManagement() {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { token } = useContext(UserContext);

  useEffect(() => {
    document.title = 'Category Management';
    window.scrollTo(0, 0);
    getAllCategories();

  }, []);

  async function getAllCategories() {
    try {
      const response = await axios.get(
        'https://sheshop.salis.app/admin/getAllCategories',
        {
          headers: { authorization: token },
        }
      );
      setCategories(response.data.categories || []);
      console.log(response);
      
    } catch (err) {
      console.error('Error fetching categories', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Category Management
        </h1>
        <button
          className="bg-mainBlue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm flex items-center gap-2"
          onClick={() => {
            setShowModal(true);
          }}
        >
          <FiPlus /> Create Category
        </button>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading ? (
          <p className="text-gray-600 dark:text-gray-300 col-span-full">Loading categories...</p>
        ) : categories.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300 col-span-full">No categories found.</p>
        ) : (
          categories.map((category) => (
            <div
              key={category._id}
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 group"
            >
              {/* Edit & Delete Icons */}
              <div className="absolute top-3 right-3 flex flex-col gap-2 z-10">
                <button
                  onClick={() => {
                    setSelectedCategory(category);
                    setShowUpdateModal(true);
                  }}
                  className="p-1 rounded-full hover:bg-blue-100 dark:hover:bg-blue-900 text-blue-600 dark:text-blue-400"
                >
                  <FiEdit2 className="text-lg" />
                </button>
                <DeleteCategory
                  onClick={() => {
                    getAllCategories();
                  }}
                  categoryId={category._id}
                />
              </div>

              {/* Image */}
              <div className="overflow-hidden rounded-t-xl">
                <img
                  src={category.image.secure_url}
                  alt={category.name}
                  className="w-full h-36 object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Name */}
              <div className="p-4">
                <h3 className="text-md font-semibold text-center text-gray-800 dark:text-white">
                  {category.name}
                </h3>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Create Modal */}
      <CreateCategory
        show={showModal}
        onClose={() => {
          setShowModal(false);
          getAllCategories();
        }}
      />

      {/* Update Modal */}
      <UpdateCategory
        show={showUpdateModal}
        onClose={() => {
          setShowUpdateModal(false);
          setSelectedCategory(null);
          getAllCategories();
        }}
        category={selectedCategory}
      />

    </div>
  );
}
