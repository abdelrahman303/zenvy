import { useEffect, useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { FiBox, FiList, FiShoppingBag, FiMenu } from 'react-icons/fi';
import { MdSpaceDashboard, MdDateRange } from "react-icons/md";

import { FaLowVision } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';

export default function Dashboard() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        document.title = 'Dashboard';
        window.scrollTo(0, 0);
    }, []);

    const navLinkClasses = ({ isActive }) =>
        `flex items-center gap-3 px-4 py-2 rounded-lg font-medium transition-colors ${isActive
            ? 'bg-mainBlue text-white'
            : 'text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-800'
        }`;

    return (
        <div className="flex h-screen mt-24 md:mt-[120px]">
            {/* Sidebar (Desktop) - Fixed */}
            <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 p-6 fixed top-[0px] pt-36 bottom-0 z-40">
                <h2 className="text-xl font-bold mb-6 text-mainBlue">Admin Dashboard</h2>
                <nav className="space-y-2">
                    <NavLink to="/dashboard" end className={navLinkClasses}>
                        <MdSpaceDashboard /> Dashboard
                    </NavLink>
                    <NavLink to="categoryManagement" className={navLinkClasses}>
                        <FiList /> Category
                    </NavLink>
                    <NavLink to="productManagement" className={navLinkClasses}>
                        <FiBox /> Product
                    </NavLink>
                    <NavLink to="ordersManagement" className={navLinkClasses}>
                        <FiShoppingBag /> Orders
                    </NavLink>
                    <NavLink to="lowStockProducts" className={navLinkClasses}>
                        <FaLowVision /> Low Stock Products
                    </NavLink>
                    <NavLink to="salesByDateRange" className={navLinkClasses}>
                        <MdDateRange /> Sales By Date Range
                    </NavLink>
                </nav>
            </aside>

            {/* Mobile Sidebar (Animated) */}
            <AnimatePresence>
                {sidebarOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSidebarOpen(false)}
                            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
                        />
                        <motion.aside
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            className="fixed top-0 left-0 h-full bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 py-6 px-5 w-72 z-50 shadow-xl"
                        >
                            <div className="flex justify-end mb-4">
                                <button
                                    onClick={() => setSidebarOpen(false)}
                                    className="text-mainBlue text-2xl hover:rotate-90 transition-transform duration-300"
                                >
                                    <FiX />
                                </button>
                            </div>
                            <h2 className="text-xl font-bold mb-6 text-mainBlue">Admin Dashboard</h2>
                            <nav className="space-y-2">
                                <NavLink to="/dashboard" end className={navLinkClasses} onClick={() => setSidebarOpen(false)}>
                                    <MdSpaceDashboard /> Dashboard
                                </NavLink>
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
                                <NavLink to="salesByDateRange" className={navLinkClasses} onClick={() => setSidebarOpen(false)}>
                                    <MdDateRange /> Sales By Date Range
                                </NavLink>
                            </nav>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>

            {/* Sidebar toggle for mobile */}
            <button
                className="fixed top-28 left-4 md:hidden text-3xl text-mainBlue z-50"
                onClick={() => setSidebarOpen(true)}
            >
                <FiMenu />
            </button>

            {/* Main content area */}
            <main className="ml-0 md:ml-72 w-full h-[calc(100vh-96px)] overflow-y-scroll scrollbar-hide bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    );
}
