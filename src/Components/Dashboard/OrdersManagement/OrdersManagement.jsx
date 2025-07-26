import { useEffect } from 'react';
import { FiShoppingBag } from 'react-icons/fi';

export default function OrdersManagement() {
  useEffect(() => {
    document.title = 'Orders Management';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold flex items-center gap-2 text-mainBlue">
          <FiShoppingBag /> Orders Management
        </h1>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-md">
        <p className="text-gray-500 dark:text-gray-300">Orders will be listed here with filtering and actions.</p>
      </div>
    </div>
  );
}
