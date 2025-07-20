import { Link } from 'react-router-dom'
import skirtImage from '../../../assets/imgs/skirtCategory.jpg'
import topImage from '../../../assets/imgs/topCategory.jpg'

export default function ShopbyCategories() {
    return (
        <div className="py-16 px-6 bg-white">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                Shop by Categories
            </h2>

            <div className="grid grid-cols-2 gap-4 md:gap-8 max-w-6xl mx-auto">
                {/* Skirts */}
                <div className="group relative overflow-hidden rounded-3xl shadow-lg">
                    <img
                        src={skirtImage}
                        alt="Skirts"
                        className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-6">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-4">Skirts</h3>
                        <Link

                            to={"/skirts"}
                            className="px-3 md:px-5 py-1.5 md:py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>

                {/* Tops */}
                <div className="group relative overflow-hidden rounded-3xl shadow-lg">
                    <img
                        src={topImage}
                        alt="Tops"
                        className="w-full h-96 object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-white text-center p-6">
                        <h3 className="text-2xl md:text-3xl font-semibold mb-4">Tops</h3>
                        <Link

                            to={"/tops"}
                            className="px-3 md:px-5 py-1.5 md:py-2 bg-white text-black font-medium rounded-full hover:bg-gray-200 transition"
                        >
                            Shop Now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
