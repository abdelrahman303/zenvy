import { useEffect } from 'react';
import SalesSummary from '../OrdersManagement/SalesSummery/SalesSummary';

export default function DashboardDetails() {

    useEffect(() => {
        document.title = 'Dashboard';
        window.scrollTo(0, 0);
    }, []);


    



    return (
        <div className="flex h-screen mt-24 md:mt-[120px] overflow-hidden relative">
            <SalesSummary />
        </div>
    );
}
