// import { FaFacebookF, FaDribbble, FaPinterestP, FaTimes } from "react-icons/fa";
import { Link } from 'react-router-dom';
import logo from '../../assets/SiyanaEN.svg';
const Footer = () => {
    return (
        <footer className="bg-white border-t py-8 md:py-20 lg:py-28 px-5 sm:px-8 md:px-14 lg:px-24 xl:px-28 ">
            <div className=" mx-auto grid grid-cols-2 md:grid-cols-6 gap-8">
                {/* Logo + Description */}
                <div className="col-span-2 space-y-4">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="standout logo" className='w-40' />
                    </div>
                    <p className="text-gray-500">
                        Empowering teams to organize, collaborate, and achieve their goals effortlessly.
                    </p>
                </div>

                {/* Links */}
                <div className="flex flex-col space-y-2 md:mt-20 ">
                    <h4 className="font-semibold text-xl md:text-2xl text-gray-700">Company</h4>
                    <Link to={""} className="text-gray-500 text-lg md:text-xl hover:text-black">About Us</Link>
                    <Link to={""} className="text-gray-500 text-lg md:text-xl hover:text-black">Blog Details</Link>
                    <Link to={""} className="text-gray-500 text-lg md:text-xl hover:text-black">Blog</Link>
                </div>

                <div className="flex flex-col space-y-2 md:mt-20">
                    <h4 className="font-semibold text-xl md:text-2xl text-gray-700">Support</h4>
                    <Link to={""} className="text-gray-500 text-lg md:text-xl hover:text-black">Features</Link>
                    <Link to={""} className="text-gray-500 text-lg md:text-xl hover:text-black">Contact</Link>
                    <Link to={""} className="text-gray-500 text-lg md:text-xl hover:text-black">License</Link>
                </div>

                <div className="flex flex-col space-y-2 md:mt-20">
                    <h4 className="font-semibold text-xl md:text-2xl text-gray-700">Resources</h4>
                    <Link to={""} className="text-gray-500 text-lg md:text-xl hover:text-black">Pricing</Link>
                    <Link to={""} className="text-gray-500 text-lg md:text-xl hover:text-black">Career</Link>
                    <Link to={""} className="text-gray-500 text-lg md:text-xl hover:text-black">Terms & Policy</Link>


                </div>
                {/* App Download Buttons */}
                <div className=" space-y-3 flex flex-col md:items-end md:mt-20">
                    <img
                        src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                        alt="Google Play"
                        className="w-32"
                    />
                    <img
                        src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                        alt="App Store"
                        className="w-32"
                    />
                </div>
            </div>

            {/* Bottom Text */}
            <div className="text-center text-sm text-gray-500 mt-12 border-t pt-6">
                Copyright © 2024 SalisSiyana. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;

