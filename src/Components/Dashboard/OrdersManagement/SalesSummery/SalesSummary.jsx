import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../Context/UserContext";
import { FiShoppingCart, FiTrendingUp, FiCalendar } from "react-icons/fi";

const SalesSummary = () => {
    const { token } = useContext(UserContext);
    const [summary, setSummary] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        document.title = 'Sales Summary';
        window.scrollTo(0, 0);
        getSalesSummary();
    }, []);

    async function getSalesSummary() {
        try {
            const response = await axios.get('https://sheshop.salis.app/admin/dashboard/sales-summary', {
                headers: { authorization: token }
            });
            setSummary(response.data.summary);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch sales summary.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="w-full px-4 md:px-10  ">
            <div className="text-center mb-10">
                <span className="text-sm text-mainBlue mb-2 py-1 px-4 rounded-full bg-white shadow inline-block">📈 Dashboard</span>
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 font-fustat mt-4">Sales Summary</h1>
            </div>

            {loading ? (
                <div className="text-center text-gray-500 text-lg">Loading...</div>
            ) : error ? (
                <div className="text-center text-red-600 font-medium">{error}</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mt-8">
                    <SummaryCard
                        title="Total Sales"
                        value={`EGP ${summary.totalSales.toLocaleString()}`}
                        icon={<FiTrendingUp size={28} />}
                        color="from-green-400 to-green-600"
                    />
                    <SummaryCard
                        title="Total Orders"
                        value={summary.totalOrders}
                        icon={<FiShoppingCart size={28} />}
                        color="from-blue-400 to-blue-600"
                    />
                    <SummaryCard
                        title="Today's Sales"
                        value={`EGP ${summary.todaySales.toLocaleString()}`}
                        icon={<FiCalendar size={28} />}
                        color="from-purple-400 to-purple-600"
                    />
                </div>
            )}
        </div>
    );
};

const SummaryCard = ({ title, value, icon, color }) => (
    <div className={`p-6 rounded-2xl shadow-xl bg-gradient-to-br ${color} text-white flex items-center justify-between`}>
        <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-2xl md:text-3xl font-bold mt-1">{value}</p>
        </div>
        <div className="bg-white bg-opacity-20 p-3 rounded-full">
            {icon}
        </div>
    </div>
);

export default SalesSummary;
