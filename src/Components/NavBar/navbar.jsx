import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { FiX, FiArrowRight, FiUser } from "react-icons/fi";
import { CgMenuRight } from "react-icons/cg";
import { BsBagHeartFill } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "../../assets/imgs/logo.svg";
import { UserContext } from "../../Context/UserContext";

const navItems = [
  { name: "Home", href: "/home" },
  { name: "Collections", href: "/collections" },
  { name: "Contact Us", href: "/contactus" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();
  const { user } = useContext(UserContext); // 👈 Get user from context

  useEffect(() => {
    setMobileOpen(false);
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
      <div className="flex justify-center md:justify-between items-center bg-mainBlue text-white font-medium py-1.5 px-5 sm:px-8 md:px-14 lg:px-24 xl:px-28">
        <p className="hidden md:block md:text-base">WELCOME TO ZENVY STORE</p>
        <p className="md:text-base">Free Shipping Above 1350 LE.</p>
      </div>

      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-between items-center py-3 px-5 sm:px-8 md:px-14 lg:px-24 xl:px-28 border-b border-gray-200 bg-white dark:bg-gray-900/80 backdrop-blur-xl w-full">
        <Link to="/home">
          <motion.img className="w-20" src={logo} alt="logo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }} />
        </Link>

        <nav className="flex space-x-4">
          {navItems.map((item) => (
            <motion.div key={item.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Link to={item.href} className="font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 px-4 py-2 rounded-lg relative group">
                {item.name}
                <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400" initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.3 }} />
              </Link>
            </motion.div>
          ))}

          {/* 👇 Admin Dashboard Link */}
          {user?.role === "admin" && (
            <motion.div key="Dashboard" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Link to="/dashboard" className="font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 px-4 py-2 rounded-lg relative group">
                Dashboard
                <motion.span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400" initial={{ width: 0 }} whileHover={{ width: "100%" }} transition={{ duration: 0.3 }} />
              </Link>
            </motion.div>
          )}
        </nav>

        <div className="flex items-center gap-4 text-sm font-medium">
          <Link to="/profile" className="text-gray-700 dark:text-gray-200 hover:text-mainBlue">
            <FiUser size={22} />
          </Link>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/cart")} className="relative text-gray-700 dark:text-gray-200">
            <BsBagHeartFill size={22} />
            <span className="absolute -top-1.5 -right-2.5 bg-mainBlue text-white text-[10px] font-bold px-1.5 rounded-full shadow-sm">0</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="md:hidden fixed left-0 w-full z-50 bg-white dark:bg-gray-900/70 backdrop-blur-md px-4 py-3 flex items-center justify-between">
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileOpen(true)} className="text-gray-700 dark:text-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <CgMenuRight className="rotate-180" size={28} />
        </motion.button>

        <Link to="/home">
          <motion.img className="w-14" src={logo} alt="logo" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} />
        </Link>

        <div className="flex items-center gap-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/profile")} className="text-gray-700 dark:text-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <FiUser size={22} />
          </motion.button>
          <motion.button whileTap={{ scale: 0.9 }} onClick={() => navigate("/cart")} className="relative text-gray-700 dark:text-gray-200" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <BsBagHeartFill size={22} />
            <span className="absolute -top-1.5 -right-2.5 bg-mainBlue text-white text-[12px] font-bold px-1.5 rounded-full shadow-sm">0</span>
          </motion.button>
        </div>
      </div>

      {/* Mobile Backdrop */}
      {mobileOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 0.4 }} exit={{ opacity: 0 }} onClick={() => setMobileOpen(false)} className="fixed inset-0 bg-black z-40" />
      )}

      {/* Mobile Sidebar */}
      <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={mobileOpen ? { x: 0, opacity: 1 } : { x: "-100%", opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 35 }}
        className="md:hidden fixed top-0 left-0 h-full w-4/5 bg-white dark:bg-gray-900 shadow-2xl z-50 px-6 py-6 flex flex-col justify-between rounded-tr-3xl rounded-br-3xl"
      >
        <div>
          <div className="flex justify-between items-center mb-8">
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setMobileOpen(false)} className="text-gray-800 dark:text-white hover:text-mainBlue transition-colors">
              <FiX size={28} />
            </motion.button>
            <img className="w-14" src={logo} alt="logo" />
          </div>

          <nav className="space-y-2">
            {navItems.map((item, i) => (
              <Link to={item.href} className="group" key={item.name}>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center justify-between py-3 rounded-xl text-gray-800 dark:text-white hover:bg-mainBlue/10 dark:hover:bg-white/10 transition-all border border-transparent hover:border-mainBlue"
                >
                  <span className="font-medium">{item.name}</span>
                  <FiArrowRight className="text-mainBlue group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            ))}

            {/* 👇 Admin Dashboard Link */}
            {user?.role === "admin" && (
              <Link to="/dashboard" className="group">
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="flex items-center justify-between py-3 rounded-xl text-gray-800 dark:text-white hover:bg-mainBlue/10 dark:hover:bg-white/10 transition-all border border-transparent hover:border-mainBlue"
                >
                  <span className="font-medium">Dashboard</span>
                  <FiArrowRight className="text-mainBlue group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            )}
          </nav>

          <div className="mt-8 flex justify-start">
            <Link to="/cart" className="flex items-center gap-2 text-gray-800 dark:text-white hover:text-mainBlue hover:scale-105 transition-transform">
              <BsBagHeartFill size={22} />
              <span className="text-sm font-medium">Cart</span>
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <Link to="/profile" className="w-full flex items-center justify-center gap-2 text-gray-800 dark:text-white hover:text-mainBlue hover:scale-105 transition-transform">
            <FiUser size={22} />
            <span className="text-sm font-medium">Profile</span>
          </Link>
        </div>
      </motion.div>
    </motion.header>
  );
}
