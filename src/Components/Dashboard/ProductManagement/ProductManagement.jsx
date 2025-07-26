import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../../../Context/UserContext';
import CreateProduct from './CreateProduct/CreateProduct';
import { FiPlus } from 'react-icons/fi';
import UpdateProduct from './UpdateProduct/UpdateProduct';
import DeleteProduct from './DeleteProduct/DeleteProduct';

export default function ProductManagement() {
  const { token } = useContext(UserContext);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://sheshop.salis.app/admin/getAllCategoriesWithProducts', {
        headers: { authorization: token }
      });
      console.log('Fetched product data:', response.data);
      if (response.data && response.data.categories) {
        setCategories(response.data.categories);
      } else {
        setCategories([]);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold text-gray-800 dark:text-white mb-6">
        Product Management
      </h1>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : categories.length > 0 ? (
        categories.map((category) => (
          <div key={category._id} className="mb-10">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold mb-4">{category.name}</h2>
              <button
                className="bg-mainBlue text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all text-sm flex items-center gap-2"
                onClick={() => {
                  setShowModal(true);
                  setSelectedCategory(category._id);
                }}
              >
                <FiPlus /> Create Product
              </button>
            </div>

            {category.products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.products.map((product) => (
                  <div
                    key={product._id}
                    className="bg-white p-4 shadow-md rounded-lg relative"
                  >
                    {product.images?.[0]?.secure_url ? (
                      <img
                        src={product.images[0].secure_url}
                        alt={product.title}
                        className="w-full h-48 object-cover mb-3 rounded"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center mb-3 rounded">
                        <span className="text-gray-400">No image</span>
                      </div>
                    )}
                    <h3 className="text-lg font-medium">{product.title}</h3>
                    <p className="text-gray-600 mb-1">{product.description}</p>
                    <p className="font-bold text-green-600">EGP {product._id}</p>
                    <p className="font-bold text-green-600">EGP {product.price}</p>
                    <p className="font-bold text-green-600">EGP {product.finalPrice}</p>
                    <p className="text-sm text-gray-500">Stock: {product.stock}</p>

                    <div className="absolute top-3 right-3 flex flex-col space-y-2">
                      <button
                        onClick={() => setSelectedProduct({ ...product, categoryId: category._id })}
                        className="bg-yellow-400 hover:bg-yellow-500 text-white p-2 rounded-full shadow-md transition"
                        title="Edit Product"
                      >
                        ✏️
                      </button>
                      <DeleteProduct
                        onClick={() => {
                          getAllProducts();
                        }}
                        categoryId={category._id}
                        productId={product._id}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 italic">No products in this category yet.</p>
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No categories found.</p>
      )}

      {showModal && (
        <CreateProduct
          show={showModal}
          onClose={() => {
            setShowModal(false);
            getAllProducts();
          }}
          categoryId={selectedCategory}
          categories={categories}
        />
      )}

      {selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSuccess={() => {
            getAllProducts();
            setSelectedProduct(null);
          }}
        />
      )}



    </div>
  );
}
