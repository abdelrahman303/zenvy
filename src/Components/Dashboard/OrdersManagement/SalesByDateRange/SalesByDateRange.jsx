import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FiCalendar } from 'react-icons/fi';

export default function SalesByDateRange() {
    const { token } = useContext(UserContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');

    useEffect(() => {
        document.title = 'Sales By Date Range';
        window.scrollTo(0, 0);
    }, []);

    const formik = useFormik({
        initialValues: {
            startDate: '',
            endDate: '',
        },
        validationSchema: Yup.object({
            startDate: Yup.date().required('Start date is required'),
            endDate: Yup.date()
                .required('End date is required')
                .min(Yup.ref('startDate'), 'End date must be after start date'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setFetchError('');
            try {
                const response = await axios.get(
                    `https://sheshop.salis.app/admin/dashboard/sales-by-date-range?startDate=${values.startDate}&endDate=${values.endDate}`,
                    { headers: { Authorization: token } }
                );
                setData(response.data.results);
            } catch (err) {
                console.error(err);
                setFetchError('Failed to fetch sales data.');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-32 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">📊 Sales By Date Range</h1>

            <form
                onSubmit={formik.handleSubmit}
                className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end w-full max-w-3xl bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl shadow-lg"
            >
                {/* Start Date */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-black mb-1">Start Date</label>
                    <div className="relative">
                        <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="date"
                            name="startDate"
                            value={formik.values.startDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full pl-10 pr-4 py-2 rounded-xl bg-white/90 text-gray-800 shadow-sm focus:outline-none focus:ring-2 ${formik.touched.startDate && formik.errors.startDate
                                ? 'ring-red-400 border border-red-500'
                                : 'ring-blue-400 border border-transparent'
                                }`}
                        />
                    </div>
                    {formik.touched.startDate && formik.errors.startDate && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.startDate}</p>
                    )}
                </div>

                {/* End Date */}
                <div className="w-full">
                    <label className="block text-sm font-medium text-black mb-1">End Date</label>
                    <div className="relative">
                        <FiCalendar className="absolute left-3 top-3 text-gray-400" />
                        <input
                            type="date"
                            name="endDate"
                            value={formik.values.endDate}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            className={`w-full pl-10 pr-4 py-2 rounded-xl bg-white/90 text-gray-800 shadow-sm focus:outline-none focus:ring-2 ${formik.touched.endDate && formik.errors.endDate
                                ? 'ring-red-400 border border-red-500'
                                : 'ring-blue-400 border border-transparent'
                                }`}
                        />
                    </div>
                    {formik.touched.endDate && formik.errors.endDate && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.endDate}</p>
                    )}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-xl shadow hover:from-blue-600 hover:to-blue-800 transition w-full"
                >
                    Filter
                </button>
            </form>

            {/* Loading and error */}
            {loading && <p className="text-gray-100 mt-6">Loading...</p>}
            {fetchError && <p className="text-red-500 font-medium mt-4">{fetchError}</p>}

            {/* Sales Results */}
            {data && data.length > 0 && (
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow p-6 mt-10">
                    <ul className="space-y-4">
                        {data.map((entry, index) => (
                            <li key={index} className="border-b pb-3">
                                <p><strong>Date:</strong> {entry.date}</p>
                                <p><strong>Total Sales:</strong> EGP {entry.totalSales}</p>
                                <p><strong>Total Orders:</strong> {entry.totalOrders}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {data && data.length === 0 && !loading && (
                <p className="text-gray-300 mt-4">No sales found in this range.</p>
            )}
        </div>
    );
}



/**
 * 
 * import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../../../Context/UserContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function SalesByDateRange() {
    const { token } = useContext(UserContext);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [fetchError, setFetchError] = useState('');

    useEffect(() => {
        document.title = 'Sales By Date Range';
        window.scrollTo(0, 0);
    }, []);

    const formik = useFormik({
        initialValues: {
            startDate: null,
            endDate: null,
        },
        validationSchema: Yup.object({
            startDate: Yup.date().required('Start date is required'),
            endDate: Yup.date()
                .required('End date is required')
                .min(Yup.ref('startDate'), 'End date must be after start date'),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setFetchError('');
            try {
                const formattedStart = values.startDate.toISOString().split('T')[0];
                const formattedEnd = values.endDate.toISOString().split('T')[0];

                const response = await axios.get(
                    `https://sheshop.salis.app/admin/dashboard/sales-by-date-range?startDate=${formattedStart}&endDate=${formattedEnd}`,
                    {
                        headers: { Authorization: token },
                    }
                );
                setData(response.data.results);
            } catch (err) {
                console.error(err);
                setFetchError('Failed to fetch sales data.');
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <div className="flex flex-col items-center justify-start min-h-screen pt-32 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center">📊 Sales By Date Range</h1>

            <form
                onSubmit={formik.handleSubmit}
                className="flex flex-col md:flex-row gap-4 items-center mb-8 w-full max-w-xl"
            >
                <div className="flex flex-col w-full">
                    <label className="text-sm font-medium text-gray-600">Start Date</label>
                    <DatePicker
                        selected={formik.values.startDate}
                        onChange={(date) => formik.setFieldValue('startDate', date)}
                        onBlur={formik.handleBlur}
                        dateFormat="yyyy-MM-dd"
                        className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 ${
                            formik.touched.startDate && formik.errors.startDate
                                ? 'border-red-500 ring-red-300'
                                : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholderText="Select start date"
                    />
                    {formik.touched.startDate && formik.errors.startDate && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.startDate}</p>
                    )}
                </div>

                <div className="flex flex-col w-full">
                    <label className="text-sm font-medium text-gray-600">End Date</label>
                    <DatePicker
                        selected={formik.values.endDate}
                        onChange={(date) => formik.setFieldValue('endDate', date)}
                        onBlur={formik.handleBlur}
                        dateFormat="yyyy-MM-dd"
                        className={`border rounded px-4 py-2 w-full focus:outline-none focus:ring-2 ${
                            formik.touched.endDate && formik.errors.endDate
                                ? 'border-red-500 ring-red-300'
                                : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        placeholderText="Select end date"
                    />
                    {formik.touched.endDate && formik.errors.endDate && (
                        <p className="text-red-600 text-sm mt-1">{formik.errors.endDate}</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 mt-4 md:mt-7 rounded hover:bg-blue-700 transition"
                >
                    Filter
                </button>
            </form>

            {loading && <p className="text-gray-500">Loading...</p>}
            {fetchError && <p className="text-red-600 font-medium">{fetchError}</p>}

            {data && data.length > 0 && (
                <div className="w-full max-w-2xl bg-white rounded shadow p-6">
                    <ul className="space-y-4">
                        {data.map((entry, index) => (
                            <li key={index} className="border-b pb-3">
                                <p><strong>Date:</strong> {entry.date}</p>
                                <p><strong>Total Sales:</strong> EGP {entry.totalSales}</p>
                                <p><strong>Total Orders:</strong> {entry.totalOrders}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {data && data.length === 0 && !loading && (
                <p className="text-gray-600 mt-4">No sales found in this range.</p>
            )}
        </div>
    );
}

 */
