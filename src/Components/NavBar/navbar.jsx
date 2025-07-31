import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { FiX, FiArrowRight, FiUser, FiList, FiBox, FiShoppingBag } from "react-icons/fi";
import { MdDashboard, MdDateRange } from "react-icons/md";
import { FaLowVision } from "react-icons/fa";
import { CgMenuRight } from "react-icons/cg";
import { BsBagHeartFill } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/imgs/logo.svg";
import { UserContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

const navItems = [
  { name: "Home", href: "/home" },
  { name: "Collections", href: "/collections" },
  { name: "Contact Us", href: "/contactus" },
];

const dashboardLinks = [
  { name: "Dashboard", href: "/dashboard", icon: <MdDashboard /> },
  { name: "Category", href: "/dashboard/categoryManagement", icon: <FiList /> },
  { name: "Product", href: "/dashboard/productManagement", icon: <FiBox /> },
  { name: "Orders", href: "/dashboard/ordersManagement", icon: <FiShoppingBag /> },
  { name: "Low Stock", href: "/dashboard/lowStockProducts", icon: <FaLowVision /> },
  { name: "Sales By Date", href: "/dashboard/salesByDateRange", icon: <MdDateRange /> },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  const { user, token } = useContext(UserContext);
  const { cartItems } = useContext(CartContext);


  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);

    console.log(cartItems);
  }, [location.pathname]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 0) return;
    const isScrollingDown = latest > lastScrollY;
    if (isScrollingDown !== hidden || Math.abs(latest - lastScrollY) > 10) {
      setHidden(isScrollingDown);
      setLastScrollY(latest);
    }
  });

  return (
    <motion.header
      initial={{ y: 0 }}
      animate={{
        y: hidden ? -120 : 0,
        transition: { type: "spring", stiffness: 400, damping: 30 },
      }}
      className="fixed top-0 left-0 w-full z-50"
    >
      {/* Banner */}
      <div className="flex justify-center md:justify-between items-center bg-mainBlue text-white font-medium py-1.5 px-6">
        <p className="hidden md:block">WELCOME TO ZENVY STORE</p>
        <p>Free Shipping Above 1350 LE.</p>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center py-3 px-6 border-b border-gray-200 bg-white dark:bg-gray-900/80 backdrop-blur-xl">
        <Link to="/home">
          <img className="w-20" src={logo} alt="logo" />
        </Link>

        <nav className="flex space-x-6 relative">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="font-medium text-gray-700 dark:text-gray-200 hover:text-mainBlue px-2"
            >
              {item.name}
            </Link>
          ))}


          {token && (
            <Link to={'/my-orders'} className="font-medium text-gray-700 dark:text-gray-200 hover:text-mainBlue px-2">Orders</Link>
          )}

          {user?.role === "admin" && (
            <div
              className="relative group"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center gap-1 font-medium text-gray-700 dark:text-gray-200 hover:text-mainBlue">
                Dashboard
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <AnimatePresence>
                {dropdownOpen && (
                  <motion.ul
                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute left-0 top-10 w-56 bg-white dark:bg-gray-800 shadow-xl rounded-xl overflow-hidden z-50"
                  >
                    {dashboardLinks.map((link, index) => (
                      <motion.li
                        key={link.name}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <Link
                          to={link.href}
                          className="flex items-center gap-3 px-5 py-3 hover:bg-mainBlue hover:text-white dark:hover:bg-white/10 transition-colors"
                        >
                          {link.icon}
                          {link.name}
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>
          )}
        </nav>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-mainBlue">
            <FiUser size={22} />
          </Link>
          <button onClick={() => navigate("/cart")} className="relative text-gray-700 dark:text-gray-200">
            <BsBagHeartFill size={22} />
            {cartItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-mainBlue text-white text-[10px] font-bold px-1.5 rounded-full">
                {cartItems}
              </span>
            )}

          </button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed left-0 w-full z-50 bg-white dark:bg-gray-900/70 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <button onClick={() => setMobileOpen(true)} className="text-gray-700 dark:text-gray-200">
          <CgMenuRight className="rotate-180" size={28} />
        </button>

        <Link to="/home">
          <img className="w-14" src={logo} alt="logo" />
        </Link>

        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/profile")} className="text-gray-700 dark:text-gray-200">
            <FiUser size={22} />
          </button>
          <button onClick={() => navigate("/cart")} className="relative text-gray-700 dark:text-gray-200">
            <BsBagHeartFill size={22} />
            {cartItems > 0 && (
              <span className="absolute -top-1.5 -right-2.5 bg-mainBlue text-white text-[12px] font-bold px-1.5 rounded-full">
                {cartItems}
              </span>
            )}

          </button>
        </div>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 35 }}
              className="fixed top-0 left-0 h-full w-4/5 bg-white dark:bg-gray-900 z-50 px-6 py-6 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl"
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <button onClick={() => setMobileOpen(false)} className="text-gray-800 dark:text-white">
                    <FiX size={28} />
                  </button>
                  <img className="w-14" src={logo} alt="logo" />
                </div>

                <nav className="space-y-3">
                  {navItems.map((item, i) => (
                    <Link key={item.name} to={item.href} className="block text-gray-800 dark:text-white hover:text-mainBlue py-2">
                      {item.name}
                    </Link>
                  ))}

                  {token && (
                    <Link to={'/my-orders'} className="block text-gray-800 dark:text-white hover:text-mainBlue py-2">Orders</Link>
                  )}

                  {user?.role === "admin" && (
                    <div className="mt-4">
                      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">Admin Links</p>
                      {dashboardLinks.map((link) => (
                        <Link key={link.name} to={link.href} className="flex items-center gap-2 text-gray-800 dark:text-white py-2 hover:text-mainBlue">
                          {link.icon}
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </nav>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <Link to="/profile" className="w-full flex items-center justify-center gap-2 text-gray-800 dark:text-white hover:text-mainBlue">
                  <FiUser size={22} />
                  <span className="text-sm font-medium">Profile</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
