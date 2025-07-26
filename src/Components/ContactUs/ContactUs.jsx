import { useEffect } from "react"


const ContactUs = () => {


    useEffect(() => {
        document.title = 'Contact Us'
        window.scrollTo(0, 0)
    }, [])
    return (
        <div>
            <div className="pt-24 md:pt-36 main-gradient-light-bg flex flex-col items-center py-10 px-4">
                <div className="text-center mb-10">
                    <span className="text-sm text-mainBlue mb-2 py-1 px-3 rounded-3xl bg-white">Contact</span>
                    <h1 className="text-[58px] text-blackColor font-W700 font-fustat">Contact Us</h1>
                    <p className="text-gray-600 text-subtitle max-w-xl mx-auto">
                        We're here to help! Reach out with your questions, feedback, or inquiries, and we'll get back to you promptly.
                    </p>
                </div>

                <div className="bg-white shadow-md rounded-2xl px-16 py-14 w-full max-w-[700px]">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <input
                            type="text"
                            placeholder="Your Name"
                            className="border border-gray-300 rounded-lg px-4 py-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="email"
                            placeholder="Email Address"
                            className="border border-gray-300 rounded-lg px-4 py-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <input
                            type="tel"
                            placeholder="Phone Number"
                            className="border border-gray-300 rounded-lg px-4 py-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                        <select
                            className="border border-gray-300 rounded-lg px-4 py-4 w-full bg-white text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Interested In
                            </option>
                            <option value="general">General Inquiry</option>
                            <option value="support">Support</option>
                            <option value="sales">Sales</option>
                        </select>

                    </div>

                    <div className="mt-6">
                        <textarea
                            rows="5"
                            placeholder="How we can help?"
                            className="border border-gray-300 rounded-lg px-4 py-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 mb-6"
                        ></textarea>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ContactUs;
