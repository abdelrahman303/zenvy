import { useEffect } from 'react';
import { FiShoppingBag } from 'react-icons/fi';
import UpdateOrderStatus from './UpdateOrderStatus/UpdateOrderStatus';

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

     <UpdateOrderStatus />
    </div>
  );
}
