import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, ShoppingCart, Star } from 'lucide-react';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`https://fakestoreapi.com/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((err) => console.error("Error:", err));
    }, [id]);

    if (loading) return <div className="text-center mt-20 text-slate-500">Loading product details...</div>;
    if (!product) return <div className="text-center mt-20 text-slate-500">Product not found.</div>;

    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            {/* Back Button - using hover and transition utilities */}
            <button
                onClick={() => navigate(-1)}
                className="inline-flex items-center justify-center gap-2 rounded border border-slate-200 px-3 py-2 mb-8 hover:border-blue-200 hover:text-blue-700 transition-all bg-white"
            >
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Products
            </button>

            {/* Product Detail Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">

                {/* Image Section */}
                <div className="flex justify-center items-center p-4 bg-slate-50 rounded-xl overflow-hidden">
                    <img
                        src={product.image}
                        alt={product.title}
                        className="max-h-[380px] object-contain hover:scale-105 transition-transform duration-300"
                    />
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center">
                    <span className="inline-flex w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-blue-700 mb-3">
                        {product.category}
                    </span>

                    <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
                        {product.title}
                    </h1>

                    <p className="text-slate-600 mb-6 leading-relaxed">
                        {product.description}
                    </p>

                    <div className="flex items-center justify-between mb-8">
                        <span className="text-4xl font-bold text-blue-700">
                            ${product.price}
                        </span>

                        <div className="flex items-center gap-2 bg-amber-100 px-4 py-2 rounded-full text-amber-700 font-medium">
                            <span className="text-sm">Rating</span>
                            <span className="font-bold flex items-center">
                                <Star className="w-4 h-4 mr-1 fill-amber-700" /> {product.rating?.rate}
                            </span>
                        </div>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-4 text-white font-semibold hover:bg-blue-700 active:scale-95 transition-transform shadow-lg shadow-blue-200 w-full sm:w-auto"
                    >
                        <ShoppingCart className="w-5 h-5" />
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;