import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then((res) => res.json())
            .then((data) => {
                setProducts(data);
                setLoading(false);
            })
            .catch((err) => console.error("Error fetching products:", err));
    }, []);

    if (loading) return (
        <div className="text-center mt-20 text-slate-500 animate-pulse">
            Loading products...
        </div>
    );

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
            {products.map((product) => (
                <article
                    key={product.id}
                    className="group bg-white rounded-2xl border border-slate-200 p-4 flex flex-col shadow-sm shadow-slate-200 hover:shadow-md hover:shadow-slate-200 transition-all duration-300"
                >
                    <Link to={`/product/${product.id}`} className="flex-grow flex flex-col">
                        {/* Product Image Container */}
                        <div className="relative flex items-center justify-center h-48 mb-4 overflow-hidden rounded-xl bg-slate-50 p-4">
                            <img
                                src={product.image}
                                alt={product.title}
                                className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-500"
                            />
                        </div>

                        {/* Product Info */}
                        <h2 className="font-semibold text-slate-900 line-clamp-2 group-hover:text-blue-700 transition-colors h-12">
                            {product.title}
                        </h2>
                        <p className="text-xs text-slate-500 uppercase tracking-wider font-medium mt-2">
                            {product.category}
                        </p>
                        <p className="text-xl font-bold text-blue-700 mt-3">
                            ${product.price}
                        </p>
                    </Link>

                    {/* Action Button */}
                    <button
                        onClick={() => addToCart(product)}
                        className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-white font-semibold hover:bg-blue-700 active:scale-95 transition-all shadow-lg shadow-blue-100"
                    >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                    </button>
                </article>
            ))}
        </div>
    );
};

export default Home;