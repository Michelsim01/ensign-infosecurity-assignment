import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center bg-white/70 rounded-2xl border border-slate-200 shadow-sm shadow-slate-200">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
          <ShoppingBag className="w-12 h-12 text-slate-400" />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Your cart is empty</h2>
        <p className="text-slate-500 mt-2 mb-6">Looks like you haven't added anything yet.</p>
        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-8 py-3 text-white font-semibold hover:bg-blue-700 active:scale-95 transition-transform"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-slate-900">Shopping Cart</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <div key={item.id} className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200 hover:shadow-md transition-shadow">
              <img src={item.image} alt={item.title} className="w-20 h-20 object-contain" />
              
              <div className="flex-grow min-w-0">
                <h3 className="font-semibold text-slate-900 truncate">{item.title}</h3>
                <p className="text-xl font-bold text-blue-700">${item.price}</p>
                
                <div className="flex items-center gap-3 mt-2">
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="p-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="font-medium w-6 text-center text-slate-800">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="p-1 rounded border border-slate-200 hover:bg-slate-100 transition-colors"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <button 
                onClick={() => removeFromCart(item.id)}
                className="text-slate-400 hover:text-red-500 p-2 transition-colors"
                title="Remove item"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white shadow-sm shadow-slate-200 p-6 h-fit lg:sticky lg:top-24">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2 text-slate-600">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-4 text-slate-600">
            <span>Shipping</span>
            <span className="text-green-600">Free</span>
          </div>
          <hr className="mb-4 border-slate-100" />
          <div className="flex justify-between mb-6">
            <span className="text-lg font-bold">Total</span>
            <span className="text-lg font-bold text-blue-700">${cartTotal.toFixed(2)}</span>
          </div>
          <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 text-white font-semibold hover:bg-blue-700 active:scale-95 transition-transform shadow-lg shadow-blue-100">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;