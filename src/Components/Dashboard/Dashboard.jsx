import { useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FiBox, FiList, FiShoppingBag, FiMenu, FiX } from 'react-icons/fi';
import { FaLowVision } from 'react-icons/fa';

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        document.title = 'Dashboard';
        window.scrollTo(0, 0);
    }, []);

    const navLinkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${
            isActive
                ? 'bg-mainBlue text-white'
                : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
        }`;

    return (
        <div className="flex h-screen mt-24 md:mt-[120px] overflow-hidden relative">
            {/* Sidebar toggle button (small screens) */}
            <button
                className="absolute top-4 left-4 z-50 md:hidden text-3xl text-mainBlue"
                onClick={() => setSidebarOpen(!sidebarOpen)}
            >
                {sidebarOpen ? <FiX /> : <FiMenu />}
            </button>

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 h-full w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-4 z-40 
                    transform transition-transform duration-300 ease-in-out
                    ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:translate-x-0 md:static md:flex-shrink-0
                `}
            >
                <h2 className="text-xl font-bold mb-6 text-mainBlue mt-12 md:mt-0">Admin Dashboard</h2>
                <nav className="space-y-2">
                    <NavLink to="categoryManagement" className={navLinkClasses} onClick={() => setSidebarOpen(false)}>
                        <FiList /> Category
                    </NavLink>
                    <NavLink to="productManagement" className={navLinkClasses} onClick={() => setSidebarOpen(false)}>
                        <FiBox /> Product
                    </NavLink>
                    <NavLink to="ordersManagement" className={navLinkClasses} onClick={() => setSidebarOpen(false)}>
                        <FiShoppingBag /> Orders
                    </NavLink>
                    <NavLink to="lowStockProducts" className={navLinkClasses} onClick={() => setSidebarOpen(false)}>
                        <FaLowVision /> Low Stock Products
                    </NavLink>
                </nav>
            </aside>

            {/* Overlay on mobile when sidebar is open */}
            {sidebarOpen && (
                <div
                    onClick={() => setSidebarOpen(false)}
                    className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
                />
            )}

            {/* Main Content */}
            <main className="flex-1 p-6 bg-gray-100 overflow-y-auto w-full">
                <Outlet />
            </main>
        </div>
    );
}
