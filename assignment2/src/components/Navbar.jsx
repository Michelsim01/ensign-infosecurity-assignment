import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount } = useCart();

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/90 border-b border-slate-200">
      <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold tracking-tight text-blue-700">
          Ensign Store
        </Link>

        <Link
          to="/cart"
          className="relative btn-ghost bg-white rounded-full"
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="text-sm font-semibold hidden sm:inline">Cart</span>
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-white">
              {cartCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;