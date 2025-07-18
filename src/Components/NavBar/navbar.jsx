// import { motion, useScroll, useMotionValueEvent } from "framer-motion";
// import { useState, useEffect } from "react";
// import { FiMenu, FiX, FiArrowRight, FiMoon, FiSun } from "react-icons/fi";
// import { useNavigate } from "react-router-dom";
// import logoAR from "../../assets/siyanaEn.svg";

// const navItems = [
//   { name: "Home", href: "/" },
//   { name: "Features", href: "/#features" },
//   { name: "Pricing", href: "/pricing" },
//   { name: "Contact Us", href: "/#contactus" },
// ];

// export default function Navbar() {
//   const navigate = useNavigate();
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [hidden, setHidden] = useState(false);
//   const [lastScrollY, setLastScrollY] = useState(0);
//   const { scrollY } = useScroll();

//   const [language, setLanguage] = useState("EN");
//   const [darkMode, setDarkMode] = useState(false);

//   // Scroll hide/show behavior
//   useMotionValueEvent(scrollY, "change", (latest) => {
//     if (latest < 0) return;
//     if (latest > lastScrollY) {
//       setHidden(true);
//     } else {
//       setHidden(false);
//     }
//     setLastScrollY(latest);
//   });

//   useEffect(() => {
//     if (mobileOpen) setMobileOpen(false);
//   }, [hidden]);

//   const toggleLanguage = () => {
//     setLanguage((prev) => (prev === "EN" ? "AR" : "EN"));
//   };

//   const toggleTheme = () => {
//     setDarkMode((prev) => !prev);
//     document.documentElement.classList.toggle("dark");
//   };

//   return (
//     <motion.header
//       initial={{ y: -15 }}
//       animate={{
//         y: hidden ? -15 : 0,
//         transition: { type: "spring", stiffness: 400, damping: 30 },
//       }}
//       className="fixed w-full z-50"
//     >
//       {/* Desktop Navbar */}
//       <div className="hidden md:flex justify-center">
//         <motion.div className="fixed mx-auto flex items-center justify-center px-8 py-3.5 mt-5 rounded-2xl border border-gray-300 bg-white/30 backdrop-blur-lg dark:bg-gray-800/30">
//           <img className="w-24" src={logoAR} alt="logoAR" />

//           <nav className="flex space-x-1 mx-4">
//             {navItems.map((item) => (
//               <motion.div key={item.name}>
//                 <a
//                   href={item.href}
//                   className="font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 px-4 py-2 rounded-lg relative group"
//                 >
//                   {item.name}
//                   <motion.span
//                     className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"
//                     initial={{ width: 0 }}
//                     whileHover={{ width: "100%" }}
//                     transition={{ duration: 0.3 }}
//                   />
//                 </a>
//               </motion.div>
//             ))}
//           </nav>

//           {/* Toggles */}
//           <div className="flex items-center gap-3 ml-4">
//             <button
//               onClick={toggleLanguage}
//               className="text-sm text-gray-700 dark:text-gray-200 hover:text-mainBlue"
//             >
//               {language === "EN" ? (
//                 <span className="fi fi-us rounded-[2px]  w-8 h-w-8"></span>
//               ) : (
//                 <span className="fi fi-sa rounded-[2px]  w-8 h-w-8"></span>
//               )}
//             </button>

//             <button
//               onClick={toggleTheme}
//               className="text-gray-700 dark:text-gray-200 hover:text-yellow-400"
//             >
//               {darkMode ? <FiSun /> : <FiMoon />}
//             </button>

//             <motion.button
//               onClick={() => navigate("/pricing")}
//               whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px" }}
//               whileTap={{ scale: 0.95 }}
//               className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-lg"
//             >
//               Get Started
//             </motion.button>
//           </div>
//         </motion.div>
//       </div>

//       {/* Mobile Navbar */}
//       <motion.div
//         className="md:hidden flex justify-between items-center p-3 bg-white/30 backdrop-blur-lg rounded-2xl mt-5 mx-3 dark:bg-gray-800/30"
//         animate={{
//           y: hidden ? -100 : 0,
//           transition: { type: "spring", stiffness: 400, damping: 30 },
//         }}
//       >
//         <img className="w-24" src={logoAR} alt="logoAR" />

//         <motion.button
//           whileTap={{ scale: 0.9 }}
//           onClick={() => setMobileOpen(!mobileOpen)}
//           className="text-gray-700 dark:text-gray-200"
//         >
//           {mobileOpen ? <FiX size={24} /> : <FiMenu size={30} />}
//         </motion.button>
//       </motion.div>

//       {/* Mobile Menu */}
//       {mobileOpen && (
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.3 }}
//           className="md:hidden absolute bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl rounded-2xl mt-2 mx-3 right-0 left-0"
//         >
//           <div className="flex flex-col px-6 py-4">
//             {navItems.map((item, i) => (
//               <motion.a
//                 key={item.name}
//                 initial={{ x: -50, opacity: 0 }}
//                 animate={{ x: 0, opacity: 1 }}
//                 transition={{ delay: i * 0.1 }}
//                 href={item.href}
//                 className="flex items-center justify-between py-4 text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 group"
//               >
//                 <span>{item.name}</span>
//                 <motion.div
//                   initial={{ x: -10 }}
//                   animate={{ x: 0 }}
//                   transition={{ delay: i * 0.1 + 0.2 }}
//                 >
//                   <FiArrowRight className="text-mainBlue group-hover:translate-x-1 transition-transform" />
//                 </motion.div>
//               </motion.a>
//             ))}

//             {/* Toggles */}
//             <div className="flex items-center justify-between mt-4">
//               <button onClick={toggleLanguage}>
//                 {language === "EN" ? (
//                   <span className="fi fi-us w-5 h-5"></span>
//                 ) : (
//                   <span className="fi fi-sa w-5 h-5"></span>
//                 )}
//               </button>

//               <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-200">
//                 {darkMode ? <FiSun /> : <FiMoon />}
//               </button>
//             </div>

//             <motion.button
//               onClick={() => navigate("/pricing")}
//               whileTap={{ scale: 0.95 }}
//               className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-lg"
//             >
//               Get Started
//             </motion.button>
//           </div>
//         </motion.div>
//       )}
//     </motion.header>
//   );
// }
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect } from "react";
import { FiMenu, FiX, FiArrowRight, FiMoon, FiSun } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import logoAR from "../../assets/siyanaEn.svg";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Features", href: "/#features" },
  { name: "Pricing", href: "/pricing" },
  { name: "Contact Us", href: "/contactus" },
];

export default function Navbar() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const { scrollY } = useScroll();

  const [language, setLanguage] = useState("EN");
  const [darkMode, setDarkMode] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 0) return;
    if (latest > lastScrollY) setHidden(true);
    else setHidden(false);
    setLastScrollY(latest);
  });

  useEffect(() => {
    if (mobileOpen) setMobileOpen(false);
  }, [hidden]);

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === "EN" ? "AR" : "EN"));
  };

  const toggleTheme = () => {
    setDarkMode((prev) => !prev);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.header
      initial={{ y: -15 }}
      animate={{
        y: hidden ? -15 : 0,
        transition: { type: "spring", stiffness: 400, damping: 30 },
      }}
      className="fixed w-full z-50"
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex justify-center">
        <motion.div className="fixed mx-auto flex items-center justify-center px-8 py-3.5 mt-5 rounded-2xl border border-gray-300 bg-white/30 backdrop-blur-lg dark:bg-gray-800/30">
          <img className="w-24" src={logoAR} alt="logoAR" />

          <nav className="flex space-x-1 mx-4">
            {navItems.map((item) => (
              <motion.div key={item.name}>
                <a
                  href={item.href}
                  className="font-medium text-gray-700 dark:text-gray-200 hover:text-gray-900 px-4 py-2 rounded-lg relative group"
                >
                  {item.name}
                  <motion.span
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400"
                    initial={{ width: 0 }}
                    whileHover={{ width: "100%" }}
                    transition={{ duration: 0.3 }}
                  />
                </a>
              </motion.div>
            ))}
          </nav>

          {/* Toggles */}
          <div className="flex items-center gap-4 ml-6 text-sm font-medium">
            {/* Language Text Toggle */}
            <span
              onClick={toggleLanguage}
              className="cursor-pointer text-gray-800 dark:text-gray-100 hover:text-mainBlue"
            >
              {language}
            </span>

            {/* Theme Icon Toggle */}
            <button
              onClick={toggleTheme}
              className="text-gray-700 dark:text-gray-200 hover:text-yellow-400"
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>

            {/* CTA */}
            <motion.button
              onClick={() => navigate("/pricing")}
              whileHover={{ scale: 1.05, boxShadow: "0 10px 25px -5px" }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-lg"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Mobile Navbar */}
      <motion.div
        className="md:hidden flex justify-between items-center p-3 bg-white/30 backdrop-blur-lg rounded-2xl mt-5 mx-3 dark:bg-gray-800/30"
        animate={{
          y: hidden ? -100 : 0,
          transition: { type: "spring", stiffness: 400, damping: 30 },
        }}
      >
        <img className="w-24" src={logoAR} alt="logoAR" />

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setMobileOpen(!mobileOpen)}
          className="text-gray-700 dark:text-gray-200"
        >
          {mobileOpen ? <FiX size={24} /> : <FiMenu size={30} />}
        </motion.button>
      </motion.div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden absolute bg-white/95 dark:bg-gray-900/95 backdrop-blur-lg shadow-xl rounded-2xl mt-2 mx-3 right-0 left-0"
        >
          <div className="flex flex-col px-6 py-4">
            {navItems.map((item, i) => (
              <motion.a
                key={item.name}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.1 }}
                href={item.href}
                className="flex items-center justify-between py-4 text-gray-800 dark:text-white border-b border-gray-100 dark:border-gray-700 group"
              >
                <span>{item.name}</span>
                <motion.div
                  initial={{ x: -10 }}
                  animate={{ x: 0 }}
                  transition={{ delay: i * 0.1 + 0.2 }}
                >
                  <FiArrowRight className="text-mainBlue group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </motion.a>
            ))}

            {/* Toggles */}
            <div className="flex items-center justify-between mt-4 text-sm font-medium">
              {/* Language Text */}
              <span
                onClick={toggleLanguage}
                className="cursor-pointer text-gray-800 dark:text-white hover:text-mainBlue"
              >
                {language}
              </span>

              {/* Theme Icon */}
              <button onClick={toggleTheme} className="text-gray-700 dark:text-gray-200">
                {darkMode ? <FiSun /> : <FiMoon />}
              </button>
            </div>

            {/* CTA Button */}
            <motion.button
              onClick={() => navigate("/pricing")}
              whileTap={{ scale: 0.95 }}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-400 text-white rounded-full shadow-lg"
            >
              Get Started
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
